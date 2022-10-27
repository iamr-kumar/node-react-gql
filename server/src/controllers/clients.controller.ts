import Client, { NewClient } from "../models/Client.model";
import Project from "../models/Project.model";

export function getClients() {
  return Client.find();
}

export function getClientById(id: string) {
  return Client.findById(id);
}

export function createNewClient(client: NewClient) {
  const { name, email, phone } = client;
  const newClient = new Client({
    name,
    email,
    phone,
  });
  return newClient.save();
}

export function deleteClient(id: string) {
  Project.find({ clientId: id }).then((projects) => {
    projects.forEach((project) => {
      project.remove();
    });
  });
  return Client.findByIdAndRemove(id);
}
