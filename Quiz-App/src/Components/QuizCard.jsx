import React from 'react';
import './quizCard.css'
import { useParams } from 'react-router-dom';

function QuizCard({quiz}) {
  
  const role= localStorage.getItem('role');
  const { sid, cid } =useParams(null);
  if( (sid !== undefined) && sid.includes("student_"))
    localStorage.setItem('role',null);
  return (
    <>
      {/* {console.log(quiz)} */}
        <div key={quiz.PK} className="card">
        <h3>{quiz.data.name}</h3>
        <p>start time: {quiz.data.start}</p>
        <p>end time: {quiz.data.end}</p>
        <p>each Question: {quiz.data.eachQuestion}</p>
        {quiz.attended_status ? (
          // <p className='score'>Score: {quiz.quiz_data.marks}   |  Time Taken: {quiz.quiz_data.time_taken} Min</p> 
          <p className='score'>Score: {quiz.quiz_data.marks} </p>
        ):(<></>)}

        {!role ? (<div className='button'>
            <a href={`${window.location.pathname}/quiz_data/${quiz.PK}`}>View quiz</a>
        </div>):(<div className='button'>
            <a href={`/student/studentQuiz/${sid}/${quiz.PK}`}>View quiz</a>
        </div>)}
        
        {!role ? (
              <div className='button'>
                <a href={`student/${sid}/${quiz.PK}`}>Student Data</a>
              </div>
        ): (
          <></>
        )}
        
        </div>
    </>
  );
};
export default QuizCard;
