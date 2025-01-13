import React, { useState } from 'react';

const AddEvents = () => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    banner: null,
    date: '',
    time: '',
    location: '',
    organizer: '',
    prizeWorth: '',
    cost: '',
    teamSize: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleFileChange = (e) => {
    setEventData({ ...eventData, banner: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event Data:', eventData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-4xl w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Event</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input 
              type="text" 
              name="title" 
              value={eventData.title} 
              onChange={handleChange} 
              className="w-full mt-1 p-2 bg-gray-700 text-white rounded-md border border-gray-600" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea 
              name="description" 
              value={eventData.description} 
              onChange={handleChange} 
              className="w-full mt-1 p-2 bg-gray-700 text-white rounded-md border border-gray-600 h-32"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium">Banner Image</label>
            <input 
              type="file" 
              name="banner" 
              onChange={handleFileChange} 
              className="mt-1 text-white" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input 
              type="date" 
              name="date" 
              value={eventData.date} 
              onChange={handleChange} 
              className="w-full mt-1 p-2 bg-gray-700 text-white rounded-md border border-gray-600" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Time</label>
            <input 
              type="time" 
              name="time" 
              value={eventData.time} 
              onChange={handleChange} 
              className="w-full mt-1 p-2 bg-gray-700 text-white rounded-md border border-gray-600" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Location</label>
            <input 
              type="text" 
              name="location" 
              value={eventData.location} 
              onChange={handleChange} 
              className="w-full mt-1 p-2 bg-gray-700 text-white rounded-md border border-gray-600" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Organizer</label>
            <input 
              type="text" 
              name="organizer" 
              value={eventData.organizer} 
              onChange={handleChange} 
              className="w-full mt-1 p-2 bg-gray-700 text-white rounded-md border border-gray-600" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Prize Worth</label>
            <input 
              type="text" 
              name="prizeWorth" 
              value={eventData.prizeWorth} 
              onChange={handleChange} 
              className="w-full mt-1 p-2 bg-gray-700 text-white rounded-md border border-gray-600" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Cost</label>
            <input 
              type="text" 
              name="cost" 
              value={eventData.cost} 
              onChange={handleChange} 
              className="w-full mt-1 p-2 bg-gray-700 text-white rounded-md border border-gray-600" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Team Size</label>
            <input 
              type="text" 
              name="teamSize" 
              value={eventData.teamSize} 
              onChange={handleChange} 
              className="w-full mt-1 p-2 bg-gray-700 text-white rounded-md border border-gray-600" 
            />
          </div>
          <div>
            <button 
              type="submit" 
              className="w-full mt-4 p-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-medium"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvents;
