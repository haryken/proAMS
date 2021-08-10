const Joi = require('joi');
const validateRequest = require('../middlewares/validateRequest.middleware');

function validateUserLogin(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required().max(255),
    password: Joi.string().required().max(1024),
  });

  validateRequest(req, next, schema);
}
function validateCreateUser(req, res, next) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    dateOfBirth: Joi.string().required(),
    joinedDate: Joi.string().required(),
    gender: Joi.string().required(),
    userType: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

module.exports = {
  validateUserLogin,
  validateCreateUser,
};
