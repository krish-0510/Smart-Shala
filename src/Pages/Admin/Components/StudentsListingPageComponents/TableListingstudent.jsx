import React, { useState, useEffect } from "react";
import {
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

const TableListingstudent = ({ id }) => {
  const [student, setStudent] = useState("");
  const [open, setOpen] = useState(false); // For controlling the modal
  const [isDeleting, setIsDeleting] = useState(false); // For managing delete state

  useEffect(() => {
    async function getstudents() {
      const res = await axios.get(`http://localhost:3000/student/${id}`);
      setStudent(res.data.student);
    }
    getstudents();
  }, [id]);

  // Function to open the modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Function to close the modal
  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle deletion
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.get(
        // /classroom/:cId/student/:sId/remove
        `http://localhost:3000/classroom/${student.classroom}/student/${student._id}/remove`
      );
      window.location.reload(); // Reload the page to update the table
    } catch (error) {
      console.error("Error deleting student:", error);
    } finally {
      setIsDeleting(false);
      setOpen(false); // Close the modal after completion
    }
  };

  return (
    <>
      <TableRow key={student}>
        <TableCell>{student.name}</TableCell>
        <TableCell>{student.rollno}</TableCell>
        <TableCell>{student.email}</TableCell>
        <TableCell>
          <Button variant="contained" color="primary" size="small">
            View
          </Button>
        </TableCell>
        <TableCell>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleOpen} // Open the confirmation modal
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>

      {/* Custom Confirmation Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            <strong>{student.name || "this student"}</strong> from the
            classroom? This action cannot be undone.
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
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TableListingstudent;
