import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Index from './components/Index';
import Department from './components/Department';
import Fullstack from './components/Fullstack';
import Dataana from './components/Dataana';
import Hr from './components/Hr';
import Logout from './components/Logout';
import Employee from './components/Employee';
import Profile from './components/Profile'; // Corrected import
import Admin from './Admin/Admin';
import UserData from './Admin/UserData';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/index" element={<Index />} />
        <Route path="/department" element={<Department />} />
        <Route path="/fullstack" element={<Fullstack />} />
        <Route path="/dataana" element={<Dataana />} />
        <Route path="/hr" element={<Hr />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/userdata" element={<UserData />} />
        
      </Routes>
    </Router>
  );
};

export default App;
