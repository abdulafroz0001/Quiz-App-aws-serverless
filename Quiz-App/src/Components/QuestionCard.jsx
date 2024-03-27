import React, { useState } from 'react';
import { Button } from '@mui/material'; // Import Button component from @mui/material
import './questionCard.css'; // Import the CSS file for QuestionCard styles
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuestionCard = ({ questions }) => {

  const { sid, qid} = useParams();

  const [responses, setResponses] = useState(Array(questions.length).fill('')); // Initialize responses array with empty strings

  const handleResponseChange = (index, value) => {
    setResponses(prevResponses => {
      const newResponses = [...prevResponses];
      newResponses[index] = value;
      return newResponses;
    });
  };

  const handleSubmit = async () => {
    const apiresponse  = await axios.post(`https://d1y0zdfdne.execute-api.us-east-1.amazonaws.com/prod/student/submitQuiz/${sid}/${qid}`, responses, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(apiresponse.data);
  };

  return (
    <div className="question-card-container">
      {questions.map((question, index) => (
        <div key={index} className="question-container">
          <h3 className="question-text">{` ${question.question_text}`}</h3>
          <div className="options-container">
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="option">
                <input
                  type="radio"
                  id={`question${index + 1}-${optionIndex}`}
                  name={`question${index + 1}`}
                  value={option.charAt(0)} // Set option number as value
                  checked={responses[index] === option.charAt(0)} // Check if option is selected
                  onChange={(e) => handleResponseChange(index, e.target.value)}
                />
                <label htmlFor={`question${index + 1}-${optionIndex}`}>{option}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <Button
        variant="contained"
        color="primary"
        className="submit-button"
        onClick={handleSubmit}
      >
        Finish
      </Button>
    </div>
  );
};

export default QuestionCard;
