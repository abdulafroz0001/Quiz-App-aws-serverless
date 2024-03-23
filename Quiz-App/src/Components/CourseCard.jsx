import React from 'react';
import './courseCard.css'

function CourseCard({course}) {

  return (
    <>
      {/* {console.log(course)} */}
        <div key={course.PK} className="card">
        <h3>{course.data.name}</h3>
        <p>Course Code: {course.data.courseCode}</p>
        <p>Credits: {course.data.credits}</p>
        <p>Total Quizes: {course.total_quizes} </p>
        <div className='button'>
            <a href={`/courses/${course.PK}`}>View Course</a>
        </div>
        </div>
    </>
  );
};

export default CourseCard;
