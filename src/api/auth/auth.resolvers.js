import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../../config';
import { validateUser } from '../../utils/util';

async function signup(_, { input }, ctx, info) {
  //validate the user email and password
  const { value, error } = validateUser(input);
  if (error) {
    throw new Error(error.message);
  }

  const password = await bcrypt.hash(input.password, 10);
  const user = await ctx.models.user.create({
    email: input.email,
    password,
    role: input.role,
  });
  const token = jwt.sign({ userId: user._id }, APP_SECRET);
  return {
    token,
    user: {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
  };
}

async function login(parent, { input }, ctx, info) {
  const { value, error } = validateUser(input);
  if (error) {
    throw new Error(error.message);
  }
  const user = await ctx.models.user.findOne({ email: value.email });
  if (!user) {
    throw new Error('No such a user');
  }
  const matched = await bcrypt.compare(value.password, user.password);
  if (!matched) {
    throw new Error('invalid password');
  }
  const token = jwt.sign({ userId: user._id }, APP_SECRET);
  return {
    token,
    user: {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
  };
}

export default {
  Mutation: {
    signup,
    login,
  },
};
