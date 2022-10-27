import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { DELETE_CLIENT } from "../../gql/mutations/clientMutations";
import { GET_CLIENTS } from "../../gql/queries/clientQuery";
import { GET_PROJECTS } from "../../gql/queries/projectQuries";
import { Client } from "../../types";

const ClientRow = (props: { client: Client }) => {
  const { client } = props;

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery<ClientsQueryResult>({ query: GET_CLIENTS })!;
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: { clients: clients.filter((c: Client) => c.id !== deleteClient.id) },
    //   });
    // },
  });

  return (
    <tr key={client.id}>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={() => deleteClient()}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
