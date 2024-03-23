import './App.css'
import AddCourse from './Components/AddCourse'
import AdminDashboard from './Components/AdminDashboard'
import QuizDashboard from './Components/QuizDashboard'
import {Routes, Route} from 'react-router-dom'
import QuizData from './Components/QuizData'
import FileUpload from './Components/FileUpload'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' Component={AdminDashboard}/>
        <Route path='/addCourse' Component={AddCourse}/>
        <Route path='/addQuiz' Component={FileUpload}/>
        <Route path="/courses/:id" Component={QuizDashboard}/>
        <Route path="/courses/:cid/quiz_data/:qid" Component={QuizData}/>
      </Routes>
      
    </>
  )
}

export default App
