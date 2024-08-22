// controllers/analyticsController.js
const View = require('../Models/View');
const Campaign = require('../Models/Campaign');
const User = require('../Models/User');
const sequelize = require('../config/database');

exports.getCampaignViews = async (req, res) => {
  try {
    const campaignViews = await View.findAll({
      attributes: ['campaignId', [sequelize.fn('COUNT', sequelize.col('viewId')), 'viewCount']],
      group: ['campaignId']
    });
    res.status(200).json(campaignViews);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

exports.getCampaignUsers = async (req, res) => {
  try {
    const campaignUsers = await View.findAll({
      attributes: ['campaignId', [sequelize.fn('COUNT', sequelize.col('userId')), 'userCount']],
      group: ['campaignId']
    });
    res.status(200).json(campaignUsers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

exports.getUserViews = async (req, res) => {
  try {
    const userViews = await View.findAll({
      attributes: ['userId', [sequelize.fn('COUNT', sequelize.col('viewId')), 'viewCount']],
      group: ['userId']
    });
    res.status(200).json(userViews);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

exports.getCampaignLocation = async (req, res) => {
  try {
    const campaignLocation = await View.findAll({
      include: [{ model: Campaign }],
      attributes: ['Campaign.location', [sequelize.fn('COUNT', sequelize.col('View.campaignId')), 'viewCount']],
      group: ['Campaign.location']
    });
    res.status(200).json(campaignLocation);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

exports.getLocationViews = async (req, res) => {
  try {
    const locationViews = await View.findAll({
      include: [{ model: User }],
      attributes: ['User.location', [sequelize.fn('COUNT', sequelize.col('viewId')), 'viewCount']],
      group: ['User.location']
    });
    res.status(200).json(locationViews);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

exports.getUserLocation = async (req, res) => {
  try {
    const userLocation = await User.findAll({
      attributes: ['location', [sequelize.fn('COUNT', sequelize.col('userId')), 'userCount']],
      group: ['location']
    });
    res.status(200).json(userLocation);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

exports.getUserTable = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: [
        'userId',
        'userName',
        'userEmail',
        'location',
        'createdAt',
        [sequelize.fn('COUNT', sequelize.col('Campaigns.campaignId')), 'campaignCount']
      ],
      include: [{
        model: Campaign,
        as: 'Campaigns',
        attributes: [],
        required: false
      }],
      group: ['User.userId']
    });

    // Access the result here
    users.forEach(user => {
      console.log(`User ID: ${user.userId}`);
      console.log(`Name: ${user.userNname}`);
      console.log(`Location: ${user.location}`);
      
      console.log(`Number of Campaigns: ${user.campaignCount}`);
      console.log("------------------------------------------");
    });

    return res.status(200).json(users);
  } catch (error) {
    // Handle errors here
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
