import React, { useEffect, useState } from "react";
import { Button, Typography, Box, Card, CardMedia } from "@mui/material";
import { useParams } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";

const FilePreview = () => {

  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const {id} = useParams();

  const [fileUrl, setFileUrl] = useState("");

  async function fetchFile () {
    console.log(id);
    const fileRef = ref(storage, `/homeworks/${id}/${savedAuth.id}`);
    try {
      const url = await getDownloadURL(fileRef);
      setFileUrl(url);
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  useEffect(() => {
    fetchFile();
  },[]);

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        textAlign: "center",
        padding: 3,
        border: "1px solid #ddd",
        borderRadius: 4,
        boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
      }}
    >

      <Box sx={{ marginTop: 3 }}>
        <Card
          sx={{
            marginTop: 2,
            padding: 2,
            boxShadow: "0px 1px 6px rgba(0,0,0,0.2)",
          }}
        >
        <iframe
        src={fileUrl}
        title="PDF Preview"
        style={{ width: "100%", height: "500px", border: "none" }}
        />
        </Card>
      </Box>
    </Box>
  );
}

export default FilePreview;
