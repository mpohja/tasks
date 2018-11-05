import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    ref: 'User',
    type: Schema.Types.ObjectId,
    required: true,
  },
});
export default mongoose.model('task', TaskSchema);
