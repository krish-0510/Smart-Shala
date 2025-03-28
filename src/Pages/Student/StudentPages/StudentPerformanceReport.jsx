import React, { useState } from 'react';
import LeftSideNavbar from '../Components/LeftSideNavBar';
import PerfComMain from '../Components/performanceRepoComponent/PerfComMain';
import EvaluateTestComponent from '../Components/performanceRepoComponent/EvaluateTestComponent';
import RightSideBar from '../Components/performanceRepoComponent/RightSideBar';
import axios from 'axios';
import { useEffect } from 'react';

const StudentPerformanceReport = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [submittedHomework, setSubmittedHomework] = useState([]);
  const [activeTab, setActiveTab] = useState('evaluate test');
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const [student, setStudent] = useState(null);

  useEffect(() => {
    async function fetchStudent() {
      const res = await axios.get(`http://localhost:3000/student/${savedAuth.id}`);
      console.log(res.data);
      setStudent(res.data.student);
      setSubmittedHomework(res.data.student.submittedHomeworks);
    }
    fetchStudent();
  },[])

  const handleToggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className="flex">
      <LeftSideNavbar isExpanded={isExpanded} toggleSidebar={handleToggleSidebar} />
      <div
        className={`flex-1 transition-width duration-300 ml-${
          isExpanded ? "64" : "16"
        } p-6 mr-50 overflow-x-auto`}
      >
        <div className={`flex ${activeTab === 'evaluate test' ? '' : 'flex-col'}`}>
          <div className={`flex-grow p-6 ${activeTab === 'evaluate test' ? 'w-3/4' : 'w-full'}`}>
            <PerfComMain activeTab={activeTab} setActiveTab={setActiveTab} />
           
            <div className="mt-6">
              {activeTab === 'evaluate test' && <EvaluateTestComponent />}

              {activeTab === 'overall performance' && (
                <h2 className="text-xl text-center">Overall Performance Section</h2>
              )}
             
              {activeTab === 'test results' && (
                <h2 className="text-xl text-center">Test Results Section</h2>
              )} 
              
            </div>
          </div>
          <div className='block'> 
          </div>
        
          {activeTab === 'evaluate test' && (
            <div className="w-1/4">
              <RightSideBar uploadedFiles={submittedHomework} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentPerformanceReport;
