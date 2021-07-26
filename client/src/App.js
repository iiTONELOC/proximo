import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Test from './pages/Test';
import Dashboard from './pages/Dashboard'
import Public from './pages/Public';

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
        <div className="w-full h-screen flex-row justify-center">
          <Header />
          <div className="w-full h-auto flex-row ">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/test" component={Test} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/public" component={Public} />
              {/* <Route exact path="/profile" component={Profile} /> */}
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route component={NoMatch} />
            </Switch>
            <Footer />
          </div>
        </div>


      </Router>
    </ApolloProvider>
  );
}

export default App;
