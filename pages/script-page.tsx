import gql from "graphql-tag";
import { useQuery, useMutation  } from "@apollo/react-hooks";

interface QueryScript {

      node:{
      id:string
            src:string
            displayScope:string
          }

}

const CREATE_SCRIPT_TAG = gql`
    mutation scriptTagCreate($input: ScriptTagInput!) {
        scriptTagCreate(input: $input) {
            scriptTag {
                id
            }
            userErrors {
                field
                message
            }
        }
    }
`;


const QUERY_SCRIPTTAGS = gql`
    query {
      scriptTags(first: 5){
        edges{
          node{
            id
            src
            displayScope
          }
        }
      }
    }
`;

const DELETE_SCRIPTTAG = gql`
    mutation scriptTagDelete($id: ID!) {
        scriptTagDelete(id: $id) {
           deletedScriptTagId
           userErrors{
             field
             message
           }
        }
    }
`;

const scriptPage = () => {
  const baseUrl = "https://23f5-126-209-254-163.ngrok.io"
  console.log()
  const [deleteScripts] = useMutation(DELETE_SCRIPTTAG)
  console.log(baseUrl)
  const [createScripts] = useMutation(CREATE_SCRIPT_TAG)
  const { loading, error, data } =  useQuery(QUERY_SCRIPTTAGS)

  if (loading) return <div>Loading</div>
  if (error) return <div>{error.message}</div>

  console.log(data)

  return (
    <div>
      script

      <button
        type="submit"
        onClick={() => {
          createScripts({
            variables: {
              input: { src: `${baseUrl}/test-script.js`, displayScope: "ALL" }
            },
            refetchQueries
              : [{ query: QUERY_SCRIPTTAGS }]
             })
        }}
      >
        create script tag
    </button>
      {data.scriptTags.edges.map((item: QueryScript) => (
        <div key={item.node.id}>
          <p>{item.node.id}</p>
          <button onClick={() => {
            deleteScripts({
              variables: {
                id: item.node.id
              },
              refetchQueries:[{query:QUERY_SCRIPTTAGS}]
            })
          }}>Delete Script Tag</button>
        </div>
      ))}
    </div>
  )
}

export default scriptPage
