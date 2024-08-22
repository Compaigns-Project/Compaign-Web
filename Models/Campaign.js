const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const View = require('./View'); // Correct the import statement

const Campaign = sequelize.define('Campaign', {
  campaignId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  campaignName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  video: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: true
  },
  endDate: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
});

// Campaign.hasMany(View, { foreignKey: 'campaignId' });

module.exports = Campaign;