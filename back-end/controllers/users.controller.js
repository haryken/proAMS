const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const { generateJWTToken } = require('../utils/generateJWTToken');
const { createUsername } = require('../utils/user.util');
const { createUser, countUser, userLogin } = require('../services/users.service');

const userLoginHandler = async (req, res, next) => {
  const { username, password } = req.body;
  const existedUser = await userLogin({ username, password });

  if (!existedUser) {
    return next(
      createError(StatusCodes.BAD_REQUEST, 'Username or password is incorrect. Please try again')
    );
  }

  // Remove sensitive fields
  existedUser.password = undefined;

  const token = generateJWTToken(existedUser);

  return res.status(200).json({
    token,
    user: existedUser,
    firstTimeLogin: existedUser.firstTimeLogin,
  });
};

const createUserHandler = async (req, res, next) => {
  const user = req.body;
  const { firstName, lastName } = req.body;
  const location = req.user.userLocation;
  const count = await countUser();
  if (count >= 9999) {
    return next(
      createError(StatusCodes.FAILED_DEPENDENCY, 'The number of users has exceeded 9999!')
    );
  }
  const username = await createUsername(firstName, lastName);
  const userCreated = await createUser(user, username, location);
  return res.status(StatusCodes.CREATED).json(userCreated);
};
module.exports = {
  userLoginHandler,
  createUserHandler,
};
