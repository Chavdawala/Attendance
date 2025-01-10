import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <>
    <div className='navbar'>
        <ul>
            <li>
                <Link to="/">Login Page</Link>
            </li>
            <li>
                <Link to="/admin">User</Link>
            </li>
        </ul>
        
    </div>
    </>
  )
}

export default Navbar