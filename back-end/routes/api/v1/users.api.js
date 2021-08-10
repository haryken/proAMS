const express = require('express');
const asyncHandler = require('express-async-handler');
const usersController = require('../../../controllers/users.controller');
const { validateUserLogin, validateCreateUser } = require('../../../validations/user.validation');
const { verifyCreateUser } = require('../../../middlewares/user.middleware');
const { validateAdminToken } = require('../../../middlewares/jwtAuth.middleware');

const router = express.Router();

router.post('/login', validateUserLogin, asyncHandler(usersController.userLoginHandler));
router.post(
  '/',
  [validateAdminToken, validateCreateUser, verifyCreateUser],
  asyncHandler(usersController.createUserHandler)
);

module.exports = router;
