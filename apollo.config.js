module.exports = {
  client: {
    service: {
      name: "hasura",
      url: "https://touching-walrus-59.hasura.app/v1/graphql",
      headers: {
        "x-hasura-admin-secret":
          "IdMI1sxWKRORHIFDstFMfrxXsYWILWa5fhW88H8cY2lxwOD6ja4z66VhZkyREeFR",
      },
      skipSSLValidation: true,
    },
    includes: [
      "src/**/*.vue",
      "src/**/*.js",
      "src/**/*.ts",
      "src/**/*.jsx",
      "src/**/*.tsx",
      "src/**/*.graphql",
    ],
  },
};
