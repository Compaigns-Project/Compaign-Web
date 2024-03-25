// models/Campaign.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const View = require('./View'); // Correct the import statement

const Campaign = sequelize.define('Campaign', {
  campaignId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  videoPath: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Campaign.hasMany(View, { foreignKey: 'campaignId' });

module.exports = Campaign;
