import React, { useState } from 'react';

const AddNewStudent = ({ onAddStudent }) => {
  const [studentName, setStudentName] = useState('');

  const handleStudentNameChange = (event) => {
    setStudentName(event.target.value);
  };

  const handleAddStudent = () => {
    // Send the studentName to the backend to create a new student
    // The onAddStudent function is passed from the parent component and will handle the backend API call
    onAddStudent(studentName);
    setStudentName(''); // Reset the input field after adding
  };

  return (
    <div>
      <h2 className='display-6 my-3'>Add New Student</h2>
      <input type="text" className="form-control mb-3" id="addNewStudent" value={studentName} onChange={handleStudentNameChange} />
      <button className="btn btn-secondary mb-3" onClick={handleAddStudent}>Add Student</button>
      <p><small>Task 2. API to create Student</small></p>
    </div>
  );
};

export default AddNewStudent;
