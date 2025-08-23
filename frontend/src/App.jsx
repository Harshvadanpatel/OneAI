
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'

// const App = () =>{

//   const {getToken} = useAuth()
//   useEffect(() => {
//     getToken().then((token)=>console.log(token));
  
    
//   }, [])
  

  return(
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/ai' element={<Dashboard/>}  />

      
      </Routes>
    </div>
  )
}

export default App
