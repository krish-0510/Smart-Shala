import React, { useState, useEffect } from "react";
import SideNavbar from "../../../../components/SideNavbar";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import TableListingstudent from "../StudentsListingPageComponents/TableListingstudent";
import TableListingteacher from "../TeachersListingPageComponents/TableListingteacher";
import Addstudenttoclassroom from "../StudentsListingPageComponents/Addstudenttoclassroom";
import Addteachertoclassroom from "../TeachersListingPageComponents/Addteachertoclassroom";
import toast from "react-hot-toast";

const Classroom = () => {
  const { id } = useParams();
  const [classroom, setClassroom] = useState(null);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editDetails, setEditDetails] = useState({
    name: "",
    subjects: "",
    endingDate: "",
  });

  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    async function fetchClassroom() {
      try {
        const res = await axios.get(`http://localhost:3000/classroom/${id}`);
        setClassroom(res.data.classroom);
      } catch (error) {
        console.error("Error fetching classroom data:", error);
      }
    }

    async function fetchStudentsforadmin() {
      try {
        const res = await axios.get(
          `http://localhost:3000/admin/${savedAuth.id}/students`
        );
        setStudents(res.data.students);
      } catch (error) {
        console.error("Error fetching classroom data:", error);
      }
    }

    async function fetchTeachersforadmin() {
      try {
        const res = await axios.get(
          `http://localhost:3000/admin/${savedAuth.id}/teachers`
        );
        setTeachers(res.data.teachers);
      } catch (error) {
        console.error("Error fetching classroom data:", error);
      }
    }

    fetchClassroom();
    fetchStudentsforadmin();
    fetchTeachersforadmin();
  }, [id]);

  const addStudentFunction = async (selectedstudentList) => {
    try {
      const promises = selectedstudentList.map(async (student) => {
        const res = await axios.post(
          `http://localhost:3000/classroom/${id}/assign-student`,
          {
            email: student.email,
          }
        );
        return res.data.student;
      });

      const addedStudents = await Promise.all(promises);
      setStudents((prevStudents) => [...prevStudents, ...addedStudents]);
      window.location.reload();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const Addteacherfunction = async (selectedTeacherlist) => {
    try {
      const promises = selectedTeacherlist.map(async (teacher) => {
        const res = await axios.post(
          `http://localhost:3000/classroom/${id}/assign-teacher`,
          {
            email: teacher.email,
          }
        );
        return res.data.teacher;
      });

      const addedteacher = await Promise.all(promises);
      setTeachers((prevTeachers) => [...prevTeachers, ...addedteacher]);
      window.location.reload();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleOpenDialog = () => {
    setEditDetails({
      name: classroom?.name || "",
      subjects: classroom?.subjects?.join(", ") || "",
      endingDate: classroom?.endingDate || "",
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      const updatedClassroom = {
        name: editDetails.name,
        subjects: editDetails.subjects.split(",").map((s) => s.trim()),
        endingDate: editDetails.endingDate,
      };

      await axios.post(
        `http://localhost:3000/classroom/${id}/edit`,
        updatedClassroom
      );
      setClassroom({ ...classroom, ...updatedClassroom });
      handleCloseDialog();
      toast.success("Classroom Edited succcessfully");
    } catch (error) {
      console.error("Error updating classroom:", error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <SideNavbar />

        <div className="flex-1 p-8">
          <Box className="p-8">
            {classroom ? (
              <>
                <div className="flex justify-between mb-10">
                  <Typography variant="h4" className="mb-4">
                    {classroom.name} Classroom Details
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    className="mb-4"
                    onClick={handleOpenDialog}
                  >
                    Edit Classroom
                  </Button>
                </div>

                <div className="flex justify-between">
                  <Typography variant="h5" className="mb-4">
                    Students
                  </Typography>
                  <Addstudenttoclassroom
                    students={students}
                    onAddStudent={addStudentFunction}
                  />
                </div>
                <TableContainer component={Paper} className="mb-4">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Contact no</TableCell>
                        <TableCell>Action</TableCell>
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {classroom.students.map((student) => (
                        <TableListingstudent id={student} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <div className="flex justify-between">
                  <Typography variant="h5" className="mb-4">
                    Teachers
                  </Typography>
                  <Addteachertoclassroom
                    teachers={teachers}
                    onAddTeacher={Addteacherfunction}
                    classroom={classroom}
                  />
                </div>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Contact no</TableCell>
                        <TableCell>Action</TableCell>
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {classroom.teachers.map((teacher) => (
                        <TableListingteacher id={teacher} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) : (
              <h1>No nothing</h1>
            )}
          </Box>
        </div>
      </div>

      {/* Dialog for Editing Classroom */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Classroom</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            name="name"
            value={editDetails.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Subjects (comma-separated)"
            fullWidth
            margin="dense"
            name="subjects"
            value={editDetails.subjects}
            onChange={handleInputChange}
          />
          <TextField
            label="Ending Date"
            type="date"
            fullWidth
            margin="dense"
            name="endingDate"
            value={editDetails.endingDate}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Classroom;
