import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoginNav from "../../components/LoginNav";
import Loader from "../../components/Loader";

function Registrations() {
  const { id } = useParams();

  const [studentData, setStudentData] = useState([]);
  const [eventKeys, seteventKeys] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await axios.post(
          "https://server-admin-nxtup-r754.onrender.com/api/getRegistedUsers",
          { id: id }
        );

        const Data = response.data.data;
        console.log(Data);
        setStudentData(Data);
        seteventKeys(Object.keys(Data[0]["studentDetails"]));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    getStudents();
  }, [id]);

  if (studentData.length === 0) {
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
      <LoginNav />

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
                  {Object.keys(student.studentDetails || {}).map(
                    (key, index) => (
                      <td
                        key={key}
                        className={`p-4 border-b border-slate-700 ${
                          index % 2 === 0 ? "bg-slate-900" : "bg-slate-800"
                        } w-[25%]`}
                      >
                        <div className="flex justify-center">
                          <span className="text-sm text-slate-100 font-semibold truncate">
                            {student.studentDetails[key] || "No Value"}
                          </span>
                        </div>
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Registrations;
