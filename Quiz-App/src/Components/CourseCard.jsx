import React from 'react';
import './courseCard.css'
import { useParams } from 'react-router-dom';

function CourseCard({course}) 
{
  const role = localStorage.getItem('role');
  const {sid} = useParams();
  return (
    <>
      {/* {console.log(course)} */}
        <div key={course.PK} className="card">
        <h3>{course.name}</h3>
        <p>Course Code: {course.courseCode}</p>
        <p>Credits: {course.credits}</p>
        <p>Total Quizes: {course.total_quizes} </p>
        {
            role ? (
            <div className='button'>
              <a href={`/student/${sid}/${course.PK}`}>View Course</a>
            </div>
          ):(
            <div className='button'>
              <a href={`/courses/${course.PK}`}>View Course</a>
            </div>
          )
          }
        </div>
    </>
  );
};

export default CourseCard;
