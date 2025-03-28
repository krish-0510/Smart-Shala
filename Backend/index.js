import express from "express";

const app = express();
const PORT = 3000;
import {
  addStudent,
  getStudent,
  getAllStuents,
  deleteStudent,
  markPresent,
  markAbsent,
  getStudentDataAnalytics,
  getPendingHomeworkOfStudent,
  getSubmmitedHomeworkOfStudent,
  submitHomeWorkOfStudent,
  getPresentDaysAttendance,
} from "./Controller/student.js";
import {
  addTeacher,
  getTeacher,
  getAllTeachers,
  deleteTeacher,
  getClassroomsOfTeacher,
  getHomeworkAssignedByTeacher,
  getStudentsOfTeacher,
} from "./Controller/teacher.js";
import mongoose from "mongoose";
import cors from "cors";
import {
  getAllClassrooms,
  getClassroom,
  deleteClassroom,
  editClassroom,
  assignHomeworkToClassroom,
  initiateAttendance,
  assignStudentToClassroom,
  assignTeacherToClassroom,
  removeStudentFromClassroom,
  getHomeworkOfClass,
} from "./Controller/classroom.js";
import {
  addAdmin,
  addClassroomToAdmin,
  getClassroomsOfAdmin,
  getTeachersOfAdmin,
  getStudentsOfAdmin,
  addTeacherToAdmin,
  addStudentToAdmin,
  deleteStudentOfAdmin,
  deleteTeacherOfAdmin,
  deleteClassroomOfAdmin,
  getAdmin,
} from "./Controller/admin.js";
import {
  generateIssue,
  deleteIssue,
  markIssueAsResolved,
  getIssue,
  markIssueAsNotResolved,
} from "./Controller/issue.js";
import { getAnswer } from "./Controller/Chatbot.js";

// import  {requireSignIn}  from './middleware/requireSignIn.js';
import { adminLogin } from "./Controller/admin.js";
import LoginTeacher from "./Controller/loginTeacher.js";
import loginStudent from "./Controller/loginStudent.js";
// import analyzeImageFromFile from "./Controller/homeworkAnalysis.js";
import { getHomework } from "./Controller/homework.js";

app.use(express.json());

app.use(cors());


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  mongoose
    .connect(
      "mongodb+srv://zobime660:manush2005@cluster0.dxrqqdn.mongodb.net/SmartSha?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Connected to Database");
    });
});

// classroom routes 
app.get("/classroom/:id/delete", deleteClassroom);
app.post("/classroom/:id/edit", editClassroom);
app.post("/classroom/:id/initiate-attendance", initiateAttendance);
app.get("/classroom/:id", getClassroom);
app.post("/classroom/:id/assign-student", assignStudentToClassroom);
app.post("/classroom/:id/assign-teacher", assignTeacherToClassroom);
app.get("/classroom/:cId/student/:sId/remove", removeStudentFromClassroom);
app.get("/classroom/:id/homeworks", getHomeworkOfClass);

// teacher routes
app.post("/teacher/classrooms/:id/generate-issue", generateIssue);
app.get("/teacher/:id/classrooms", getClassroomsOfTeacher);
app.get("/teacher/:id", getTeacher);
app.post("/teacher/:id/assign-homework", assignHomeworkToClassroom);
app.get("/teacher/:id/delete", deleteTeacher);
app.get("/teacher/:id/homeworks", getHomeworkAssignedByTeacher);
app.get("/teacher/:id/students", getStudentsOfTeacher);

// student routes
app.get("/student/:id", getStudent);
app.get("/student/:id/attendance", getPresentDaysAttendance);
app.get("/student/:id/attendance/present", markPresent);
app.get("/student/:id/attendance/absent", markAbsent);
app.get("/student/:id/analytics", getStudentDataAnalytics);
app.get("/student/:id/submitted-homeworks", getSubmmitedHomeworkOfStudent);
app.get("/student/:sId/homework/:hId/submit", submitHomeWorkOfStudent);

// issue generation routes
app.get("/issue/:id/delete", deleteIssue);
app.get("/issue/:id", getIssue);
app.get("/issue/:id/resolve", markIssueAsResolved);
app.get("/issue/:id/refuse", markIssueAsNotResolved);

// admin routes
app.get("/admin/:id", getAdmin);
app.get("/admin/:id/classrooms", getClassroomsOfAdmin);
app.get("/admin/:id/students", getStudentsOfAdmin);
app.get("/admin/:id/teachers", getTeachersOfAdmin);
app.get("/admin/:aId/student/remove/:sId", deleteStudentOfAdmin);
app.get("/admin/:aId/teacher/remove/:tId", deleteTeacherOfAdmin);
app.get("/admin/:aId/classroom/remove/:cId", deleteClassroomOfAdmin);
app.post("/admin/:id/assign-classroom", addClassroomToAdmin);
app.post("/admin/:id/assign-teacher", addTeacherToAdmin);
app.post("/admin/:id/assign-student", addStudentToAdmin);
app.post("/addAdmin", addAdmin);

//homework routes
<<<<<<< HEAD
// app.get("/homework/analysis", analyzeImageFromFile);
=======
app.post("/homework/analysis", analyzeImageFromFile);
>>>>>>> 95ad77757c885088e1090aeb791e9294e6845598
app.get("/homework/:id", getHomework);

// chat bot routes
app.post("/getAnswer", getAnswer);

//login routes
app.post("/login/teacher", LoginTeacher);
app.post("/login/student", loginStudent);
app.post("/login/admin", adminLogin);

//signup routes
app.post("/signup/student", addStudent);
app.post("/signup/teacher", addTeacher);
app.post("/signup/admin", addAdmin);
