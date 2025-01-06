import React from 'react'
import {Link } from 'react-router-dom';
import './Navbar.css';
import Department from './Department';

function Navbar() {
   
  return (
    <div className='navbar'>
        <ul>
            <li>
                <Link to="/">Login Page</Link>
            </li>
            <li>
                <Link to="/department">Department</Link>
            </li>
            <li>
                <Link to="/employee">Employee</Link>
            </li>
        </ul>
        
    </div>
  )
}

export default Navbar