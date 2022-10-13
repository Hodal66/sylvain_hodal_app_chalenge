

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://countries.trevorblades.com/graphql' }),
  fetchOptions: {
    mode: 'no-cors',
  },
  cache: new InMemoryCache()
});

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