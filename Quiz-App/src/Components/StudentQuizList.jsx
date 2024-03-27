import React, { useEffect, useState } from 'react'
import QuizCard from './QuizCard'
import './studentQuizDashboard.css'
const StudentQuizList = ({quizes}) => 
{
  
    return (
      <div className='studentquizlist' >
            <h2>Not Attended</h2>
            
            <div className='quizcards'>
                
                    {quizes
                    .filter(quiz => !quiz.attended_status)
                    .map((quiz) => (
                        <QuizCard key={quiz.PK} quiz={quiz} />
                    ))}
                
            </div>
            <hr/>
            <h2>Attended</h2>
            <div className='quizcards'>
                {quizes
                .filter(quiz => quiz.attended_status)
                .map((quiz) => (
                    <QuizCard key={quiz.PK} quiz={quiz} />
                ))}
            </div>
        
      </div>
    );
};

export default StudentQuizList