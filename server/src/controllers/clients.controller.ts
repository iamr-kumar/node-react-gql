import Client, { NewClient } from "../models/Client.model";

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
  return Client.findByIdAndRemove(id);
}
