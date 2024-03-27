import React, { useEffect, useState } from 'react';
import './quizData.css'
import axios from 'axios';
import {useParams } from 'react-router-dom'
import LoadingSkeleton from './LoadingSkeleton';
import QuestionCard from './QuestionCard';
function QuizData() 
{
  const { sid,qid} = useParams();
  const [questions, setQuestions]= useState(null)
  const [quiz, setQuiz]= useState(null)

  useEffect(()=>{
    
    const fetchQuestions = async () =>{

      try{
          const response = await axios.get(`https://d1y0zdfdne.execute-api.us-east-1.amazonaws.com/prod/getQuiz/${qid}`,{
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          console.log(response)
          setQuestions(response.data.questions)
          setQuiz(response.data.meta)
      }
      catch(err){
        console.log(err)
      }
    }
    fetchQuestions();
  },[])

  return (
    <>
    <div>
      <h1>Quiz Details</h1>
      {questions ? (
        <div >
          {/* <p>Name: {quiz.name}</p> */}
          <p>Start Time: {quiz.start}</p>
          <p>End Time: {quiz.end}</p>
          <p>Created By : {quiz.createdBy}</p>
          <p>Each Question : {quiz.eachQuestion}</p>
          {/* Add additional quiz details as needed */}
          {/* <QuizList quizes={quiz.quizes}/> */}
          <h2>Questions</h2>
          <div className='quizData'>  
            {questions.map((question, index) => (
              
              <div key={index} className='card'>
                  <p>{question.question_text}</p>
                  {question.options.map((option, index) => (
                      <p key={index}>{option}</p>
                  ))}
                  <div className='button'>Answer : {question.answer}</div>
              </div>
              
            ))}
          </div>
          
          <QuestionCard questions={questions}/>
        </div>
        
      ) : (
        <p><LoadingSkeleton/></p>
      )}
    </div>
    </>
  );
};

export default QuizData;
