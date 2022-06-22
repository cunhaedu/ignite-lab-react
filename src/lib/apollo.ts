import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4o52mkf0n0o01z20jzt5197/master',
  cache: new InMemoryCache(),
});
