// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Video_Campaign_Api', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
