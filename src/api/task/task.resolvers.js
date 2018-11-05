export default {
  Query: {
    async allTasks(_, { filter }, ctx) {
      const query = filter ? {
        $or: [{
          name: new RegExp(filter, 'i')
        }]
      } : {};
      return await ctx.models.task.find(query).select('_id name owner')
    },
    async getTask(_, {_id}, ctx) {
      return await ctx.models.task.findById(_id);
    }
  },
  Mutation: {
    async createTask(_, {input}, ctx) {
      return await ctx.models.task.create({
        ...input,
        owner: ctx.userId
      });
    },
    async updateTask(_, {_id, input}, ctx) {
      return await ctx.models.task.findOneAndUpdate({_id}, input, {new: true})
    },
    async deleteTask(_, {_id}, ctx) {
      return await ctx.models.task.findByIdAndRemove(_id);
    }
  },
  Task: {
    async owner(task, args, ctx) {
      const owner = await ctx.models.user.findOne(
        {
          _id: task.owner
        },
        '_id email'
      );
      return owner;
    }
  }
}
