import SideNavbar from "../../../components/SideNavbar";
import { useState,useEffect } from "react";
import axios from "axios";
import Teacherprofile from "../Components/Teacherprofile";
import { SavedSearch } from "@mui/icons-material";
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

const TeacherListingpage = () => {


  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");


// Thiss useEffect hookk willl try to preload the data from the server before rendering the screen.
  useEffect(()=>{

    async function fetchTeachers(){

      const res = await axios.get(`http://localhost:3000/admin/${savedAuth.id}/teachers`);

      console.log(res.data.teachers);
      setTeachers(res.data.teachers);
      setLoading(false);
    }
    fetchTeachers();

  },[]);

  const filteredTeachers = teachers
    .filter((teacher) =>
      teacher[sortOption].toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
        return a[sortOption].localeCompare(b[sortOption]);
    });

  if (loading) {
    return <div className="text-center mt-8">Loading Teachers...</div>;
  }




  return (
    <>

<div className="flex min-h-screen bg-gray-100">
   <SideNavbar/>
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Teachers</h1>
        </div>

        {teachers && teachers.length > 0 ? (
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
          </Select>
        </FormControl>

        <Grid container spacing={3}>
        {filteredTeachers.map((teacher) => (
          <Grid item xs={12} sm={6} md={4} key={teacher._id}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {teacher.name}
                </Typography>
                {teacher.email && <Typography color="textSecondary">Email: {teacher.email}</Typography>}
                {teacher.contact && <Typography color="textSecondary">Contact: {teacher.contact}</Typography>}
              </CardContent>
            </Card>
          </Grid>
        ))}
        </Grid>
        </>
        ) : (
          <div className="text-center mt-8">No teacher found</div>
        )}
      </div>
    </div>


    
    </>
  )
}

export default TeacherListingpage