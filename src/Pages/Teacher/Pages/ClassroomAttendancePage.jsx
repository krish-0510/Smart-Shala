import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar';
import { TableCell, TableRow, TableBody, TableContainer, Paper, Table, TableHead, Checkbox } from '@mui/material';
import toast from 'react-hot-toast';

const ClassroomAttendancePage = () => {
  const { classroomId } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    async function fetchStudents() {
      const savedAuth = JSON.parse(localStorage.getItem("auth"));
      if (savedAuth && savedAuth.id) {
        const res = await axios.get(`http://localhost:3000/teacher/${savedAuth.id}/classrooms/${classroomId}/manual-attendance`);
        setStudents(res.data.students);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
    fetchStudents();
  }, [classroomId]);

  const markAttendance = async (studentId, status) => {
    const url = status === 'present' ? 
      `http://localhost:3000/student/${studentId}/attendance/present` : 
      `http://localhost:3000/student/${studentId}/attendance/absent`;
    await axios.get(url);
    window.location.reload();
  };

  if (loading) {
    return <div className="text-center mt-8">Loading ...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-16'}`}>
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Classroom Attendance</h2>
          <div className={`flex-1 p-8 transition-all duration-300`}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Present/Absent</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell><Checkbox color="success" checked={student.presentDays.includes(new Date().toISOString().split("T")[0])} onClick={(e)=>{markAttendance(student._id, e.target.checked ? 'present' : 'absent')}}/></TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassroomAttendancePage;