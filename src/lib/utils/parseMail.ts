export function splitEmailContent(
  htmlContent: string,
  previousMail: string[] // previous mails html goes here, exclude from new content, push into conversation
): {
  newContent: string;
  conversationHistory: string;
} {
  // Parse the HTML content into a Document object
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  // Create separate Documents for new content and conversation history
  const newContentDoc = document.implementation.createHTMLDocument("");
  const realNewContentDoc = document.implementation.createHTMLDocument("");
  const conversationHistoryDoc = document.implementation.createHTMLDocument("");

  // Clone the body of the original document
  const originalBody = doc.body.cloneNode(true) as HTMLElement;

  // Initialize flags
  let isInQuotedContent = false;

  // Function to traverse nodes and split content
  const traverseNodes = (node: Node, newParent: Node, historyParent: Node) => {
    let currentNewParent = newParent;
    let currentHistoryParent = historyParent;

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;

      // Check if the element is a blockquote or contains classes commonly used for quoted content
      const isBlockquote = element.tagName.toLowerCase() === "blockquote";
      const classList = Array.from(element.classList);

      const isQuotedClass = classList.some((cls) =>
        [
          "gmail_quote",
          "yahoo_quoted",
          "OutlookMessageHeader",
          "email_quote",
          "ii gt",
        ].includes(cls)
      );

      if (isBlockquote || isQuotedClass) {
        isInQuotedContent = true;
      }

      // Create a clone of the current element
      const elementClone = element.cloneNode(false) as HTMLElement;

      if (isInQuotedContent) {
        currentHistoryParent.appendChild(elementClone);
        currentHistoryParent = elementClone;
      } else {
        currentNewParent.appendChild(elementClone);
        currentNewParent = elementClone;
      }

      // Recursively traverse child nodes
      node.childNodes.forEach((childNode) => {
        traverseNodes(childNode, currentNewParent, currentHistoryParent);
      });

      // If we exit a blockquote or quoted class, reset the flag
      if (isBlockquote || isQuotedClass) {
        isInQuotedContent = false;
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      if (isInQuotedContent) {
        currentHistoryParent.appendChild(node.cloneNode());
      } else {
        currentNewParent.appendChild(node.cloneNode());
      }
    }
  };

  const traverseNodesForSimilarity = (
    node: Node,
    newParent: Node,
    historyParent: Node
  ) => {
    let currentNewParent = newParent;
    let currentHistoryParent = historyParent;

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;

      let isSimilar = false;
      const nodeText = removeWhitespace(element.textContent) || "";
      for (const prevText of previousMail) {
        const sim = computeJaccardSimilarity(
          nodeText,
          removeWhitespace(prevText)
        );
        if (sim ===1) {
          console.log("similarity:", { prevText, nodeText, sim });

          isSimilar = true;
          break;
        }
      }

      if (isSimilar) {
        isInQuotedContent = true;
      }

      // Create a clone of the current element
      const elementClone = element.cloneNode(false) as HTMLElement;

      if (isInQuotedContent) {
        currentHistoryParent.appendChild(elementClone);
        currentHistoryParent = elementClone;
      } else {
        currentNewParent.appendChild(elementClone);
        currentNewParent = elementClone;
      }

      // Recursively traverse child nodes
      node.childNodes.forEach((childNode) => {
        traverseNodesForSimilarity(
          childNode,
          currentNewParent,
          currentHistoryParent
        );
      });

      // If we exit a blockquote or quoted class, reset the flag
      if (isSimilar) {
        isInQuotedContent = false;
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      if (isInQuotedContent) {
        currentHistoryParent.appendChild(node.cloneNode());
      } else {
        currentNewParent.appendChild(node.cloneNode());
      }
    }
  };

  // Start traversing from the original body
  traverseNodes(originalBody, newContentDoc.body, conversationHistoryDoc.body);
  traverseNodesForSimilarity(
    newContentDoc.body,
    realNewContentDoc.body,
    conversationHistoryDoc.body
  );

  // Serialize the Documents back to HTML strings
  const serializer = new XMLSerializer();
  const newContentHtml = serializer.serializeToString(realNewContentDoc.body);
  const conversationHistoryHtml = serializer.serializeToString(
    conversationHistoryDoc.body
  );

  return {
    newContent: newContentHtml.trim(),
    conversationHistory: conversationHistoryHtml.trim(),
  };
}

export function extractTextFromHtml(htmlContent: string) {
  // Create a new DOMParser instance
  const parser = new DOMParser();

  // Parse the HTML string into a Document
  const doc = parser.parseFromString(htmlContent, "text/html");

  // Extract and return the text content
  return doc.body.textContent || "";
}

export function computeJaccardSimilarity(s1: string, s2: string): number {
  const tokenize = (str: string) => {
    return new Set(str.toLowerCase().split(/\s+/));
  };

  const setA = tokenize(s1);
  const setB = tokenize(s2);

  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);

  return intersection.size / union.size;
}

function removeWhitespace(str) {
  return str.replace(/\s+/g, "");
}
