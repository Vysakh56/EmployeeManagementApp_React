import React from 'react';
import AddEmployeeForm from './AddEmployeeForm';
import EditEmployeeForm from './EditEmployeeForm';

const EmployeeForm = ({ onSubmit, existingEmails, mode }) => {
  return mode === 'edit' ? (
    <EditEmployeeForm onSubmit={onSubmit} existingEmails={existingEmails} />
  ) : (
    <AddEmployeeForm onSubmit={onSubmit} existingEmails={existingEmails} />
  );
};

export default EmployeeForm;
