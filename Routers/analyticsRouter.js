// routes/analyticsRouter.js
const express = require('express');
const router = express.Router();
const analyticsController = require('../Controllers/analyticsController');

router.get('/campaigns/views', analyticsController.getCampaignViews);
router.get('/campaigns/users', analyticsController.getCampaignUsers);
router.get('/users/views', analyticsController.getUserViews);
router.get('/campaigns/location', analyticsController.getCampaignLocation);
router.get('/views/location', analyticsController.getLocationViews);
router.get('/users/location', analyticsController.getUserLocation);
router.get('/users/usertable', analyticsController.getUserTable);

module.exports = router;
