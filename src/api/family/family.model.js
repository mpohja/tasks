import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FamilySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  members: {
    type: [
      {
        ref: 'User',
        type: Schema.Types.ObjectId,
        required: true,
      },
    ],
  },
});

export default mongoose.model('family', FamilySchema);
