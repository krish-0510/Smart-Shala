import SideNavbar from "../../../components/SideNavbar";
import { useState,useEffect } from "react";
import axios from "axios";
import StudentProfile from "../Components/Studentprofile";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const StudentListingpage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const savedAuth = JSON.parse(localStorage.getItem("auth"));


// Thiss useEffect hookk willl try to preload the data from the server before rendering the screen.
  useEffect(()=>{

    async function fetchStudents(){

      const res = await axios.get(`http://localhost:3000/admin/${savedAuth.id}/students`);

      console.log(res.data.students);
      setStudents(res.data.students);
      setLoading(false);
    }
    fetchStudents();

  },[]);

  if (loading) {
    return <div className="text-center mt-8">Loading Students...</div>;
  }

  const filteredStudents = students
    .filter((student) =>
      student[sortOption].toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
        return a[sortOption].localeCompare(b[sortOption]);
    });




  return (
    <>

<div className="flex min-h-screen bg-gray-100">
   <SideNavbar/>
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Students</h1>
        </div>

        {students && students.length > 0 ? (
          <>

          {/* Search bar */}
          <TextField
          label="Search here"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Sorting dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="email">Parent Name</MenuItem>
          </Select>
        </FormControl>

        <Grid container spacing={3}>
        {filteredStudents.map((student) => (
          <Grid item xs={12} sm={6} md={4} key={student._id}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {student.name}
                </Typography>
                {student.email && <Typography color="textSecondary">Email: {student.email}</Typography>}
                {student.contact && <Typography color="textSecondary">Contact: {student.contact}</Typography>}
                {student.parentName && <Typography color="textSecondary">Parent Name: {student.parentName}</Typography>}
                {student.parentContact && <Typography color="textSecondary">Parent Contact: {student.parentContact}</Typography>}
                {student.address && <Typography color="textSecondary">Address: {student.address}</Typography>}
              </CardContent>
            </Card>
          </Grid>
        ))}
        </Grid>
        </>
        ) : (
          <div className="text-center mt-8">No student found</div>
        )}
      </div>
    </div>


    
    </>
  )
}

export default StudentListingpage