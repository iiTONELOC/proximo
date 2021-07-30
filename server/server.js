const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;
const socketIo = require('socket.io');
const cors = require('cors');
const NetAddress = require('../chat-server/utils/network');
const ChatAPI = require('../chat-server/utils/chat-handler')
const db = require('./config/connection');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const requestIp = require('request-ip');
const { typeDefs, resolvers } = require('./schemas');


const server = new ApolloServer({
  uri: "http://localhost:3000/graphql",
  typeDefs,
  resolvers,
  context:
    authMiddleware,
  ip: (req, res) => {
    const clientIp = requestIp.getClientIp(req);
    console.log('SERVER', clientIp)
    return clientIp

  }
});
const chatServer = require('http').createServer(app);
const io = socketIo(chatServer, {
  cors: {
    origin: "*",
    methods: ['GET', 'POST']
  }
})
server.applyMiddleware({ app });
app.use(cors())
app.use(requestIp.mw())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
db.once('open', () => {
  chatServer.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`Chat Server connected @ http://localhost:${PORT}\nOr on your network: http://${NetAddress()}:${PORT} `)
    ChatAPI.globalChat(io);
  });
});
