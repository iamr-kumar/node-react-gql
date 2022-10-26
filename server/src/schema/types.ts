import { GraphQLEnumType, GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import { getClientById } from "../controllers/clients.controller";
import { ProjectStatus } from "../models/Project.model";

//Client Type
export const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

export const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return getClientById(parent.clientId);
      },
    },
  }),
});

export const ProjectStatusEnumType = new GraphQLEnumType({
  name: "ProjectStatus",
  values: {
    NEW: { value: ProjectStatus.NEW },
    IN_PROGRESS: { value: ProjectStatus.IN_PROGRESS },
    COMPLETED: { value: ProjectStatus.COMPLETED },
  },
});
