
import React, { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom'

import './quizDashboard.css'
import LoadingSkeleton from './LoadingSkeleton';
import StudentQuizList from './StudentQuizList';
const StudentQuizDashboard = () => {
  const { sid,cid } = useParams();
  const [course, setCourse] = useState(null);
  const role = localStorage.getItem('role');
  useEffect(() => {
    
    
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`https://d1y0zdfdne.execute-api.us-east-1.amazonaws.com/prod/student/getCourses/${sid}/${cid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course details');
        }
        console.log(response);
        const data = await response.json();
        console.log(data);
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [cid]);

  return (
    <div>
      <h1>Course Details</h1>
      {course ? (
        <div>
          <div className='courseDetails'>
            
            <p>Name: {course.name}</p>
            <p>Course Code: {course.courseCode}</p>
            <p>Credits: {course.credits}</p>
            <p>Total Quizes : {course.total_quizes}</p>
            {!role ? ( <div className='button'>
              <a href={`${cid}/addQuiz`}>Add Quiz</a>
            </div>) : (<></>)
            }
           
          </div>
          {/* Add additional course details as needed */}

          <StudentQuizList quizes={course.quizes}/>
          
        </div>
      ) : (
        <>
        <p><LoadingSkeleton/></p>
        </>
      )}
    </div>
  );
};

export default StudentQuizDashboard;
