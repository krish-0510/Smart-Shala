import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNavbar from '../../../components/SideNavbar';
import axios from 'axios';

const Dataanalyticspage = () => {
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClassrooms() {
      const res = await axios.get(`http://localhost:3000/admin/${savedAuth.id}/classrooms`);
      setClassrooms(res.data.classrooms);
      setLoading(false);
    }
    fetchClassrooms();
  }, [savedAuth.id]);

  const handleClassroomClick = (classroomId) => {
    navigate(`/admin/classrooms/${classroomId}/analytics`);
  };

  if (loading) {
    return <div className="text-center mt-8">Loading ...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Class Analytics</h1>
          <p className="text-gray-600">Comprehensive overview of student performance metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((classroom) => (
            <div
              key={classroom._id}
              className="bg-white p-6 rounded-lg shadow cursor-pointer"
              onClick={() => handleClassroomClick(classroom._id)}
            >
              <h2 className="text-lg font-semibold mb-4">Class: {classroom.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dataanalyticspage;