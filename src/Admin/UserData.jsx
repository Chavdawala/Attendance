import { useState } from "react";
import Navbar from './Navbar';
import './UserData.css';

const Userform = () => {
  const [Formdata, SetFormdata] = useState({
    firstname: '',
    lastname: '',
    Birthdate: '',
    City: '',
    email: '',
    phone: '',
    department: '' ,
    jobtype:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetFormdata({ ...Formdata, [name]: value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log('userdata:', Formdata);
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handlesubmit}>
        <h1 style={{color:'black'}}>Enter Data</h1>
        <div>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={Formdata.firstname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={Formdata.lastname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Birthdate">Birthdate:</label>
          <input
            type="date"
            id="Birthdate"
            name="Birthdate"
            value={Formdata.Birthdate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="City">City:</label>
          <input
            type="text"
            id="City"
            name="City"
            value={Formdata.City}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={Formdata.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={Formdata.phone}
            onChange={handleChange}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="123-456-7890"
          />
        </div>
        <div>
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            name="department"
            value={Formdata.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Fullstack">Fullstack</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="Social Media">Social Media</option>
            <option value="Public Relation">Public Relation</option>
            <option value="Graphic Designer">Graphic Designer</option>
            <option value="Advertisement">Advertisement</option>
            <option value="Content Writer">Content Writer</option>
          </select>
        </div>
        <div>
          <lable htmlFor='jobtype'>Job Type:
          </lable>
          <select
           id="jobtype"
           name="jobtype"
           value={Formdata.jobtype}
           onChange={handleChange}>
            <option value='Employee'>Employee</option>
            <option value='Intern'>Intern</option>
           </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Userform;
