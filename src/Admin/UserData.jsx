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
    department: '',
    jobtype: '',
    joinDate: '',
    contractDuration: '',
    internshipDuration: '',
    endDate: '',
    shift: '',
    startTime: '',
    endTime:''
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
        <h1 style={{ color: 'black' }}>Enter Data</h1>
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
          <label htmlFor="jobtype">Job Type:</label>
          <select
            id="jobtype"
            name="jobtype"
            value={Formdata.jobtype}
            onChange={handleChange}
          >
            <option value="">Select Job Type</option>
            <option value="Employee">Employee</option>
            <option value="Intern">Intern</option>
          </select>
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

        {Formdata.jobtype === "Employee" && (
          <>
            <div>
              <label htmlFor="employee-options">Employee Options:</label>
              <select id="employee-options" name="employee-options">
                <option value="">Select Option</option>
                <option value="Permanent">Permanent</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            <div>
              <label htmlFor="joinDate">Join Date:</label>
              <input
                type="date"
                id="joinDate"
                name="joinDate"
                value={Formdata.joinDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="contractDuration">Contract Duration (in Years, if Any):</label>
              <input
                type="number"
                id="contractDuration"
                name="contractDuration"
                value={Formdata.contractDuration}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {Formdata.jobtype === "Intern" && (
          <>
            <div>
              <label htmlFor="intern-options">Intern Options:</label>
              <select id="intern-options" name="intern-options">
                <option value="">Select Option</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
            <div>
              <label htmlFor="joinDate">Join Date:</label>
              <input
                type="date"
                id="joinDate"
                name="joinDate"
                value={Formdata.joinDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="internshipDuration">Internship Duration (in Months):</label>
              <input
                type="number"
                id="internshipDuration"
                name="internshipDuration"
                value={Formdata.internshipDuration}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={Formdata.endDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="shift">Shift:</label>
              <select
                id="shift"
                name="shift"
                value={Formdata.shift}
                onChange={handleChange}
              >
                <option value="">Select Shift</option>
                <option value="morning">Morning - 10:30 To 2:30</option>
                <option value="afternoon">Afternoon - 2:30 To 6:30</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            {Formdata.shift === 'custom' && (
              <>
              <div className="time">
                <label htmlFor="time">Enter StartTime:</label>
                <input
                  type="text"
                  id="startTime"
                  name="startTime"
                  value={Formdata.startTime}
                  onChange={handleChange}
                />
              </div>
              <div className="time1">
                <label htmlFor="time">Enter End Time:</label>
                <input
                  type="text"
                  id="endTime"
                  name="endTime"
                  value={Formdata.endTime}
                  onChange={handleChange}
                />
              </div>
                </>
            )}
          </>
        )}

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Userform;
