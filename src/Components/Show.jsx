import React from 'react'
import Navbar from './Navbar'
import ShowAttendance from './ShowAttendance'
import DisplayRecord from "../Components/DisplayRecord"; 


function Show() {
  return (
   <>
   <Navbar/>
   <ShowAttendance/>
   <DisplayRecord/>
   
   </>
  )
}

export default Show