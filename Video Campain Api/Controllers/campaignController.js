// controllers/campaignController.js
const Campaign = require('../Models/Campaign');

exports.uploadCampaign = async (req, res) => {
  try {
    const { videoPath } = req.body;
    const newCampaign = await Campaign.create({ videoPath });
    res.status(201).json(newCampaign);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

exports.pushToUser = async (req, res) => {
  try {
    // Logic to push campaign to user
    res.status(200).send('Campaign pushed to users successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

exports.deleteCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const campaign = await Campaign.findByPk(campaignId);
    if (!campaign) {
      return res.status(404).send('Campaign not found');
    }
    await campaign.destroy();
    res.status(200).send('Campaign deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};
