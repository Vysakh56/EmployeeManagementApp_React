import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeTable = ({ employees, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.userName}</td>
            <td>{employee.email}</td>
            <td>{employee.status}</td>
            <td className="actions">
              <Link to={`/edit/${employee.id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => onDelete(employee.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
