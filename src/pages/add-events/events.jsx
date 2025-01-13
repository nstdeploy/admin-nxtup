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
    <div className="flex items-center justify-center min-h-screen text-white bg-black">
      <div className="w-full max-w-4xl p-8 rounded-lg shadow-lg bg-zinc-900">
        <h1 className="mb-6 text-3xl font-bold text-center">Add New Event</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-md">Title</label>
            <input 
              type="text" 
              name="title" 
              placeholder="Enter event title"
              value={eventData.title} 
              onChange={handleChange} 
              className="w-full p-2 pl-3 mt-1 text-black bg-white rounded-md" 
            />
          </div>
          <div>
            <label className="block mt-6 mb-1 font-medium text-md">Description</label>
            <textarea 
              name="description" 
              placeholder="Give your event a description"
              value={eventData.description} 
              onChange={handleChange} 
              className="w-full h-32 p-2 pl-3 mt-1 text-black bg-white rounded-md"
            ></textarea>
          </div>
          <div>
            <label className="block mt-6 mb-1 font-medium text-md">Banner Image</label>
            <input 
              type="file" 
              name="banner" 
              onChange={handleFileChange} 
              className="mt-1" 
            />
          </div>
          <div>
            <label className="block mt-6 mb-1 font-medium text-md">Date</label>
            <input 
              type="date" 
              name="date" 
              value={eventData.date} 
              onChange={handleChange} 
              className="w-full p-2 mt-1 text-black bg-white rounded-md" 
            />
          </div>
          <div>
            <label className="block mt-6 mb-1 font-medium text-md">Time</label>
            <input 
              type="time" 
              name="time" 
              value={eventData.time} 
              onChange={handleChange} 
              className="w-full p-2 mt-1 text-black bg-white rounded-md" 
            />
          </div>
          <div>
            <label className="block mt-6 mb-1 font-medium text-md">Location</label>
            <input 
              type="text" 
              name="location" 
              placeholder="Enter event location"
              value={eventData.location} 
              onChange={handleChange} 
              className="w-full p-2 pl-3 mt-1 text-black bg-white rounded-md" 
            />
          </div>
          <div>
            <label className="block mt-6 mb-1 font-medium text-md">Organizer</label>
            <input 
              type="text" 
              name="organizer"
              placeholder="Who is organizing this event?" 
              value={eventData.organizer} 
              onChange={handleChange} 
              className="w-full p-2 pl-3 mt-1 text-black bg-white rounded-md" 
            />
          </div>
          <div>
            <label className="block mt-6 mb-1 font-medium text-md">Prize Worth</label>
            <input 
              type="text" 
              name="prizeWorth" 
              placeholder="Enter Prize"
              value={eventData.prizeWorth} 
              onChange={handleChange} 
              className="w-full p-2 pl-3 mt-1 text-black bg-white rounded-md" 
            />
          </div>
          <div>
            <label className="block mt-6 mb-1 font-medium text-md">Cost</label>
            <input 
              type="text" 
              name="cost" 
              placeholder="Enter registration fee"
              value={eventData.cost} 
              onChange={handleChange} 
              className="w-full p-2 pl-3 mt-1 text-black bg-white rounded-md" 
            />
          </div>
          <div>
            <label className="block mt-6 mb-1 font-medium text-md">Team Size</label>
            <input 
              type="text" 
              name="teamSize" 
              placeholder="Enter team size"
              value={eventData.teamSize} 
              onChange={handleChange} 
              className="w-full p-2 pl-3 mt-1 text-black bg-white rounded-md" 
            />
          </div>
          <div>
            <button 
              type="submit" 
              className="w-32 pt-3 pb-3 pl-6 pr-6 mt-6 font-medium text-white bg-zinc-600 rounded-lg ml-[84.5%] hover:bg-zinc-700 duration-300"
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
