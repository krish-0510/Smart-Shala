import React, { useState, useEffect } from 'react';
import {
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import axios from 'axios';

const TableListingteacher = ({ id }) => {
  const [teacher, setTeacher] = useState('');
  const [open, setOpen] = useState(false); 
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function getTeachers() {
      try {
        const res = await axios.get(`http://localhost:3000/teacher/${id}`);
        setTeacher(res.data.teacher);
      } catch (error) {
        console.error('Error fetching teacher:', error);
      }
    }
    getTeachers();
  }, [id]);

  // open alert box
  const handleOpen = () => {
    setOpen(true);
  };

  // close alert box
  const handleClose = () => {
    setOpen(false);
  };

  //  deletion
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.get(
        `http://localhost:3000/classroom/${teacher.classroom}/teacher/${teacher._id}/remove`
      );
      window.location.reload(); 
    } catch (error) {
      console.error('Error deleting teacher:', error);
    } finally {
      setIsDeleting(false);
      setOpen(false); 
    }
  };

  return (
    <>
      <TableRow key={teacher._id}>
        <TableCell>{teacher.name}</TableCell>
        <TableCell>{teacher.email}</TableCell>
        <TableCell>{teacher.contact}</TableCell>
        <TableCell>
          <Button variant="contained" color="primary" size="small">
            View
          </Button>
        </TableCell>
        <TableCell>
          <Button variant="outlined" color="error" size="small" onClick={handleOpen}>
            Delete
          </Button>
        </TableCell>
      </TableRow>

      {/* Confirmation Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{' '}
            <strong>{teacher.name || 'this teacher'}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            disabled={isDeleting} // Disable button during deletion
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TableListingteacher
