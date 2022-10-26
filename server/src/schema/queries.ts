import { GraphQLObjectType, GraphQLID, GraphQLList } from "graphql";
import { getClientById, getClients } from "../controllers/clients.controller";
import { getProjectById, getProjects } from "../controllers/projects.controller";
import { ClientType, ProjectType } from "./types";

export const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db / other source
        return getClientById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return getClients();
      },
    },

    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db / other source
        return getProjectById(args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return getProjects();
      },
    },
  },
});
