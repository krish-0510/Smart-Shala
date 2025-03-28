import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useState } from 'react';
const Teacherprofile = ({Teachers}) => {
  
  return (
    <div>
        <DialogContent>
          <Typography variant="body1" className="mb-2">{Teachers.email ? `Email: ${Teachers.email}` : ``}</Typography>
          <Typography variant="body1" className="mb-2">{Teachers.contact ? `Contact: ${Teachers.contact}` : ``}</Typography>
          <Typography variant="body1" className="mb-2">{Teachers.address ? `Address: ${Teachers.address}` : ``}</Typography>
          <Typography variant="body1" className="mb-2">Subjects:</Typography>
          <List>
            {Teachers.subjects?.map((subject, index) => (
              <ListItem key={index}>
                <ListItemText primary={subject} />
              </ListItem>
            ))}
          </List>
          </DialogContent>
    </div>
  );
};

export default Teacherprofile