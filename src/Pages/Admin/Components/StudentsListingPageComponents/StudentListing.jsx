import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';

const StudentListingrow = ({id}) => {
    const [student,setStudent] = useState("");

    useEffect(()=>{
        async function getstudents(){
            const res = await axios.get("http://localhost:3000/getstudent/"+id);
            console.log(res.data.student);
            setStudent(res.data.student);
        }
        getstudents();
    },[]);


  return (
    <>

    
      <tr

className="hover:bg-gray-200 transition duration-150"
>

<td className="py-2 px-4">{student.name}</td>
<td className="py-2 px-4">{student.rollno}</td>
<td className="py-2 px-4">{student.contact}</td>

</tr>
    </>
  )
}

export default StudentListingrow;