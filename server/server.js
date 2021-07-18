const express = require('express');
const path = require('path');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const requestIp = require('request-ip');
// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const PORT = process.env.PORT || 3001;
const app = express();
const CHAT = require('./chatServer');
// const cors = require('cors');
// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:
    authMiddleware,
  ip: function (req, res) {
    const clientIp = requestIp.getClientIp(req);
    return clientIp
  }
});

// integrate our Apollo server with the Express application as middleware
server.applyMiddleware({ app });
app.use(requestIp.mw())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cors())
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
  CHAT();
});
