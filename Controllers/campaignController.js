// controllers/campaignController.js
const Campaign = require('../Models/Campaign');

exports.PostCreateVideoCampaigns =  async (req, res) => {
  try {
    // Extract data from the request body
    const { campaignName, description, tags,endDate } = req.body;

    // Retrieve the path of the uploaded video file
    const videoFilePath = req.file.path;

    // Create a new campaign in the database
    const newCampaign = await Campaign.create({
      campaignName,
      video: videoFilePath, // Save the path of the uploaded video file
      description,
      tags,
      endDate
    });

    // Respond with the newly created campaign
    res.status(201).json({
      success: true,
      message: 'Video campaign created successfully',
      campaign: newCampaign
    });
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error('Error creating video campaign:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create video campaign',
      error: error.message
    });
  }
};

// Route to retrieve all video campaigns

exports.GetVideoCampaigns =  async (req, res) => {
  try {
    // Retrieve all campaigns from the database
    const campaigns = await Campaign.findAll();

    // Respond with the list of campaigns
    res.status(200).json(campaigns);
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error('Error retrieving video campaigns:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve video campaigns',
      error: error.message
    });
  }
};

// Route to retrieve a single video campaign by ID
exports.getSingleVideoCampaigns=  async (req, res) => {
  try {
    // Extract campaign ID from the request parameters
    const {campaignId} = req.body;

    // Find the campaign by ID in the database
    const campaign = await Campaign.findById(campaignId);

    // If campaign with given ID doesn't exist, return error
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Video campaign not found'
      });
    }

    // Respond with the campaign
    res.status(200).json({
      success: true,
      campaign
    });
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error('Error retrieving video campaign:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve video campaign',
      error: error.message
    });
  }
};

// Route to update a video campaign by ID
exports.putUpdateVideoCampaign = async (req, res) => {
  try {
    // Extract campaign ID from the request parameters
    const {campaignId} = req.body;

    // Extract updated data from the request body
    const { campaignName, video, description, tags, endDate } = req.body;

    // Find the campaign by ID in the database
    const campaign = await Campaign.findById(campaignId);

    // If campaign with given ID doesn't exist, return error
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Video campaign not found'
      });
    }

    // Update campaign data
    campaign.campaignName = campaignName;
    campaign.video = video;
    campaign.description = description;
    campaign.views = views;

    // Save the updated campaign data
    await campaign.save();

    // Respond with success message
    res.status(200).json({
      success: true,
      message: 'Video campaign updated successfully',
      campaign
    });
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error('Error updating video campaign:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update video campaign',
      error: error.message
    });
  }
};

// Route to delete a video campaign by ID
exports.deleteVideoCampaigns = async (req, res) => {
  try {
    // Extract campaign ID from the request parameters
    const {campaignId} = req.body;

    // Find and delete the campaign by ID in the database
    const deletedCampaign = await Campaign.findByPk(campaignId);

    deletedCampaign.destroy()

    // If campaign with given ID doesn't exist, return error
    if (!deletedCampaign) {
      return res.status(404).json({
        success: false,
        message: 'Video campaign not found'
      });
    }

    // Respond with success message
    res.status(200).json({
      success: true,
      message: 'Video campaign deleted successfully'
    });
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error('Error deleting video campaign:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete video campaign',
      error: error.message
    });
  }
};
