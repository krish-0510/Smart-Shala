<<<<<<< HEAD
// import { readFileSync } from 'fs';
// import createClient from '@azure-rest/ai-vision-image-analysis';
// import { AzureKeyCredential } from '@azure/core-auth';
// import { Homeworkanaylsisfunction } from '../ChatbotFunction.js';
// import fs from 'fs';
// import {PdfToImg} from 'pdftoimg-js';
// import axios from 'axios';



// const endpoint = 'https://iewhf.cognitiveservices.azure.com/';
// const key = '9pT0BpZXU9rXpB76N646tn1rE51pq3E2Rk9QqwWA7vLhcQLfubZ2JQQJ99ALACYeBjFXJ3w3AAAFACOGxPMj';
// const credential = new AzureKeyCredential(key);

// const client = createClient.default(endpoint, credential);


// const feature = [
  
//   'Read',
  
// ];




// async function getcontentfromonepage(page,i){
//   const result = await client.path('/imageanalysis:analyze').post({
//     body: page,
//     queryParameters: {
//       features: feature,
//       'smartCrops-aspect-ratios': [0.9, 1.33]
//     },
//     contentType: 'application/octet-stream'
//   });

//   const iaResult = result.body;

 
 
//   if (iaResult.readResult) {
//     const readResult = iaResult.readResult;
//     let fullText = '';
//     readResult.blocks.forEach(block => {
//         block.lines.forEach(line => {
//             fullText += line.text + ' ';
//         });
//     });

//     const res = await Homeworkanaylsisfunction(fullText.trim());
//     return res;
//   }
// }

// const analyzeImageFromFile = async(req,res)=> {

//   const {url} = req.body;
  
//   const response = await axios.get(url, {
//     responseType: 'arraybuffer'
//   });
//   const pdf = Buffer.from(response.data, 'binary');




//   const allPages = await PdfToImg(pdf, {
//     scale: 1.5, // accept only number
//     returnType: "buffer", // accept "base64" and "buffer"
//     imgType: "jpg", // accept "png" and "jpg"
//     pages: "all",
//   });
//   const fullcontent = [];
//   for (let i = 0; i < allPages.length; i++) {
//     const page = allPages[i];
//     const content = await getcontentfromonepage(page, i);
//     fullcontent.push(content);
//   };

//   console.log(fullcontent);
//   return res.status(200).json({message:"success", answer:fullcontent});
// }

// export default analyzeImageFromFile;




=======
import { readFileSync } from 'fs';
import createClient from '@azure-rest/ai-vision-image-analysis';
import { AzureKeyCredential } from '@azure/core-auth';
import { spellingAnaylsisfunction, grammerAnaylsisfunction, correctnessAnaylsisfunction } from '../ChatbotFunction.js';
import fs from 'fs';
import {PdfToImg} from 'pdftoimg-js';
import axios from 'axios';



const endpoint = 'https://iewhf.cognitiveservices.azure.com/';
const key = '9pT0BpZXU9rXpB76N646tn1rE51pq3E2Rk9QqwWA7vLhcQLfubZ2JQQJ99ALACYeBjFXJ3w3AAAFACOGxPMj';
const credential = new AzureKeyCredential(key);

const client = createClient.default(endpoint, credential);


const feature = [
  
  'Read',
  
];




async function getcontentfromonepage(page,i){
  const result = await client.path('/imageanalysis:analyze').post({
    body: page,
    queryParameters: {
      features: feature,
      'smartCrops-aspect-ratios': [0.9, 1.33]
    },
    contentType: 'application/octet-stream'
  });

  const iaResult = result.body;

 
 
  if (iaResult.readResult) {
    const readResult = iaResult.readResult;
    let fullText = '';
    readResult.blocks.forEach(block => {
        block.lines.forEach(line => {
            fullText += line.text + ' ';
        });
    });

    const res = {
      "grammer" : await grammerAnaylsisfunction(fullText.trim()),
      "spelling" : await spellingAnaylsisfunction(fullText.trim()),
      "correct" : await correctnessAnaylsisfunction(fullText.trim())
    }
    return res;
  }
}

const analyzeImageFromFile = async(req,res)=> {

  const {url} = req.body;
  
  const response = await axios.get(url, {
    responseType: 'arraybuffer'
  });
  const pdf = Buffer.from(response.data, 'binary');




  const allPages = await PdfToImg(pdf, {
    scale: 1.5, // accept only number
    returnType: "buffer", // accept "base64" and "buffer"
    imgType: "jpg", // accept "png" and "jpg"
    pages: "all",
  });
  const fullcontent = [];
  for (let i = 0; i < allPages.length; i++) {
    const page = allPages[i];
    const content = await getcontentfromonepage(page, i);
    fullcontent.push(content);
  };

  console.log(fullcontent);
  return res.status(200).json({message:"success", answer:fullcontent});
}

export default analyzeImageFromFile;




>>>>>>> 40608f5c71c8fd857f6e062fd65bd20684d61de9
