import { TeacherIcon } from "../../Icons/NavIcon";
import { StudentIcon } from "../../Icons/NavIcon";
import { useState, useEffect } from "react";
import axios from "axios";
const DataCard = () => {
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    async function getAdmin() {
      const res = await axios.get(
        `http://localhost:3000/admin/${savedAuth.id}`
      );
      setAdmin(res.data.admin);
    }
    getAdmin();
  }, []);

  return (
    <div className="flex flex-wrap ">
      <div className="w-64 h-18 bg-white rounded-lg shadow-lg flex items-center justify-between p-4 mr-10">
        <div>
          <p className="text-gray-500 font-medium">Students</p>
          <p className="text-blue-600 text-3xl font-bold">
            {admin && admin.students.length}
          </p>
        </div>
        <div>
          <img
            src={StudentIcon}
            alt={`Students Icon`}
            className="h-12 w-12 text-blue-600"
          />
        </div>
      </div>
      <div className="w-64 h-18 bg-white rounded-lg shadow-lg flex items-center justify-between p-4 mr-10">
        <div>
          <p className="text-gray-500 font-medium">Teachers</p>
          <p className="text-blue-600 text-3xl font-bold">
            {admin && admin.teachers.length}
          </p>
        </div>
        <div>
          <img
            src={TeacherIcon}
            alt={`Techears Icon`}
            className="h-12 w-12 text-blue-600"
          />
        </div>
      </div>
      <div className="w-64 h-18 bg-white rounded-lg shadow-lg flex items-center justify-between p-4">
        <div>
          <p className="text-gray-500 font-medium">Classrooms</p>
          <p className="text-blue-600 text-3xl font-bold">
            {admin && admin.classrooms.length}
          </p>
        </div>
        <div>
          <img
            src={StudentIcon}
            alt={`Classroom Icon`}
            className="h-12 w-12 text-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default DataCard;
