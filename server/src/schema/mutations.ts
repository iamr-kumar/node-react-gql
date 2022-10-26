import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } from "graphql";
import { createNewClient, deleteClient } from "../controllers/clients.controller";
import { createNewProject, deleteProject, updateProject } from "../controllers/projects.controller";
import { ProjectStatus } from "../models/Project.model";
import { ClientType, ProjectType, ProjectStatusEnumType } from "./types";

// Mutations
export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Create new client
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return createNewClient({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
      },
    },

    // Delete a client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return deleteClient(args.id);
      },
    },

    // Add a project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: { type: GraphQLNonNull(ProjectStatusEnumType), defaultValue: ProjectStatus.NEW },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return createNewProject({
          name: args.name,
          description: args.description,
          status: args.status as ProjectStatus,
          clientId: args.clientId,
        });
      },
    },

    // Delete a project
    deleteProject: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return deleteProject(args.id);
      },
    },

    //Update a project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: ProjectStatusEnumType, defaultValue: ProjectStatus.NEW },
        clientId: { type: GraphQLID },
      },
      resolve(parent, args) {
        return updateProject(args.id, args);
      },
    },
  },
});
