import React, { useState } from 'react';
import { ArrowBack } from '@mui/icons-material';
// import './CampaignForm.css'

const CampaignForm = ({HandleIsAddClose}) => {
  const [campaignData, setCampaignData] = useState({
    campaignName: '',
    description: '',
    endDate: '',
    tags: '',
    video: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaignData({
      ...campaignData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setCampaignData({
      ...campaignData,
      video: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('campaignName', campaignData.campaignName);
      formData.append('description', campaignData.description);
      formData.append('endDate', campaignData.endDate.toString());
      formData.append('tags', campaignData.tags);
      formData.append('video', campaignData.video);

      const response = await fetch('http://localhost:8000/api/campaign/createCompaign', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add campaign');
      }

      // Handle successful response
      console.log('Campaign added successfully');
      
      // Reset form fields
      setCampaignData({
        campaignName: '',
        description: '',
        endDate: '',
        tags: '',
        video: null,
      });
    } catch (error) {
      console.error('Error adding campaign:', error.message);
    }
  };

  return (
    <>
    <div className="flex justify-left" onClick={HandleIsAddClose}>
        <ArrowBack className='mr-2 cursor-pointer' />
        <h2 className="font-bold mb-4 cursor-pointer">Back</h2>   
    </div>
    <form onSubmit={handleSubmit} className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg'>
      <h2 className="text-2xl font-semibold mb-6">Add Campaign</h2>
      <div className='mb-4'>
        <label htmlFor="campaignName" className='block font-semibold mb-2'>Campaign Name</label>
        <input
          type="text"
          id="campaignName"
          name="campaignName"
          value={campaignData.campaignName}
          onChange={handleChange}
          className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor="description" className="block font-semibold mb-2">Description</label>
        <textarea
          id="description"
          name="description"
          value={campaignData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          rows="4"
        ></textarea>
      </div>

      <div className='flex mb-4'>
      <div  className="w-1/2 mr-2">
        <label htmlFor="endDate" className="block font-semibold mb-2">End Date</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={campaignData.endDate}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="w-1/2 ml-2">
        <label htmlFor="tags" className="block font-semibold mb-2">Tags</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={campaignData.tags}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      </div>
      <div className='mb-4'>
        <label htmlFor="video" className="block font-semibold mb-2">Video Upload</label>
        <input
          type="file"
          id="video"
          name="video"
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <label htmlFor="video" className="block cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg ">
          Choose File
        </label>
      <button type="submit" className="mt-5 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">Submit</button>
    </form>
    </>
  );
};

export default CampaignForm;