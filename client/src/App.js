import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import SearchShows from './pages/SearchShows';
import SavedShows from './pages/SavedShows';
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
      <Router>
        <>
          <Navbar />
            <Switch>
              <Route exact path='/' component={SearchShows} />
              <Route exact path='/saved' component={SavedShows} />
              <Route render={() => <h1 className='display-2'>Wrong Page!</h1>} />
            </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;