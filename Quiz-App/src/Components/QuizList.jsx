import React, { useEffect, useState } from 'react'
import QuizCard from './QuizCard'
import './quizDashboard.css'
const QuizList = ({quizes}) => 
{
  
    return (
      <>
      <div className='quizList'>
        {quizes.map((quiz) => (
          <QuizCard key={quiz.PK} quiz={quiz} />
        ))}
      </div>
      </>
    );
};

export default QuizList