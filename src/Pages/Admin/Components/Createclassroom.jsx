import React, { useState } from "react";
import { TextField, Button, Box, List, ListItem, ListItemText, Typography, Container, Drawer, IconButton, Chip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SideNavbar from "../../../components/SideNavbar";
import toast from "react-hot-toast";
import axios from "axios";

const Createclassroom = () => {
  const [classroomName, setClassroomName] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [subjectInput, setSubjectInput] = useState("");
  const [equipmentInput, setEquipmentInput] = useState("");
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  const handleAddSubject = () => {
    if (subjectInput.trim() !== "") {
      setSubjects([...subjects, subjectInput]);
      setSubjectInput("");
    }
  };

  const handleAddEquipment = () => {
    if (equipmentInput.trim() !== "") {
      setEquipments([...equipments, equipmentInput]);
      setEquipmentInput("");
    }
  };


  const handleSubmit = async(event) => {
    event.preventDefault();

    if(classroomName === "") {
      toast.error("Classroom is required");
      return;
    }
    try {
      const response = await axios.post(`http://localhost:3000/admin/${savedAuth.id}/assign-classroom`, {
        name : classroomName,
        subjects,
        equipments
      });
      toast.success("Classroom added successfully");
    } catch (error) {
      console.error('Error generating issue:', error);
      toast.error(error.response.data.message);
    }
    // Add your form submission logic here
  };

  return (
    <Box display="flex" className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideNavbar />

      {/* Main content */}
      <Container maxWidth="sm" sx={{ marginLeft: "250px", padding: 4 }}>
        <Box component="form" className="form-container" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Typography variant="h4" gutterBottom>Create Classroom</Typography>
          
          {/* Classroom Name */}
          <TextField
            label="Classroom Name"
            variant="outlined"
            value={classroomName}
            onChange={(e) => setClassroomName(e.target.value)}
            fullWidth
            required
          />

          {/* Subjects */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              label="Add Subject"
              variant="outlined"
              value={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleAddSubject}>Add</Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <h1>Subjects Added : </h1>
            {subjects.map((subject, index) => (
              <Chip key={index} label={subject} />
            ))}
          </Box>

          {/* Equipments */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              label="Add Equipment"
              variant="outlined"
              value={equipmentInput}
              onChange={(e) => setEquipmentInput(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleAddEquipment}>Add</Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <h1>Equipments Added : </h1>
            {equipments.map((equipment, index) => (
              <Chip key={index} label={equipment} />
            ))}
          </Box>

          {/* Submit Button */}
          <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }} onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Createclassroom;
