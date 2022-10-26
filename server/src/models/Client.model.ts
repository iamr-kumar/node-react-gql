import mongoose from "mongoose";

export interface IClient {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export type NewClient = Omit<IClient, "id">;

export type UpdateClient = Partial<NewClient>;

const ClientSchema = new mongoose.Schema<IClient>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
});

const Client = mongoose.model<IClient>("Client", ClientSchema);

export default Client;
