import "./index.css";
import { Routes, Route } from 'react-router-dom';
import TeacherListingpage from './Pages/Admin/Pages/TeacherListing';
import StudentListingpage from './Pages/Admin/Pages/StudentListing';
import Dataanalyticspage from './Pages/Admin/Pages/Dataanalyticspage';
import AdminLoginpage from './Pages/Admin/Pages/AdminLoginPage';

import StudentHomePage from './Pages/Student/StudentPages/StudentHomePage.jsx';
import AdminHome from './Pages/Admin/Pages/AdminHome';
import AddStudent from "./Pages/Student/StudentPages/StudentSignUpForm.jsx";
import AddTeacher from "./Pages/Teacher/Pages/TeacherSignUpForm.jsx";
import { Toaster } from "react-hot-toast";
import ClassroomListingpage from "./Pages/Admin/Pages/ClassroomListing.jsx";
import Classroom from "./Pages/Admin/Components/ClassroomsListingPageComponents/Classroom.jsx";
import SubmitHomework from "./Pages/Student/StudentPages/SubmitHomework.jsx";
import StudentNotification from "./Pages/Student/StudentPages/StudentNotification.jsx";
import Issuessection from "./Pages/Admin/Pages/Issuessection.jsx";

import TeacherHomePage from './Pages/Teacher/Pages/TeacherHomePage';
import TeacherSignUpForm from './Pages/Teacher/Pages/TeacherSignUpForm';
<<<<<<< HEAD
import TeacherProfilePage from './Pages/Teacher/Pages/TeacherProfilePage'; 
import MarkTeacherAttendance from './Pages/Teacher/Pages/MarkTeacherAttendance'; 
import GenerateTeacherIssue from './Pages/Teacher/Pages/GenerateTeacherIssue'; 
import StudentAnalyticsPage from './Pages/Teacher/Pages/StudentAnalyticsPage';
import StudentListPage from './Pages/Teacher/Pages/StudentListPage';
=======
import TeacherProfilePage from './Pages/Teacher/Pages/TeacherProfilePage';
import MarkTeacherAttendance from './Pages/Teacher/Pages/MarkTeacherAttendance';
import GenerateTeacherIssue from './Pages/Teacher/Pages/GenerateTeacherIssue';
import ClassroomStudents from './Pages/Teacher/Pages/ClassroomStudents';
>>>>>>> 40608f5c71c8fd857f6e062fd65bd20684d61de9

import AdminForm from "./Pages/Admin/Pages/AdminSignup.jsx";
import AddHomeworkPage from './Pages/Teacher/Components/HomeworkComponents/AddHomeworkPage.jsx';
import StudentChatbot from "./Pages/Student/StudentPages/StudentChatbot.jsx";
import TeachersClassroom from "./Pages/Teacher/Pages/TeachersClassroom.jsx";

import StudentAttendancePage from "./Pages/Student/StudentPages/StudentAttendancePage.jsx";
import CommonLogin from "./Pages/InitialPages/CommonLogin.jsx";
import TeacherLogin from "./Pages/InitialPages/TeacherLogin.jsx";
import StudentLogin from "./Pages/InitialPages/StudentLogin.jsx";
import LoginAlert from "./components/LoginAlert.jsx";
import PageNotFound from "./components/PageNotFound.jsx"

import LandingPage from './Pages/InitialPages/LandingPage.jsx';

import Createclassroom from "./Pages/Admin/Components/ClassroomsListingPageComponents/Createclassroom.jsx";
import HwSubmission from "./Pages/Teacher/Pages/HwSubmission.jsx";
import TeacherEmergencyForm from "./Pages/Teacher/Pages/TeacherEmergencyForm.jsx";
import CheckAllAttendance from './Pages/Teacher/Pages/CheckAllAttendance';
import ClassroomAnalytics from './Pages/Admin/Components/DataAnalyticsPageComponents/ClassroomAnalytics.jsx';

import ViewClassrooms from './Pages/Teacher/Pages/ViewClassrooms';
import ClassroomSubmittedHomeworks from './Pages/Teacher/Pages/ClassroomSubmittedHomeworks';
import ClassroomsLowAttendance from './Pages/Teacher/Pages/ClassroomsLowAttendance';
import PendingList from "./Pages/Student/Components/submitHWComponent/PendingList.jsx"; 
import StudentPerformanceReport from "./Pages/Student/StudentPages/StudentPerformanceReport.jsx";
import FilePreviewMain from "./Pages/Student/Components/performanceRepoComponent/FilePreviewMain.jsx";
import ManualAttendancePage from "./Pages/Teacher/Pages/ManualAttendancePage.jsx";
import ClassroomAttendancePage from "./Pages/Teacher/Pages/ClassroomAttendancePage.jsx";

import ResourceManagement from './Pages/Admin/Pages/ResourceManagement';
import RequestResource from './Pages/Teacher/Pages/RequestResource';

function App() {
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  // Routers page
  return (
    <>

      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Admin Page Routes */}
        <Route path='/admin' element={savedAuth && savedAuth.role == 'admin' ? <AdminHome /> : <LoginAlert />} />
        <Route path="/admin/students" element={savedAuth && savedAuth.role == 'admin' ? <StudentListingpage /> : <LoginAlert />} />
        <Route path="/admin/teachers" element={savedAuth && savedAuth.role == 'admin' ? <TeacherListingpage /> : <LoginAlert />} />
        <Route path="/admin/classrooms" element={savedAuth && savedAuth.role == 'admin' ? <ClassroomListingpage /> : <LoginAlert />} />
        <Route path="/admin/create-classroom" element={savedAuth && savedAuth.role == 'admin' ? <Createclassroom /> : <LoginAlert />} />
        <Route path="/admin/classrooms/:id" element={savedAuth && savedAuth.role == 'admin' ? <Classroom /> : <LoginAlert />} />
        <Route path="/admin/data-analytics" element={savedAuth && savedAuth.role == 'admin' ? <Dataanalyticspage /> : <LoginAlert />} />
        <Route path='/admin/issues' element={savedAuth && savedAuth.role == 'admin' ? <Issuessection /> : <LoginAlert />} />
        <Route path="/admin/classrooms/:classroomId/analytics" element={savedAuth && savedAuth.role == 'admin' ? <ClassroomAnalytics /> : <LoginAlert />} />
        <Route path="/admin/resources" element={savedAuth && savedAuth.role === 'admin' ? <ResourceManagement /> : <LoginAlert />} />
      
        {/* Student Page Routes  */}
        <Route path='/student' element={savedAuth && savedAuth.role == 'student' ? <StudentHomePage /> : <LoginAlert />} />
        <Route path='/student/submit-homework' element={savedAuth && savedAuth.role == 'student' ? <SubmitHomework /> : <LoginAlert />} />
        <Route path='/student/notification' element={savedAuth && savedAuth.role == 'student' ? <StudentNotification /> : <LoginAlert />} />
        <Route path='/student/doubts' element={savedAuth && savedAuth.role == 'student' ? <StudentChatbot /> : <LoginAlert />} />
        <Route path='/student/:id/pending-homework' element={savedAuth && savedAuth.role == 'student' ? <PendingList /> : <LoginAlert />} />
        <Route path='/student/attendance' element={savedAuth && savedAuth.role == 'student' ? <StudentAttendancePage /> : <LoginAlert />} />
        <Route path="/student/homework/:id/preview" element={savedAuth && savedAuth.role == 'student' ? <FilePreviewMain/> : <LoginAlert />} />
        <Route path='/student/performance' element={savedAuth && savedAuth.role == 'student' ? <StudentPerformanceReport/> : <LoginAlert />}   /> 

        {/* Teacher Page Routes */}
        <Route path='/teacher' element={savedAuth && savedAuth.role == 'teacher' ? <TeacherHomePage /> : <LoginAlert />} />
        <Route path='/teacher/signup' element={savedAuth && savedAuth.role == 'teacher' ? <TeacherSignUpForm /> : <LoginAlert />} />
        <Route path="/teacher/add-homework/form" element={savedAuth && savedAuth.role == 'teacher' ? <AddHomeworkPage /> : <LoginAlert />} />
        <Route path="/teacher/:id/homework/:hId/submissions" element={savedAuth && savedAuth.role == 'teacher' ? <HwSubmission /> : <LoginAlert />} />
        <Route path='/teacher/mark-attendance' element={savedAuth && savedAuth.role == 'teacher' ? <MarkTeacherAttendance /> : <LoginAlert />} />
        <Route path="/teacher/classrooms" element={savedAuth && savedAuth.role == 'teacher' ? <TeachersClassroom /> : <LoginAlert />} />
        <Route path='/teacher/generate-issue' element={savedAuth && savedAuth.role == 'teacher' ? <GenerateTeacherIssue /> : <LoginAlert />} />
<<<<<<< HEAD
        <Route path="/teacher/students" element={savedAuth && savedAuth.role == 'teacher' ? <StudentListPage /> : <LoginAlert />} />
        <Route path="/teacher/student/:studentId/analytics" element={savedAuth && savedAuth.role == 'teacher' ? <StudentAnalyticsPage /> : <LoginAlert />} />

        
=======
        <Route path="/teacher/classrooms/:classroomId/students" element={savedAuth && savedAuth.role == 'teacher' ? <ClassroomStudents /> : <LoginAlert />} />
        <Route path="/teacher/check-all-attendance" element={savedAuth && savedAuth.role == 'teacher' ? <CheckAllAttendance /> : <LoginAlert />} />
        <Route path="/teacher/classroomsforHomework" element={savedAuth && savedAuth.role == 'teacher' ? <ViewClassrooms /> : <LoginAlert />} />
        <Route path="/teacher/classroom/:id/submitted-homeworks" element={savedAuth && savedAuth.role == 'teacher' ? <ClassroomSubmittedHomeworks /> : <LoginAlert />} />
        <Route path="/teacher/classrooms-low-attendance" element={savedAuth && savedAuth.role == 'teacher' ? <ClassroomsLowAttendance /> : <LoginAlert />} />
        <Route path="/teacher/request-resource" element={savedAuth && savedAuth.role == 'teacher' ? <RequestResource /> : <LoginAlert />} />
        <Route path="/teacher/manual-attendance" element={savedAuth && savedAuth.role == 'teacher' ? <ManualAttendancePage /> : <LoginAlert />} />
        <Route path="/teacher/classrooms/:classroomId/manual-attendance" element={savedAuth && savedAuth.role == 'teacher' ? <ClassroomAttendancePage /> : <LoginAlert />} />

>>>>>>> 40608f5c71c8fd857f6e062fd65bd20684d61de9
        {/* SignUp Page Routes */}
        <Route path='/signup/student' element={<AddStudent />} />
        <Route path='/signup/teacher' element={<AddTeacher />} />
        <Route path="/signup/admin" element={<AdminForm />} />

        {/* Login Page Routes */}
        <Route path="/login" element={<CommonLogin />} />
        <Route path="/login/admin" element={<AdminLoginpage />} />
        <Route path="/login/teacher" element={<TeacherLogin />} />
        <Route path="/login/student" element={<StudentLogin />} />



        {/* emergency alert routes */}

        <Route path="/teacher/emergency" element={savedAuth && savedAuth.role == 'teacher' ? <TeacherEmergencyForm /> : <LoginAlert />} />


        <Route path="*" element={<PageNotFound />} />

      </Routes>
      <Toaster />
    </>
  )
}

export default App
