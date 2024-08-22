// models/View.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Campaign = require('./Campaign');
const User = require('./User');

const View = sequelize.define('View', {
  viewId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// View.belongsTo(Campaign, { foreignKey: 'campaignId' });
// View.belongsTo(User, { foreignKey: 'userId' });

module.exports = View;
