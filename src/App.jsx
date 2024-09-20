import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import './App.css';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [existingEmails, setExistingEmails] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://employeemanagement-server-react.onrender.com/employees');
      setEmployees(response.data);
      setExistingEmails(response.data.map(employee => employee.email));
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddOrEditEmployee = async (employee, id = null) => {
    try {
      if (id) {
        await axios.put(`https://employeemanagement-server-react.onrender.com/employees/${id}`, employee);
      } else {
        await axios.post('https://employeemanagement-server-react.onrender.com/employees', {
          ...employee,
          id: Date.now().toString(),
        });
      }
      fetchEmployees();
    } catch (error) {
      console.error("Error adding or editing employee:", error);
      alert("Failed to save employee. Please try again.");
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`https://employeemanagement-server-react.onrender.com/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee. Please try again.");
    }
  };

  return (
    <Router>
      <div className="container">
        <h1>Employee Management</h1>
        <Routes>
          <Route path="/" element={
            <>
              <Link to="/add">
                <button>Add Employee</button>
              </Link>
              <EmployeeTable employees={employees} onDelete={handleDeleteEmployee} />
            </>
          } />
          <Route path="/add" element={<EmployeeForm onSubmit={handleAddOrEditEmployee} existingEmails={existingEmails} mode="add" />} />
          <Route path="/edit/:id" element={<EmployeeForm onSubmit={handleAddOrEditEmployee} existingEmails={existingEmails} mode="edit" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
