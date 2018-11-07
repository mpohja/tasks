import Joi from 'joi';

export function validateUser(user) {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(4)
      .max(10)
      .required(),
    role: Joi.string(),
  });
  const { error, value } = Joi.validate(user, schema);
  if (error && error.details) {
    return { error };
  }
  return { value };
}
