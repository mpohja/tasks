import task from './task';
import auth from './auth';
import merge from 'lodash/merge'

export default {
  resolvers: merge({}, task.resolvers, auth.resolvers),
  typeDefs: [task.typeDefs, auth.typeDefs].join(' '),
  context: req => ({
    ...req,
    models: {
      task: task.model,
      user: auth.model
    }
  })
}
