import React from 'react';
// import './Index.css';
import Navbar from './Navbar';
// import DisplayRecord from './DisplayRecord';
import DisplayData from './DisplayData';
import Footer from './Footer';
import Mission from './Mission';
import Card from './Card';
import ShowAttendance from './ShowAttendance';


function Index() {
  return (
    <>
    <Navbar />
    <div>
    <DisplayData/>
    <ShowAttendance/>
    <Card/>
    <Mission/>
    <Footer/>
    </div>
    </>
  );
}

export default Index;
