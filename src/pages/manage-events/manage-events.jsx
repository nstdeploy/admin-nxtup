import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToggleSwitch from "../../components/ToggleSwitch";
import LoginNav from "../../components/LoginNav";
import axios from "axios";
import Loader from "../../components/Loader";

function ManageEvents() {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/");
    }
  }, [navigate]);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get(
          "https://server-admin-nxtup-r754.onrender.com/api/events",
          { headers: { "ngrok-skip-browser-warning": "69420" } }
        );

        const Data = response.data.data.reverse();
        setEvents(Data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    getEvents();
  }, []);

  const EventName = [
    "Event Title",
    "Start",
    "End",
    "Location",
    "TeamSize",
    "Registrations",
    "Form",
    "LiveStatus",
  ];
  

  if (events.length === 0) {
    return (
      <>
        <LoginNav />
        <Loader />
      </>
    );
  }

  return (
    <>
      <div className="text-white">
        <LoginNav />
        <div className="flex items-center justify-center mt-5">
          <div className="relative flex flex-col w-[98vw] h-full overflow-scroll text-slate-300 bg-slate-800 shadow-md rounded-lg bg-clip-border">
            <table className="w-full text-left table-auto">
              <thead>
                <tr>
                  {EventName.map((name) => (
                    <th className="p-4 border-b border-slate-600 bg-slate-700 ">
                      <p className="text-sm font-normal leading-none text-slate-300 text-center line-clamp-1">
                        {name}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr className="hover:bg-slate-700 ">
                    <td className="p-4 border-b border-slate-700 bg-slate-900 w-[25%]">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-100 font-semibold truncate line-clamp-1">
                          {event.Title}
                        </span>
                        <div className="flex">
                          {/* <span className="h-7 w-7 bg-white rounded-xl flex items-center justify-center cursor-pointer mr-1">
                            <img
                              src="assets/archive.png"
                              alt="archive"
                              className="h-[80%] w-[80%]"
                            />
                          </span> */}
                          <span
                            onClick={() => {
                              navigate("/addevents?id=" + event._id);
                            }}
                            className="h-7 w-7 bg-white rounded-md flex items-center justify-center cursor-pointer ml-1 "
                          >
                            <img
                              src="assets/edit.png"
                              alt="archive"
                              className="h-[80%] w-[80%] "
                            />
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-700 bg-slate-800 w-[10%]">
                      <p className="text-sm text-slate-300  text-center">
                        {new Date(event.Date).toDateString()}
                        {/* {event.Date} */}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-700 bg-slate-900 w-[10%]">
                      <p className="text-sm text-slate-300  text-center">
                        {new Date(event.Deadline).toDateString()}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-700 bg-slate-800 w-[15%]">
                      <p className="text-sm text-slate-300  text-center">
                        {event.Location}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-700 bg-slate-900 w-[10%]">
                      <p className="text-sm text-slate-300  text-center">
                        {event.TeamSizeStart && event.TeamSizeEnd
                          ? `${event.TeamSizeStart}-${event.TeamSizeEnd}`
                          : "N/A"}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-700 bg-slate-800 w-[10%]">
                      <div className="text-sm text-slate-300  text-center flex items-center justify-center">
                        <span className="pr-3">{event.Registered}</span>
                        <img
                          src="assets/next.png"
                          alt="See more.."
                          className="h-6 w-6 bg-white rounded-full cursor-pointer"
                          onClick={() => {
                            navigate(`/events/${event._id}`);
                          }}
                        />
                      </div>
                    </td>
                    <td className="p-4 border border-white bg-slate-900 w-[10%]">
                      <p
                        onClick={() => {
                          navigate("/addForm?id=" + event._id);
                        }}
                        className="text-sm text-slate-300  text-center hover:underline hover:text-blue-600 cursor-pointer"
                      >
                        {/* {event.Form} */}
                        Update Form
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-700 bg-slate-800 w-[10%]">
                      <div className="text-sm text-slate-300  text-center scale-50">
                        <ToggleSwitch status={event.IsActive} id={event._id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageEvents;
