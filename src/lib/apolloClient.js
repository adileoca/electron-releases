import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import fetch from "cross-fetch";

export const createApolloClient = (token) => {
  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_HASURA_ENDPOINT,
    fetch,
  });

  const authLink = setContext(async (_, { headers }) => ({
    headers: { ...headers, ...{ Authorization: `Bearer ${token}` } },
  }));

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
    if (networkError) console.error(`[Network error]: ${networkError}`);
  });

  return new ApolloClient({
    ssrMode: false,
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
  });
};
