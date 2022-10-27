export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export type NewClient = Omit<Client, "id">;

export interface ClientsQueryResult {
  clients: any[];
}
