const Joi =require('joi');

function userValidation(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(3).required()
  }).unknown();
  
  return schema.validate(user)
}

module.exports= {userValidation}