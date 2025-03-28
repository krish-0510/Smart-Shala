import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SideNavbar from '../../../../components/SideNavbar';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ClassroomAnalytics = () => {
  const { classroomId } = useParams();
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState(null);
  const [topPerformers, setTopPerformers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassroomData = async () => {
      setLoading(true);
      try {
        const attendanceRes = await axios.get(`http://localhost:3000/classroom/${classroomId}/attendance`);
        const performersRes = await axios.get(`http://localhost:3000/classroom/${classroomId}/top-performers`);
        setAttendance(attendanceRes.data.average);
        setTopPerformers(performersRes.data.topPerformers);
      } catch (error) {
        console.error("Error fetching classroom data:", error);
      }
      setLoading(false);
    };
    fetchClassroomData();
  }, [classroomId]);

  if (loading) {
    return <div className="text-center mt-8">Loading ...</div>;
  }

  const attendanceData = [
    { name: 'Present', value: attendance },
    { name: 'Absent', value: 100 - attendance },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex-1 p-8">
        <button onClick={() => navigate(-1)} className="mb-4 p-2 bg-blue-500 text-white rounded">Back to Classrooms</button>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Classroom Analytics</h2>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Average Attendance
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={attendanceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                        {attendanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Top 3 Performers
                  </Typography>
                  <ul>
                    {topPerformers.map((student, index) => (
                      <li key={index}>{student.name} - {student.averageScore}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default ClassroomAnalytics;