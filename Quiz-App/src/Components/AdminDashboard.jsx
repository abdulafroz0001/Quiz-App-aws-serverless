import React, { useState,useEffect } from 'react';
import CourseList from './CourseList';
import LoadingSkeleton from './LoadingSkeleton';


const AdminDashboard = () => 
{
  const [courses, setCourses] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://d1y0zdfdne.execute-api.us-east-1.amazonaws.com/prod/getCourse/all',{
          method: 'GET', // Specify the GET method explicitly
        });
        if (!response.ok) 
        {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data);
        // for(let i =0;i<data.length;i++)
        // {
        //   console.log(data[i]);
        // }
        setCourses(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    
      <div className='button'>
            <a href='/addCourse'>Add Course</a>
        </div>
    
      <div>
        <h1>Course List</h1>
        {courses ? (
          <CourseList courses={courses}/>

        ) :(
          <p><LoadingSkeleton/></p>
        )}
        {/* <button onClick={addCourse}>Add Course</button> */}
      </div>
    </>
  );
};

export default AdminDashboard;
