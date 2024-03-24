import AWS from "aws-sdk";
import { useState } from "react";
import { useParams } from "react-router-dom";
import './fileUpload.css'; 

function FileUpload() {
  const { id } = useParams();
  // Create state to store file and form data
  const [file, setFile] = useState(null);
  const [quizDetails, setQuizDetails] = useState({
    quizName: "",
    startTime: "",
    endTime: "",
    marksPerQuestion: ""
  });

  // Function to handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizDetails({
      ...quizDetails,
      [name]: value
    });
  };

  // Function to upload file to s3 along with form data
  const uploadFile = async () => {
    if (!file || !quizDetails.quizName || !quizDetails.startTime || !quizDetails.endTime || !quizDetails.marksPerQuestion) {
      alert("Please fill all the fields.");
      return;
    }

    // Validate file type
    if (!file.type.startsWith('text')) {
      alert("Please select a text file.");
      return;
    }

    // Validate start time and end time
    const startDateTime = new Date(quizDetails.startTime);
    const endDateTime = new Date(quizDetails.endTime);
    const currentTime = new Date();

    if (startDateTime < currentTime || endDateTime < currentTime) {
      alert("Start time and end time should be set to future dates.");
      return;
    }

    if (endDateTime <= startDateTime) {
      alert("End time should be after the start time.");
      return;
    }

    // Your S3 configurations
    const S3_BUCKET = "project-quiz";
    const REGION = "us-east-1";
    AWS.config.update({
      accessKeyId: "AKIAWMV32EQ6JIEYPTPV",
      secretAccessKey: "gw3sO4xy32KrTVgyUC29hxfqHBba1xXTD4gNfNTH",
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: id + "---" + quizDetails.quizName +"---"+ quizDetails.startTime+"---"+quizDetails.endTime+"---"+quizDetails.marksPerQuestion+".txt",
      Body: file,
    };
    console.log(params.Key);

    // Uploading file to S3
    try {
      await s3.putObject(params).promise();
      alert("File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file: ", error);
      alert("Failed to upload file.");
    }
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <div className="file-upload-container">
      <h2>Upload Quiz File</h2>
      <div className="form-container">
        <input type="text" name="quizName" placeholder="Quiz Name" onChange={handleInputChange} />
        <input type="datetime-local" name="startTime" placeholder="Start Time" onChange={handleInputChange} />
        <input type="datetime-local" name="endTime" placeholder="End Time" onChange={handleInputChange} />
        <input type="number" name="marksPerQuestion" placeholder="Marks Per Question" onChange={handleInputChange} />
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload</button>
      </div>
      <a href="https://project-quiz.s3.amazonaws.com/quiz-format.txt" style={{'textDecoration': 'none', 'color' : 'black'}}> Download Quiz File Format</a>
    </div>
  );
}

export default FileUpload;
