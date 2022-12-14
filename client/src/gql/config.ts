import { InMemoryCache, ApolloClient } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing = [], incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing = [], incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

export const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});
