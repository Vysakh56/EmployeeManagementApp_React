import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeForm.css';

const AddEmployeeForm = ({ onSubmit, existingEmails }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('active');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeData = { userName, email, status };

    // Validation checks
    if (!userName || !email) {
      alert("User Name and Email are required.");
      return;
    }

    if (existingEmails.includes(email)) {
      alert("This email is already in use.");
      return;
    }

    try {
      await onSubmit(employeeData); // Pass data to the parent
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
      <form onSubmit={handleSubmit} className="add-form">
        <h2 className="form-title">Add Employee</h2>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
