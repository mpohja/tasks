import { GraphQLServer } from 'graphql-yoga';
import mongoose from 'mongoose';
import graphqlConfig from './api';
import { makeExecutableSchema } from 'graphql-tools';
import { applyMiddleware } from 'graphql-middleware';
import { authMiddleware } from './api/middlewares';

// GraphQL have used a new method to serialize ID, the new method doesn't support ID in object type anymore, but
// following codes will help on this:
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

const PORT = 3000;
mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://localhost:27017/tasks',
  { useNewUrlParser: true }
);
mongoose.set('useCreateIndex', true);

const options = {
  tracing: true,
  debug: true,
  port: PORT,
  endpoint: '/graphql',
  playground: '/docs',
};

//create a schema
const schema = makeExecutableSchema({
  typeDefs: graphqlConfig.typeDefs,
  resolvers: graphqlConfig.resolvers,
});
//apply middlewares on the schema
const protectedSchema = applyMiddleware(schema, authMiddleware);
//provided the protected Schema to graphql Server
const server = new GraphQLServer({
  schema: protectedSchema,
  context: graphqlConfig.context,
});

server.start(options, () => console.log('Server is running on localhost:3000'));
