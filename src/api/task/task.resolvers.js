import { ForbiddenError } from 'apollo-server';

export default {
  Query: {
    async allTasks(_, { filter }, ctx) {
      const query = filter
        ? {
            $or: [
              {
                title: new RegExp(filter, 'i'),
              },
            ],
          }
        : {};
      return await ctx.models.task.find(query).select('_id title status createdAt owner updatedAt acceptor');
    },
    async getTasksByUser(_, { _id }, ctx) {
      const query = {
        owner: {
          _id,
        },
      };
      return await ctx.models.task.find(query).select('_id title status createdAt owner updatedAt acceptor');
    },
    async getTask(_, { _id }, ctx) {
      return await ctx.models.task.findById(_id);
    },
  },
  Mutation: {
    async createTask(_, { input }, ctx) {
      return await ctx.models.task.create({
        ...input,
        owner: ctx.userId,
      });
    },
    async updateTask(_, { _id, input }, ctx) {
      return await ctx.models.task.findOneAndUpdate({ _id }, input, { new: true });
    },
    async updateStatus(_, { _id, input }, ctx) {
      const user = await ctx.models.user.findOne({ _id: ctx.userId });
      console.log(input.status, user);
      if (input.status === 'ACCEPTED' && user.role !== 'PARENT') {
        throw new ForbiddenError('Not allowed');
      }
      return await ctx.models.task.findOneAndUpdate({ _id }, { ...input, acceptor: user }, { new: true });
    },
    async deleteTask(_, { _id }, ctx) {
      return await ctx.models.task.findByIdAndRemove(_id);
    },
  },
  Task: {
    async owner(task, args, ctx) {
      const owner = await ctx.models.user.findOne(
        {
          _id: task.owner,
        },
        '_id email role'
      );
      return owner;
    },
    async acceptor(task, args, ctx) {
      const owner = await ctx.models.user.findOne(
        {
          _id: task.acceptor,
        },
        '_id email role'
      );
      return owner;
    },
  },
};
