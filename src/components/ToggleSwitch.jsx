import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ToggleSwitch = ({ status, id }) => {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    setIsOn(status);
  }, [status]);

  const toggleSwitch = () => {
    setIsOn((prevState) => !prevState);
    updateEventStatus(!isOn);
  };

  const updateEventStatus = async (status) => {
    try {
      const requestData = {
        id: id,
        active: status,
      };
      const response = await axios.post(
        "https://server-admin-nxtup-r754.onrender.com/api/toggleEventStatus",
        requestData,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
          },
        }
      );
      const Data = await response.data.message;
      toast.success(Data);
      // console.log(Data);
    } catch (error) {
      console.error("Error updating event status:", error);
    }
  };

  return (
    <div
      className={`relative w-20 h-10 rounded-full cursor-pointer border-2 transition-all duration-500 ${
        isOn ? "border-green-500" : "border-red-500"
      }`}
      onClick={toggleSwitch}
    >
      <div
        className={`absolute top-1 bottom-1 ${
          isOn
            ? "left-10 w-7 bg-green-500 shadow-lg"
            : "right-10 w-7 bg-red-500"
        } rounded-full transition-all duration-300`}
      ></div>
    </div>
  );
};

export default ToggleSwitch;
