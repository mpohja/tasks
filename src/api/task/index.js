import TaskModel from "./Task.model";
import TaskResolvers from "./Task.resolvers";
import {loadGQLFile} from "../../utils/gqlLoader";

export default {
  model: TaskModel,
  resolvers: TaskResolvers,
  typeDefs: loadGQLFile('Task/Task.graphql')
}
