import React, { useEffect, useState } from 'react';
import './quizData.css'
import './studentQuizDashboard.css'
import axios from 'axios';
import {useParams } from 'react-router-dom'
import LoadingSkeleton from './LoadingSkeleton';
import QuestionCard from './QuestionCard';
function StudentQuizData() 
{
  const { sid,qid} = useParams();
  const [questions, setQuestions]= useState(null)
  const [quiz, setQuiz]= useState(null)
  const [quizData, setQuizData]= useState(null)
  const [attendedStatus, setAttendedStatus]= useState(null)
  useEffect(()=>{
    
    const fetchQuestions = async () =>{

      try{
          const response = await axios.get(`https://d1y0zdfdne.execute-api.us-east-1.amazonaws.com/prod/student/getQuiz/${sid}/${qid}`,{
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = response.data;
          console.log(data);
          setQuestions(data.questions);
          setQuiz(data.meta);
          setAttendedStatus(data.attended_status);
          setQuizData(data.quiz_data);
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
        <div  >
          <div className='studentquizData'>
          {/* <p>Name: {quiz.name}</p> */}
          <p>Start Time: {quiz.start}</p>
          <p>End Time: {quiz.end}</p>
          <p>Created By : {quiz.createdBy}</p>
          <p>Each Question : {quiz.eachQuestion}</p>
          { attendedStatus ? (<>
            <p>Score: {quizData.marks}   </p> 
            {/*<p> Time Taken: {quizData.time_taken} Min</p>*/}</>):(<></>)
          }
          
          </div>
          { attendedStatus ? 
            (<> 
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
          </>):(<> </>)}
        

          {/* Add additional quiz details as needed */}
          {/* <QuizList quizes={quiz.quizes}/> */}
        
          
          { !attendedStatus ? (<><h2>Questions</h2><QuestionCard questions={questions}/></>): (<></>)}
          
        </div>
        
      ) : (
        <p><LoadingSkeleton/></p>
      )}
    </div>
    </>
  );
};

export default StudentQuizData;
