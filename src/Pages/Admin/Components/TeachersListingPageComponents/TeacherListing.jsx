import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';

const TeacherListingrow = ({id}) => {
    const [teacher,setTeacher] = useState("");

    useEffect(()=>{
        async function getteachers(){
            const res = await axios.get("http://localhost:3000/getteacher/"+id);
            console.log(res.data.teacher);
            setTeacher(res.data.teacher);
        }
        getteachers();
    },[]);


  return (
    <>

    
      <tr

className="hover:bg-gray-200 transition duration-150"
>

<td className="py-2 px-4">{teacher.name}</td>
<td className="py-2 px-4">{teacher.email}</td>
<td className="py-2 px-4">{teacher.contact}</td>

</tr>
    </>
  )
}

export default TeacherListingrow;