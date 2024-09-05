// import './App.css';
// import { Outlet } from 'react-router-dom';

// import Navbar from './components/Navbar';

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Outlet />
//     </>
//   );
// }

// export default App;
import './App.css';
import React from 'react';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import { ApolloClient, 
         InMemoryCache, 
         ApolloProvider, 
         createHttpLink, 
        } from '@apollo/client';
import Navbar from './components/Navbar';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink), 
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Navbar />
        <div>
          <Outlet />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;