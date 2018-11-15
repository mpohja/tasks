import { loadGQLFile } from '../../utils/gqlLoader';
import familyModel from './family.model';
import familyResolvers from './family.resolvers';

export default {
  model: familyModel,
  resolvers: familyResolvers,
  typeDefs: loadGQLFile('family/family.graphql'),
};
