import React from 'react'
import CourseCard from './CourseCard'
import './courseList.css'
const CourseList = ({ courses }) => {
    return (
      <div className='courseList'>
        {courses.map((course,index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    );
};

export default CourseList