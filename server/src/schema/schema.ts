import { GraphQLSchema } from "graphql";
import { Mutation } from "./mutations";
import { RootQuery } from "./queries";

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
