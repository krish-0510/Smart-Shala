import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./index.css";
import { Button,Card,CardContent } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TeacherListingpage from './TeacherListing';
import Dataanalyticspage from './Dataanalyticspage';
import Teacherloginportal from './Teacherloginportal';
import AdminLoginpage from './AdminLoginpage';
import SignupFunction from './Signupsection';
import StudentsListingpage from './StudentsListing';



function App() {

  // Routers page



  return (
    <>

    <BrowserRouter>

    <Routes>

    <Route path="/Teachers" element={<TeacherListingpage />} />
    <Route path="/students" element={<StudentsListingpage />} />
    <Route path="/data" element={<Dataanalyticspage />} />
    <Route path="/login" element={<Teacherloginportal />} />
    <Route path="/adminlogin" element={<AdminLoginpage/>} />
    <Route path='/Signup' element={<SignupFunction/>} />
    </Routes>
    
    </BrowserRouter>




    
  
    </>
  )
}

export default App