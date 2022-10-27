import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../../gql/queries/projectQuries";
import { Project } from "../../types";
import Spinner from "../common/Spinner";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  return (
    <>
      {data.projects.length > 0 ? (
        <div className="row mt-3">
          {data.projects.map((project: Project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
};

export default Projects;
