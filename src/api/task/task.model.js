import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['NEW', 'DONE', 'ACCEPTED'],
      default: 'NEW',
    },
    owner: {
      ref: 'User',
      type: Schema.Types.ObjectId,
      required: true,
    },
    acceptor: {
      ref: 'User',
      type: Schema.Types.ObjectId,
      required: false,
    },
  },
  { timestamps: true }
);
export default mongoose.model('task', TaskSchema);
