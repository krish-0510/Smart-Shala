import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect} from "react";
import { getDownloadURL } from "firebase/storage";
import { getStorage, ref, listAll } from "firebase/storage";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TeacherLeftSideNavBar from "../Components/TeacherLeftSideNavBar";

const storage = getStorage();

const HwSubmission = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { hId} = useParams();
  const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

  useEffect(() => {
    async function fetchHomeworks() {
      const listRef = ref(storage, `/homeworks/${hId}`);

      // Find all the prefixes and items.
      listAll(listRef)
        .then((res) => {
          res.items.forEach(async(itemRef) => {
            // All the items under listRef.
            const fileRef = ref(storage, itemRef._location.path);

            try {
              const url = await getDownloadURL(fileRef);
              const sId = itemRef._location.path.split("/")[2];
              const res = await axios.get(`http://localhost:3000/student/${sId}`);
              setStudents(...students, [{student : res.data.student, url : url}]);
            } catch (error) {
              console.error("Error fetching file:", error);
            }
          });
        }).catch((error) => {
          console.log(error);
        });
        setLoading(false);
    }

    fetchHomeworks();
  },[]);

  if(loading) {
    return <div className="text-center mt-8"> Loding ...</div>
  }

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        <div className="min-h-screen pl-80 bg-gray-100 ">
          <h1 className="text-2xl font-bold text-center m-8">Student List</h1>

          <div className="space-y-4">
            {students.map((curr) => (
              <div
                key={curr.student._id}
                className="flex items-center justify-between p-4 bg-white rounded shadow-md"
              >
                <div>
                  <p className="text-lg font-medium">{curr.student.name}</p>
                  <p className="text-gray-600">email: {curr.student.email}</p>
                </div>
                <Button variant="contained" color="primary" type="submit" onClick={() => window.location.href = curr.url}>
                  View Homework
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HwSubmission;
