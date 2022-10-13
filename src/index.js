

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AUTH_TOKEN } from './constants';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(AUTH_TOKEN);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  fetchOptions: {
    mode: 'no-cors',
  },
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   link: new HttpLink({ uri: 'http://localhost:4000/' }),
//   fetchOptions: {
//     mode: 'no-cors',
//   },
//   cache: new InMemoryCache()
// });

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);