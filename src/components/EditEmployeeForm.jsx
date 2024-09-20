import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EmployeeForm.css';

const EditEmployeeForm = ({ onSubmit, existingEmails, existingUsernames = [] }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('active');
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentUserName, setCurrentUserName] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      if (id) {
        try {
          const response = await axios.get(`https://employeemanagement-server-react.onrender.com/employees/${id}`);
          const employee = response.data;
          setUserName(employee.userName);
          setEmail(employee.email);
          setStatus(employee.status);
          setCurrentEmail(employee.email); // Store the current email
          setCurrentUserName(employee.userName); // Store the current username
        } catch (error) {
          console.error("Error fetching employee:", error);
        }
      }
    };
    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeData = { userName, email, status };

    // Validation checks
    if (!userName || !email) {
      alert("User Name and Email are required.");
      return;
    }

    // Allow the current email to pass validation
    if (existingEmails.includes(email) && email !== currentEmail) {
      alert("This email is already in use.");
      return;
    }

    // Allow the current username to pass validation
    if (existingUsernames.includes(userName) && userName !== currentUserName) {
      alert("This username is already in use.");
      return;
    }

    try {
      await onSubmit(employeeData, id); // Pass data and ID to the parent
      navigate('/'); // Redirect on success
    } catch (error) {
      console.error("Error submitting employee data:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <button className="back-button" onClick={() => navigate('/')}>
        &#8592; Back
      </button>
      <form onSubmit={handleSubmit} className="edit-form">
        <h2 className="form-title">Edit Employee</h2>
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditEmployeeForm;
