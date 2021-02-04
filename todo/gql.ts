import { ApolloClient, InMemoryCache ,gql, useQuery} from '@apollo/client';
import { createHttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";

/*
const httpLink = createHttpLink({ uri: "/graphql" });
const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem("token") || null
    }
  });
  return forward(operation);
});
// use with apollo-client
const link = middlewareLink.concat(httpLink);

*/

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

let query = gql`
  query {
    foo {
      bar
    }
  }
`;

client
  .query({
    query
  })
  .then(result => console.log(result));

/*
const { loading, error, data } = useQuery(query);

link.query({query}).then((results) => {
  //do something useful
})*/

