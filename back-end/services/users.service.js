const { Op } = require('sequelize');
const moment = require('moment');
const { Users } = require('../models');
const { createStaffCode, createPassword } = require('../utils/calculation.util');
const { encrypt, compare } = require('../utils/encryptor');

const userLogin = async (userDetails) => {
  const { username, password } = userDetails;

  const existedUser = await Users.findOne({
    where: { username },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });

  if (!existedUser || !compare(password, existedUser.password)) {
    return false;
  }

  return existedUser;
};

const getUser = async (id) => Users.findByPk(id);

const updateStaffCode = async (id) => {
  const user = await getUser(id);

  user.staffCode = createStaffCode(Number(id));

  await user.save();

  return getUser(id);
};

const createUser = async (newUser, username, location) => {
  const { firstName, lastName, dateOfBirth, joinedDate, gender, userType } = newUser;
  const password = encrypt(createPassword(username, dateOfBirth));
  const user = await Users.create({
    firstName,
    lastName,
    dateOfBirth: moment(dateOfBirth).format('YYYY-MM-DD'),
    joinedDate: moment(joinedDate).format('YYYY-MM-DD'),
    gender,
    userType,
    username,
    password,
    userLocation: location,
  });

  return updateStaffCode(Number(user.id));
};

const arrayUsername = (username) =>
  Users.findAll({
    where: {
      username: {
        [Op.like]: `%${username}%`,
      },
    },
    attributes: ['username'],
  });

const countUser = () => Users.count();

module.exports = {
  createUser,
  arrayUsername,
  updateStaffCode,
  getUser,
  countUser,
  userLogin,
};
