
import React, { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom'
import QuizList from './QuizList';
import './quizDashboard.css'
import LoadingSkeleton from './LoadingSkeleton';
const QuizDashboard = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`https://d1y0zdfdne.execute-api.us-east-1.amazonaws.com/prod/getCourse/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course details');
        }
        const data = await response.json();
        console.log(data)
        setCourse(data.body);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [id]);

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
            <div className='button'>
              <a href='/addQuiz'>Add Quiz</a>
            </div>
          </div>
          {/* Add additional course details as needed */}
          
          <QuizList quizes={course.quizes}/>
        
          
          
        </div>
      ) : (
        <>
        <p><LoadingSkeleton/></p>
        </>
      )}
    </div>
  );
};

export default QuizDashboard;
