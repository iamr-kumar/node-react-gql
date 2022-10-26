import mongoose, { Types } from "mongoose";

export enum ProjectStatus {
  NEW = "Not Started",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}

export interface IProject {
  id: string;
  clientId: Types.ObjectId;
  name: string;
  description: string;
  status: ProjectStatus;
}

export type NewProject = Omit<IProject, "id">;

export type UpdateProject = Partial<NewProject>;

const ProjectSchema = new mongoose.Schema<IProject>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});

const Project = mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
