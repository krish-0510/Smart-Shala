import React, { useState } from 'react';
import { Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, Paper, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, Checkbox } from '@mui/material';

const addteachertoclassroom = ({ teachers, onAddTeacher, classroom }) => {
  const [openTeacherDialog, setOpenTeacherDialog] = useState(false);
  const [selectedTeachers, setSelectedTeachers] = useState([]);

  const handleOpenTeacherDialog = () => {
    setOpenTeacherDialog(true);
  };

  const handleCloseTeacherDialog = () => {
    setOpenTeacherDialog(false);
  };

  const handleToggleTeacher = (teacher) => () => {
    const currentIndex = selectedTeachers.indexOf(teacher);
    const newSelectedTeachers = [...selectedTeachers];

    if (currentIndex === -1) {
      newSelectedTeachers.push(teacher);
    } else {
      newSelectedTeachers.splice(currentIndex, 1);
    }

    setSelectedTeachers(newSelectedTeachers);
  };

  return (
    <>
      <div className='flex justify-between'>
        <Typography variant="h5" className="mb-4">Teachers</Typography>
        <Button variant="contained" color="primary" className='mb-4' onClick={handleOpenTeacherDialog}>
          Add Teachers
        </Button>
      </div>
    

     
      <Dialog open={openTeacherDialog} onClose={handleCloseTeacherDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Select Teachers</DialogTitle>
        <DialogContent>
          <List>
            {teachers.map((teacher) => !teacher.classrooms.includes(classroom._id) && (
              <ListItem key={teacher.id} button onClick={handleToggleTeacher(teacher)}>
                <Checkbox checked={selectedTeachers.indexOf(teacher) !== -1} />
                <ListItemText primary={teacher.name} />
                <ListItemText primary={teacher.email} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTeacherDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => { onAddTeacher(selectedTeachers); handleCloseTeacherDialog(); }} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default addteachertoclassroom;