import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoginNav from "../../components/LoginNav";
import Loader from "../../components/Loader";

function Registrations() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/");
    }
  }, [navigate]);

  const [studentData, setStudentData] = useState([]);
  const [eventKeys, seteventKeys] = useState([]);
  const [AllEventKeys, setAllEventKeys] = useState({});
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true)
    const getStudents = async () => {
      try {
        const response = await axios.post(
          "https://server-admin-nxtup-r754.onrender.com/api/getRegistedUsers",
          { id: id }
        );

        const Data = response.data.data;
        console.log(Data);
        setStudentData(Data);
        setAllEventKeys(Data[0]);
        seteventKeys(Object.keys(Data[0]["studentDetails"]));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
      finally {
        setisLoading(false);
      }
    };

    getStudents();
  }, [id]);

  if (isLoading) {
    return (
      <>
        <LoginNav />
        <div className="mt-16">
          <Loader />
          
        </div>
      </>
    );
  }

  return (
    <div className="text-white">
      {studentData.length === 0 ? <><LoginNav/><h1 className="text-white text-center mt-16 text-3xl">No Registrations as of now !</h1></> : 
        <>
      <LoginNav />
      <div className="flex justify-end items-center mr-[1rem]">
        <button
          className="px-[1rem] py-[0.8rem] bg-slate-900 text-white w-[12rem] rounded-tl-md rounded-tr-md cursor-pointer mt-[1rem]"
          onClick={() =>
            window.open(
              "https://server-admin-nxtup-r754.onrender.com/api/getAllEventRegistedUsers?id=" +
              AllEventKeys.eventId
            )
          }
          >
          Export as CSV
        </button>
      </div>
      <div className="flex items-center justify-center mt-5">
        <div className="relative flex flex-col w-[98vw] h-full overflow-scroll text-slate-300 bg-slate-800 shadow-md rounded-lg bg-clip-border">
          <table className="w-full text-left table-auto">
            <thead>
              <tr>
                {eventKeys.map((name) => (
                  <th className="p-4 border-b border-slate-600 bg-slate-700">
                    <p className="text-sm font-normal leading-none text-slate-300 text-center truncate">
                      {name}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {studentData.map((student) => (
                <tr className="hover:bg-slate-700 ">
                  {eventKeys.map((key, index) => (
                    <td
                    key={key}
                    className={`p-4 border-b border-slate-700 ${
                      index % 2 === 0 ? "bg-slate-900" : "bg-slate-800"
                    } w-[25%]`}
                    >
                      <div className="flex justify-center">
                        <span
                          className="text-sm text-slate-100 font-semibold /truncate /line-clamp-1 h-[20rem] overflow-y-scroll"
                          style={{ wordBreak: "break-all" }}
                          >
                          {student.studentDetails[key] || "No Value"}
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
              </>
            }
    </div>
  );
}

export default Registrations;
