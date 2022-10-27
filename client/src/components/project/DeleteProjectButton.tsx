import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { DELETE_PROJECT } from "../../gql/mutations/projectMutations";
import { GET_PROJECTS } from "../../gql/queries/projectQuries";

const DeleteProjectButton = (props: { projectId: string }) => {
  const { projectId } = props;

  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger m-2" onClick={() => deleteProject()}>
        <FaTrash className="icon" /> Delete Project
      </button>
    </div>
  );
};

export default DeleteProjectButton;
