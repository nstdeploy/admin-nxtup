import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEvents = () => {
    const navigate = useNavigate()
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
    teamSizeStart: '',
    teamSizeEnd:'',
    deadline:'',
  });
const [isUploading, setisUploading] = useState("")
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleFileChange = async (e) => {
      setisUploading("Uploading Image")
    try {
        var formdata = new FormData()
        formdata.append("file",e.target.files[0])
        var axres = await axios.post("https://9b04-115-244-141-202.ngrok-free.app/api/uploadImage",formdata)
        setEventData({ ...eventData, banner:axres.data.filePath  });
        setisUploading("")
    } catch (error) {
        setisUploading("")
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Event Data:',eventData);
    
    try {
    //   const formData = new FormData();
    //   for (const key in eventData) {
    //     formData.append(key, eventData[key]);
    //   };
    eventData["date"] = Number(new Date(eventData["date"]))
    eventData["teamSizeStart"] = Number((eventData["teamSizeStart"]))
    eventData["teamSizeEnd"] = Number((eventData["teamSizeEnd"]))
    eventData["prizeWorth"] = Number((eventData["prizeWorth"]))
    eventData["cost"] = Number((eventData["cost"]))
    eventData["deadline"] = Number(new Date(eventData["deadline"]))
    
      const response = await fetch('https://9b04-115-244-141-202.ngrok-free.app/api/events', {
        method: 'POST',
        body: JSON.stringify(eventData),
        headers:{
            "content-type":"application/json"
        }
      });
      var body = await response.json()
      if (response.ok) {
        console.log('Event added successfully!');
        navigate(`/addForm?id=${body.data._id}`)
        // window.location.href = ``;
      } else {
        console.error('Failed to add event');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }

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
              required
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
              required
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
              required
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
              required
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
              type="number" 
              required
              name="prizeWorth" 
              placeholder="Enter Prize"
              value={eventData.prizeWorth} 
              onChange={handleChange} 
              className="w-full p-2 pl-3 mt-1 text-black bg-white rounded-md" 
            />
          </div>
          <div>
            <label className="block mt-6 mb-1 font-medium text-md">Registration Fee</label>
            <input 
              type="number" 
              required
              name="cost" 
              placeholder="Enter registration fee"
              value={eventData.cost} 
              onChange={handleChange} 
              className="w-full p-2 pl-3 mt-1 text-black bg-white rounded-md" 
            />
          </div>
          <div>
            <label className="block mt-6 mb-1 font-medium text-md">Team Size Start</label>
            <input 
              type="number" 
              required
              name="teamSizeEnd" 
              placeholder="Enter min team size"
              value={eventData.teamSizeEnd} 
              onChange={handleChange} 
              className="w-full p-2 pl-3 mt-1 text-black bg-white rounded-md" 
            />
          </div>
          <div>
            <label className="block mt-6 mb-1 font-medium text-md">Team Size End</label>
            <input 
              type="number" 
              required
              name="teamSizeStart" 
              placeholder="Enter max team size"
              value={eventData.teamSizeStart} 
              onChange={handleChange} 
              className="w-full p-2 pl-3 mt-1 text-black bg-white rounded-md" 
            />
          </div>
          <div>
            <label className="block mt-6 mb-1 font-medium text-md">Registration Deadline</label>
            <input 
              type="date" 
              name="deadline" 
              value={eventData.deadline} 
              onChange={handleChange} 
              className="w-full p-2 mt-1 text-black bg-white rounded-md" 
            />
          </div>
          <div>
            <button 
              type="submit" 
              disabled={isUploading?true:false}
              className="w-[13rem] pt-3 pb-3 pl-6 pr-6 mt-6 font-medium text-white bg-zinc-600 rounded-lg ml-[74.5%] hover:bg-zinc-700 duration-300"
            >
              {isUploading?isUploading:"Add Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvents;
