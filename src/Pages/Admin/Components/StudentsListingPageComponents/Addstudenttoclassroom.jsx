import React, { useState } from 'react';
import { Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, Paper, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, Checkbox } from '@mui/material';

const Addstudenttoclassroom = ({ students, onAddStudent }) => {
  const [openStudentDialog, setOpenStudentDialog] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleOpenStudentDialog = () => {
    setOpenStudentDialog(true);
  };

  const handleCloseStudentDialog = () => {
    setOpenStudentDialog(false);
  };

  const handleToggleStudent = (student) => () => {
    const currentIndex = selectedStudents.indexOf(student);
    const newSelectedStudents = [...selectedStudents];

    if (currentIndex === -1) {
      newSelectedStudents.push(student);
    } else {
      newSelectedStudents.splice(currentIndex, 1);
    }

    setSelectedStudents(newSelectedStudents);
  };

  return (
    <>
      <div className='flex justify-between'>
        <Typography variant="h5" className="mb-4">Students</Typography>
        <Button variant="contained" color="primary" className='mb-4' onClick={handleOpenStudentDialog}>
          Add Students
        </Button>
      </div>
     

    
      <Dialog open={openStudentDialog} onClose={handleCloseStudentDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Select Students</DialogTitle>
        <DialogContent>
          <List>
            {students.map((student) => !student.classroom && (
              <ListItem key={student.id} button onClick={handleToggleStudent(student)}>
                <Checkbox checked={selectedStudents.indexOf(student) !== -1} />
                <ListItemText primary={student.name} />
                <ListItemText primary={student.email} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStudentDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => { onAddStudent(selectedStudents); handleCloseStudentDialog(); }} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Addstudenttoclassroom;