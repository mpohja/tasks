export default {
  Query: {
    async getFamily(_, { _id }, ctx) {
      return await ctx.models.family.findById(_id);
    },
  },
  Mutation: {
    async createFamily(_, { input }, ctx) {
      return await ctx.models.family.create(input);
    },
    async addMember(_, { _id, member }, ctx) {
      const family = ctx.models.family.findOne({ _id });
      const members = await family.select('members');
      return await family.update({ members: members.push(member._id) }, { new: true });
    },
  },
  Family: {
    async members(family, args, ctx) {
      return family.members.map(async member => {
        const user = await ctx.models.user.findOne(
          {
            _id: member,
          },
          '_id email role'
        );
        return user;
      });
    },
  },
};
