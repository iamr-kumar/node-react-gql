import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../../gql/queries/clientQuery";
import { Client } from "../../types";
import ClientRow from "./ClientRow";
import Spinner from "../common/Spinner";

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client: any) => (
              <ClientRow key={client.id} client={client as Client} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Clients;
