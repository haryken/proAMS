const pinoLog = require('../logger/pino-logger');
const { sequelize } = require('../models');

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    pinoLog.info('Database connected');
  } catch (error) {
    pinoLog.error('Failed to connect to database');
  }
};

module.exports = {
  connectDB,
};
