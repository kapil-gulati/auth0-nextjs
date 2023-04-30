import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
  gql,
} from '@apollo/client'

export async function getApolloClient(url, token) {
  const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      // TODO: figure out cache policy
      // fetchPolicy: 'network-only',
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  }
  const httpLink = new HttpLink({ uri: url })
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    }))
    return forward(operation)
  })

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
    defaultOptions,
  })
  return client
}

export async function getQueryResponse(url, token, query, variables) {
  const client = await getApolloClient(url, token)
  const formattedQuery = gql`${query}`

  const response = await client.query({
    query: formattedQuery,
    variables,
  })
  if (!response.loading) {
    return response.data
  }
  return response.error ? response.error : 'error'
}

export async function getMutationResponse(url, token, mutation, variables) {
  const client = await getApolloClient(url, token)
  const formatedMutation = gql`${mutation}`

  const response = await client.mutate({
    mutation: formatedMutation,
    variables,
  })
  if (!response.loading) {
    return response.data
  }
  return response.error ? response.error : 'error'
}
