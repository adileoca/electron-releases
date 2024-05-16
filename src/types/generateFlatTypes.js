const fs = require("fs");

// File paths
const filePath = "src/types/graphql.ts"; // Path to your generated file

// Read the original file
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  // Regular expression to find types with relationships
  const typeRegex = /export type (\w+) = {[\s\S]*?};\n/g;

  // Transform data to remove relationships and make id optional
  let newData = data.replace(typeRegex, (match) => {
    // Remove lines that indicate aggregate relationships
    let newType = match
      .replace(
        /\/\*\* An aggregate relationship \*\/\n\s+\w+: \w+Aggregate;\n/g,
        ""
      )
      .replace(
        /\/\*\* An array relationship \*\/\n\s+(\w+): Array<(\w+)>;\n/g,
        "$1?: Array<$2>;\n"
      )
      .replace(
        /\/\*\* An object relationship \*\/\n\s+(\w+): (\w+);\n/g,
        "$1?: $2;\n"
      )
      .replace(/(\bid\b)(: Scalars\['\w+'\]\['output'\];)/g, "$1?$2");

    // Make id fields optional
    newType = newType.replace(
      /(\s+id: Scalars\["\w+"\]\["output"\];\n)/g,
      (idMatch) => {
        return idMatch.replace("id:", "id?:");
      }
    );

    return newType;
  });

  // Write to a new file or update the existing one
  fs.writeFile(filePath, newData, "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log("Flat types generated successfully!");
  });
});
