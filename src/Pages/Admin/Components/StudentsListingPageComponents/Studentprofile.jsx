import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useState } from 'react';
import { getClassroomName } from '../../../../../Backend/Controller/classroom';
const Studentprofile = ({student}) => {
  
  return (
    <div>
        <DialogContent>
          <Typography variant="body1" className="mb-2">{student.email ? `Email: ${student.email}` : ``}</Typography>
          <Typography variant="body1" className="mb-2">{student.contact ? `Contact: ${student.contact}` : ``}</Typography>
          <Typography variant="body1" className="mb-2">{student.rollno ? `Roll No: ${student.rollno}` : ``}</Typography>
          <Typography variant="body1" className="mb-2">{student.address ? `Address: ${student.address}` : ``}</Typography>
          <Typography variant="body1" className="mb-2">{student.classroom ? `Class Name: ${getClassroomName(student.classroom)}` : ``}</Typography>
          </DialogContent>
    </div>
  );
};

export default Studentprofile