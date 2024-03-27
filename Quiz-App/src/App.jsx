import './App.css'
import AddCourse from './Components/AddCourse'
import AdminDashboard from './Components/AdminDashboard'
import QuizDashboard from './Components/QuizDashboard'
import {Routes, Route} from 'react-router-dom'
import QuizData from './Components/QuizData'
import FileUpload from './Components/FileUpload'
import StudentData from './Components/StudentData'
import StudentDashboard from './Components/StudentDashboard'
import StudentQuizDashboard from './Components/StudentQuizDashboard'
import StudentQuizData from './Components/StudentQuizData'
import HomePage from './Components/HomePage'

function App() 
{
  return (
    <>
      <Routes>
        {/* Admin Routes */}
        <Route path='/' Component={HomePage}/>
        <Route path='/adminDashboard' Component={AdminDashboard}/>
        <Route path='/addCourse' Component={AddCourse}/>
        <Route path='/courses/:id/addQuiz' Component={FileUpload}/>
        <Route path="/courses/:id" Component={QuizDashboard}/>
        <Route path="/courses/:cid/quiz_data/:qid" Component={QuizData}/>
        <Route path="/courses/:cid/student_data/:qid" Component={StudentData}/>

        {/* User Routes */}
        <Route path="/student/:sid" Component={StudentDashboard}/>
        <Route path="/student/:sid/:cid" Component={StudentQuizDashboard}/>
        <Route path="/student/studentQuiz/:sid/:qid" Component={StudentQuizData}/>
        {/* <Route path="/student/:sid/:cid" Component={StudentDashboard}/> */}


      </Routes>
      
    </>
  )
}

export default App
