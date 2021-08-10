const express = require('express');
const asyncHandler = require('express-async-handler');
const usersController = require('../../../controllers/users.controller');
const {
  validateUserLogin,
  validateCreateUser,
  validateEditUser,
} = require('../../../validations/user.validation');
const { verifyCreateUser, verifyEditUser } = require('../../../middlewares/user.middleware');
const { validateAdminToken } = require('../../../middlewares/jwtAuth.middleware');

const router = express.Router();

router.post('/login', validateUserLogin, asyncHandler(usersController.userLoginHandler));
router.post(
  '/',
  [validateCreateUser, verifyCreateUser],
  asyncHandler(usersController.createUserHandler)
);

router.put(
  '/',
  [validateAdminToken, validateEditUser, verifyEditUser],
  asyncHandler(usersController.editUserHandler)
);

router.get('/:id', [validateAdminToken], asyncHandler(usersController.getUserHandler));

module.exports = router;
