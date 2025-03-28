import React from 'react';
import { Mail, Phone,User, BookOpen, Database, Calendar } from 'lucide-react';
import { NavLink,useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, IconButton, CardHeader,Button } from '@mui/material';

import SideNavbar from '../../../components/SideNavbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MoreVertical } from 'lucide-react';

import TeacherListingrow from '../Components/TeacherListing';
import StudentListingrow from '../Components/StudentListing';
import Createclassroom from '../Components/Createclassroom';
import TableListingstudent from '../Components/TableListingstudent';
import TableListingteacher from '../Components/TableListingteacher';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import "../../../components/hover.css";

const ClassroomListingpage = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    async function getClassrooms() {
      const res = await axios.get(`http://localhost:3000/admin/${savedAuth.id}/classrooms`);
      console.log(res.data.classrooms);
      setClassrooms(res.data.classrooms);
      setLoading(false);
    }

    getClassrooms();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading Classrooms...</div>;
  }

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <SideNavbar />
        <div className="flex-1 p-8">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-2">Your Classrooms</h1>
           
           <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }} onClick={() => navigate('/admin/create-classroom')}>
            Create Classroom
           </Button>
          </div>

          {classrooms && classrooms.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <>
              {classrooms.map((classroom) => {
                return (
                  
                  <Card className="relative mb-8 h-48 hover-card" key={classroom._id} onClick={() => navigate(`/admin/classrooms/${classroom._id}`)}>
                   
                    <CardContent className="flex flex-col justify-center items-center h-full relative">
                      <Typography variant="h5" className="font-bold text-blue-600 text-center">
                        {classroom.name}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </>
          </div>
          ) : (
            <div className="text-center mt-8">
              <p className="text-gray-500">No classrooms found available.</p>
            </div>
          )}

      
        </div>
      </div>
    </>
  );
};

export default ClassroomListingpage;