import SideNavbar from "../../../components/SideNavbar";
import { useState,useEffect } from "react";
import axios from "axios";
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
import toast from "react-hot-toast";

const StudentListingpage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

// Student Form handleres
const [isVisible, setIsVisible] = useState(false);
const [studentEmail , setStudentEmail] = useState("")
const toggleVisibility = () => {
  setIsVisible(!isVisible);
};
//this is function is to post to add teacher
const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent form default behavior
  if (!studentEmail) {
    alert("Please enter a valid email.");
    return;
  }

  try {
    const response = await axios.post(
      // /admin/:id/assign-student
      `http://localhost:3000/admin/${savedAuth.id}/assign-student`,
      { email: studentEmail }, 
      
    );
    console.log("Student added:", response.data);
    toast.success("Student added successfully!");
    setStudentEmail(""); // Clear the input field after successful submission
    toggleVisibility(); // Hide the form after adding
  } catch (error) {
    console.error("Error adding student:", error);
    toast.error(error.response.data.message);
  }
};




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

<div className="flex min-h-screen bg-gray-200">
   <SideNavbar/>
      <div className="flex-1 p-8 bg-white rounded m-5 w-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Students</h1>
          <button type="button"
  onClick={toggleVisibility}
  className="text-white bg-[rgb(45,132,239)] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2" 
  >Add Student</button>
        </div>

{/* Form to add Student */}

<div>
  
   

  {isVisible && (
    <div className="bg-white shadow-lg rounded-md w-[500px] h-[550px] absolute z-20 ml-[25%] p-6">
  
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-lg">Add Student</h1>
        <button
          className="text-gray-400 hover:text-black focus:outline-none"
          onClick={toggleVisibility}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <hr />
     
      <div className="flex pt-7 justify-center h-full items-center">
      <form className="flex flex-col gap-5 mb-10" onSubmit={handleSubmit}>
<input
  type="email"
  value={studentEmail}
  onChange={(e) => setStudentEmail(e.target.value)}
  className="border px-20 py-5 mb-5 rounded-md"
  placeholder="email@email.com"
/>
<button
  type="submit"
  className="justify-center text-white bg-[rgb(45,132,239)] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
>
  Add Student
</button>
</form>
      </div>
    </div>
  )}
</div>

       {/* end of form to add Student */}
        
         
         
  
      






        {students && students.length > 0 ? (
          <>
<div className="flex gap-5 mb-10">
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
          <InputLabel id="sort-label" className="-mt-5">Sort By</InputLabel>
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
        </div>

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