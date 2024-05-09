import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from "@apollo/client/utilities";
import fetch from "cross-fetch";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
  from,
} from "@apollo/client";

export const createApolloClient = (token) => {
  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_HASURA_ENDPOINT,
    fetch,
  });

  const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_HASURA_WS_ENDPOINT,
    options: {
      reconnect: true,
      lazy: true,
      inactivityTimeout: 30000,
      connectionParams: {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      },
    },
  });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  }));

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });

  // The from() function is used here to chain multiple links together
  const httpLinkWithErrorHandling = from([errorLink, authLink, httpLink]);
  const wsLinkWithErrorHandling = from([errorLink, wsLink]);

  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLinkWithErrorHandling, // Use WebSocket link for subscriptions
    httpLinkWithErrorHandling // Use HTTP link for queries and mutations
  );

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    ssrMode: false,
  });
};
