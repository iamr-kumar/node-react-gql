import { useMutation } from "@apollo/client";
import React from "react";
import { UPDATE_PROJECT } from "../../gql/mutations/projectMutations";
import { GET_PROJECT } from "../../gql/queries/projectQuries";
import { Project } from "../../types";

const EditProjectForm = (props: { project: Project }) => {
  const { project } = props;

  const [name, setName] = React.useState(project.name);
  const [description, setDescription] = React.useState(project.description);
  const [status, setStatus] = React.useState("");

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { name, description, status, id: project.id },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const handleSubmit = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (name.trim() === "" || description.trim() === "") {
        return alert("All fields are required");
      }

      updateProject({
        variables: { name, description, status, id: project.id },
      });
    },
    [description, name, project.id, status, updateProject]
  );

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              console.log(e.target.value);
            }}
          >
            <option value={"NEW"}>Not Started</option>
            <option value={"IN_PROGRESS"}>In Progress</option>
            <option value={"COMPLETED"}>Completed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProjectForm;
