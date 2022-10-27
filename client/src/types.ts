export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export type NewClient = Omit<Client, "id">;

export interface ClientsQueryResult {
  clients: Client[];
}

export interface ProjectsQueryResult {
  projects: Project[];
}

export enum ProjectStatus {
  NEW = "Not Started",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  client?: Client;
}
