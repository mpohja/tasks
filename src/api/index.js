import task from './task';
import auth from './auth';
import family from './family';
import merge from 'lodash/merge';

export default {
  resolvers: merge({}, task.resolvers, auth.resolvers, family.resolvers),
  typeDefs: [task.typeDefs, auth.typeDefs, family.typeDefs].join(' '),
  context: req => ({
    ...req,
    models: {
      task: task.model,
      user: auth.model,
      family: family.model,
    },
  }),
};
