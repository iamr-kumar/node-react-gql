import Project, { NewProject, UpdateProject } from "../models/Project.model";

export function getProjects() {
  return Project.find();
}

export function getProjectById(id: string) {
  return Project.findById(id);
}

export function createNewProject(newProject: NewProject) {
  const { name, description, status, clientId } = newProject;
  const project = new Project({
    name,
    description,
    status,
    clientId,
  });
  return project.save();
}

export function deleteProject(id: string) {
  return Project.findByIdAndRemove(id);
}

export function updateProject(id: string, updateProject: UpdateProject) {
  const { name, description, status, clientId } = updateProject;
  const updateFields: UpdateProject = {};
  if (name) {
    updateFields.name = name;
  }
  if (description) {
    updateFields.description = description;
  }
  if (status) {
    updateFields.status = status;
  }
  if (clientId) {
    updateFields.clientId = clientId;
  }
  return Project.findByIdAndUpdate(
    id,
    {
      $set: updateFields,
    },
    {
      new: true,
    }
  );
}
