import React, { useEffect, useState } from "react";
import TeacherLeftSideNavBar from "../Components/TeacherLeftSideNavBar";
import { useAuth } from "../../../context/auth";
import { useNavigate } from "react-router-dom";
import TeacherProfile from "../Components/ProfilePageComponents/TeacherProfile";
import axios from "axios";


const TeacherHomePage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  const toggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

  // Handle navigation if user is not authenticated or not a teacher
  useEffect(() => {

    // Fetch teacher data from the server
    async function fetchTeacher() {
      try {
        const response = await axios.get(`http://localhost:3000/teacher/${savedAuth.id}`); 
        setTeacher(response.data.teacher);
      } catch (error) {
        console.error('Error fetching teacher data:', error);
      }
    }
    fetchTeacher();

  }, []);


  return (
    <>
    
    <div className="flex flex-wrap">
      {/* Left Sidebar */}
      <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div
        className={`flex-1 transition-width duration-300 ml-${
          isExpanded ? "64" : "16"
        } p-6 mr-50 overflow-x-auto`}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center p-2 shadow-sm">
          {/* Title */}
          <div className="max-w-3xl">
          
           <h1 className="text-3xl font-bold mb-4">Welcome {teacher && teacher.name}</h1>
          </div>

          <hr className="mb-6" />

          
        </div>
        <div className="max-w-2xl bg-white p-6 rounded-lg shadow-sm">
           {teacher && <TeacherProfile teacher={teacher} />}
        
          </div>
        
      </div>
    </div>

    
    </>
    
  );
};

export default TeacherHomePage;
