const express = require('express');
const router = express.Router();
const campaignController = require('../Controllers/campaignController');

router.post('/createCompaign', campaignController.PostCreateVideoCampaigns)

router.get('/getAllCompaigns', campaignController.GetVideoCampaigns)

router.post('/deleteCompaign', campaignController.deleteVideoCampaigns)


module.exports = router;