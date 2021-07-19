const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;
const db = require('./config/connection');
const ChatServer = require('./chatServer');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const requestIp = require('request-ip');
const { typeDefs, resolvers } = require('./schemas');


// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:
    authMiddleware,
  ip: (req, res) => {
    const clientIp = requestIp.getClientIp(req);
    return clientIp
  }
});
server.applyMiddleware({ app });
app.use(requestIp.mw())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(function (req, res) {
  const ip = req.clientIp;
  res.end(ip);
});

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
  ChatServer();
});
