import React from 'react';
import './quizCard.css'

function QuizCard({quiz}) {

  return (
    <>
      {/* {console.log(quiz)} */}
        <div key={quiz.PK} className="card">
        <h3>{quiz.data.name}</h3>
        <p>start time: {quiz.data.start}</p>
        <p>end time: {quiz.data.end}</p>
        <p>each Question: {quiz.data.eachQuestion}</p>
        <div className='button'>
            <a href={`${window.location.pathname}/quiz_data/${quiz.PK}`}>View quiz</a>
        </div>
        <div className='button'>
            <a href={`${window.location.pathname}/student_data/${quiz.PK}`}>Student Data</a>
        </div>
        </div>
    </>
  );
};

export default QuizCard;
