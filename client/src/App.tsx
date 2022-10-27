import { ApolloProvider } from "@apollo/client";
import AddClientModal from "./components/client/AddClientModal";
import Clients from "./components/client/Clients";
import Header from "./components/Header";
import { client } from "./gql/config";

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <AddClientModal />
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
