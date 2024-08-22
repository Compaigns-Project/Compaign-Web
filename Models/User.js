// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Views = require('./View');

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userName:{
   type: DataTypes.STRING,
   allowNull:false 
  },
  userEmail:{
    type:DataTypes.STRING,
    allowNull:true
  }
  ,
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

});
// User.hasMany(Views, { foreignKey: 'userId' });

module.exports = User;
