// routes/campaignRouter.js
const express = require('express');
const router = express.Router();
const campaignController = require('../Controllers/campaignController');

router.post('/upload', campaignController.uploadCampaign);
router.post('/push', campaignController.pushToUser);
router.delete('/:campaignId', campaignController.deleteCampaign);

module.exports = router;
