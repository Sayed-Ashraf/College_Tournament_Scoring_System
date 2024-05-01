import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Login from './Pages/Auth/Login/Login'
import Register from './Pages/Auth/Register/Register'
import Dashboard from './Pages/Admin/Dashboard'
import Hero from './Pages/Hero/Hero'
import Events from './Pages/Events/Events'
import CreateEvent from './Pages/Events/CreateEvent' 
import EventDetails from './Pages/Events/EventDetails'
import EventResults from './Pages/Events/EventResults'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/register' Component={Register}/>
        <Route path='/login' Component={Login}/>
        <Route path='/home' Component={Hero}/>
        <Route path='/events' Component={Events}/>
        <Route path='/events/:id' Component={EventDetails}/>
        <Route path='/events/:id/results' Component={EventResults}/>
        <Route path='/dashboard' Component={Dashboard}/>
        <Route path='/dashboard/addEvent' Component={CreateEvent}/>
      </Routes>

    </>
  )
}

export default App