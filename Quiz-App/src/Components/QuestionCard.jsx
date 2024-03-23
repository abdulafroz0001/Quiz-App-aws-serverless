import React from 'react';
import './questionCard.css'

function QuestionCard({key,question}) {

  return (
    <>
      {/* {console.log(question)} */}
        <div key={key} className="card">
        <h3>{question.answer}</h3>
        {/* <p>start time: {question.data.start}</p>
        <p>end time: {question.data.end}</p>
        <p>each Question: {question.data.eachQuestion}</p>
        <div className='button'>
            <a href={`${window.location.pathname}/question_data/${question.PK}`}>View question</a>
        </div> */}
        {/* <div className='button'>
            <a href={`${window.location.pathname}/student_data/${question.PK}`}>Student Data</a>
        </div> */}
        </div>
    </>
  );
};

export default QuestionCard;
