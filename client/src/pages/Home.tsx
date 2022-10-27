import React from "react";
import AddClientModal from "../components/client/AddClientModal";
import Clients from "../components/client/Clients";
import AddProjectModal from "../components/project/AddProjectModal";
import Projects from "../components/project/Projects";

const Home = () => {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientModal />
        <AddProjectModal />
      </div>
      <Projects />
      <hr />
      <Clients />
    </>
  );
};

export default Home;
