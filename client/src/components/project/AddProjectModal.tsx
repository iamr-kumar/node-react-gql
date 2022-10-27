import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { FaList } from "react-icons/fa";
import { ADD_PROJECT } from "../../gql/mutations/projectMutations";
import { GET_CLIENTS } from "../../gql/queries/clientQuery";
import { GET_PROJECTS } from "../../gql/queries/projectQuries";
import { ClientsQueryResult, ProjectsQueryResult } from "../../types";

const AddProjectModal = () => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState("NEW");
  const [clientId, setClientId] = React.useState("");

  const { data, loading, error } = useQuery<ClientsQueryResult>(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery<ProjectsQueryResult>({ query: GET_PROJECTS })!;
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const handleSubmit = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (name.trim() === "" || description.trim() === "" || clientId.trim() === "") {
        return alert("All fields are required");
      }

      addProject({
        variables: { name, description, status, clientId },
      });

      setName("");
      setDescription("");
      setStatus("NEW");
      setClientId("");
    },
    [addProject, clientId, description, name, status]
  );

  if (loading) return null;
  if (error) return <p>Something went wrong...</p>;

  return (
    !loading &&
    !error && (
      <>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
          <div className="d-flex align-items-center">
            <FaList className="icon" />
            New Project
          </div>
        </button>

        <div
          className="modal fade"
          id="addProjectModal"
          tabIndex={-1}
          aria-labelledby="addProjectLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="addProjectLabel">
                  New Project
                </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
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
                  <div className="mb-3">
                    <label className="form-label">Client</label>
                    <select
                      id="clientId"
                      className="form-select"
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                    >
                      <option value="">Select Clients</option>
                      {data?.clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default AddProjectModal;
