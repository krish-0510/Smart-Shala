import { AzureKeyCredential } from '@azure/core-auth';
import { readFileSync, writeFileSync, existsSync, readFile } from 'fs';
import axios from 'axios';

import createFaceClient from "@azure-rest/ai-vision-face";
import { Student } from '../Models/Student.js';
import { Classroom } from '../Models/Classroom.js';

const endpoint = "https://roigirigh.cognitiveservices.azure.com/";
const apikey = "1rFZEHp7MnAeLZsMxkqms4KG6oyoFQTWDJO2X3jppDYCYKiZireGJQQJ99ALACYeBjFXJ3w3AAAKACOGzxol";
const credential = new AzureKeyCredential(apikey);
const client = createFaceClient(endpoint, credential);
const faceDataFile = './faceData.json';

async function fetchImageFromFirebase(firebaseUrl) {
    const response = await axios.get(firebaseUrl, { responseType: 'arraybuffer' });
    return Buffer.from(response.data); // Convert the downloaded data to a buffer
}

async function detectFaceUsingImageUrl(imagePath) {
    const imageBuffer = await fetchImageFromFirebase(imagePath);
    const response = await client.path('/detect').post({
        contentType: 'application/octet-stream',
        queryParameters: {
            detectionModel: 'detection_03',
            recognitionModel: 'recognition_04',
            returnFaceLandmarks: true,
            returnRecognitionModel: true,
            faceIdTimeToLive: 120,
            returnFaceAttributes: ['headPose', 'mask', 'qualityForRecognition'],
            returnFaceId: false,
        },
        body: imageBuffer,
    });
   

    return response.body;
}
async function detectFaceUsingImageBuffer(imageBuffer) {
  const response = await client.path('/detect').post({
      contentType: 'application/octet-stream',
      queryParameters: {
          detectionModel: 'detection_03',
          recognitionModel: 'recognition_04',
          returnFaceLandmarks: true,
          returnRecognitionModel: true,
          faceIdTimeToLive: 120,
          returnFaceAttributes: ['headPose', 'mask', 'qualityForRecognition'],
          returnFaceId: false,
      },
      body: imageBuffer,
  });
 

  return response.body;
}
function storeFaceData(faceData) {
    let storedData = [];
    if (existsSync(faceDataFile)) {
        storedData = JSON.parse(readFileSync(faceDataFile));
    }
    storedData.push(faceData);
    writeFileSync(faceDataFile, JSON.stringify(storedData, null, 2));
}

async function checkAndAddFace(imagePath) {
    const detectedFaces = await detectFaceUsingImageUrl(imagePath);

    if (detectedFaces.length === 0) {
        console.log('No face detected');
        return;
    }

    console.log(detectedFaces);

    const newFace = detectedFaces[0];
    const newRatios = calculateRatios(newFace.faceLandmarks);

    let storedFaces = [];
    if (existsSync(faceDataFile)) {
        storedFaces = JSON.parse(readFileSync(faceDataFile));
    }

    let faceExists = false;
    for (const storedFace of storedFaces) {
        const storedRatios = calculateRatios(storedFace.faceLandmarks);
        if (compareRatios(newRatios, storedRatios)) {
            faceExists = true;
            break;
        }
    }

    if (faceExists) {

        console.log('Face already exists in the database');
        return "Face already exists in the database";
    } else {
        storeFaceData(newFace);
        console.log('Face added to the database');
        return "Face added to the database";
    }
}
function calculateRatios(faceLandmarks) {
    const ratios = {};

    // Example ratios
    ratios.eyeDistance = calculateDistance(faceLandmarks.pupilLeft, faceLandmarks.pupilRight);
    ratios.noseWidth = calculateDistance(faceLandmarks.noseLeftAlarTop, faceLandmarks.noseRightAlarTop);
    ratios.noseHeight = calculateDistance(faceLandmarks.noseRootLeft, faceLandmarks.noseTip);
    ratios.mouthWidth = calculateDistance(faceLandmarks.mouthLeft, faceLandmarks.mouthRight);

    return ratios;
}

async function recognizeFace(imagePath) {
    const detectedFaces = await detectFaceUsingImageUrl(imagePath);

    if (detectedFaces.length === 0) {
        console.log('No face detected');
        return;
    }

    const newFace = detectedFaces[0];
    const newRatios = calculateRatios(newFace.faceLandmarks);

    let storedFaces = [];
    if (existsSync(faceDataFile)) {
      storedFaces = JSON.parse(readFileSync(faceDataFile));
    }

    let faceRecognized = false;
    for (const storedFace of storedFaces) {
        const storedRatios = calculateRatios(storedFace.faceLandmarks);
        if (compareRatios(newRatios, storedRatios)) {
            faceRecognized = true;
            break;
        }
    }

    if (faceRecognized) {
        console.log('Face recognized');
    } else {
        console.log('Face not recognized');
    }
}
function calculateDistance(point1, point2) {
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
}
function compareRatios(newRatios, storedRatios, threshold = 0.44) {
    let totalDifference = 0;
    let count = 0;

    for (const key in newRatios) {
        if (newRatios.hasOwnProperty(key) && storedRatios.hasOwnProperty(key)) {
            const difference = Math.abs(newRatios[key] - storedRatios[key]) / storedRatios[key];
            totalDifference += difference;
            count++;
        }
    }
   

    const averageDifference = totalDifference / count;
    
    
    return averageDifference < threshold;
}


// Add the image to face here 
async function main() {
  const url = 'https://firebasestorage.googleapis.com/v0/b/videohosting-86bc3.appspot.com/o/Screenshot_20240726_005341_VLC.jpg?alt=media&token=d85daabd-8272-4536-9f50-c7da43f2ed33';
  const res = await checkAndAddFace(url);  
  if(res === "Face added to the database"){
    console.log("Face not in database so not recongnized but added to database for future");
  }

    
}

export const addFaceOfStudent = async(req,res) => {
  try {
    const url = req.body.url;
    const id = req.params.id;
    const student = await Student.findById(id);

    if(student == null) {
      res.status(404).json({message : "Student does not exist"});
      return;
    }
    const detectedFaces = await detectFaceUsingImageUrl(url);  

    if (detectedFaces.length === 0) {
      res.status(404).json({message : 'No face detected'});
      return;
    }
    student.face = detectedFaces[0];
    student.save().then(()=>{
      res.status(200).json({ message: "success" });
    }).catch((err)=>{
        console.log(err);
        res.send("Error Occurred !!!");
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({message : "Error occured"});
  }
  
}

export const recognizeFaceAndMarkPresent = async(req, res) => {
    try {
        const id = req.params.id;
        const classroom = await Classroom.findById(id);
        const image = req.body.image;

        if(!classroom) {
            res.status(404).json({message : "Classroom does not exist"});
            return;
        }

        if(!image) {
            res.status(404).json({message : "Image not found"});
            return;
        }

        const newFace = await detectFaceUsingImageBuffer(image);
        console.log(newFace);
        const newRatios = calculateRatios(newFace.faceLandmarks);
        const students = classroom.students;

        students.map((student) => {
            const storedRatios = calculateRatios(student.face.faceLandmarks);
            console.log(storedRatios);

            if (compareRatios(newRatios, storedRatios)) {
                //mark present
                const index = student.absentDays.indexOf(date);
                if(index > -1) {
                    student.absentDays.splice(index, 1);
                }

                if(!student.presentDays.includes(date)) {
                    student.presentDays.push(date);
                }

                student.save().then(()=>{
                    res.status(200).json({ message: "success" , student});
                }).catch((err)=>{
                    console.log(err);
                    res.status(400).json({message : "Error Occurred !!!"});
                });
            }
        });
        res.status(404).json({message: "Student face not matched"});
    } catch(err) {
        res.status(400).json({message : "Error occured"});
    }
  

}