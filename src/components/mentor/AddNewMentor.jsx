import React, { useState } from 'react';

const AddNewMentor = ({ onAddMentor }) => {
  const [mentorName, setMentorName] = useState('');

  const handleMentorNameChange = (event) => {
    setMentorName(event.target.value);
  };

  const handleAddMentor = () => {
    // Send the mentorName to the backend to create a new mentor
    // The onAddMentor function is passed from the parent component and will handle the backend API call
    onAddMentor(mentorName);
    setMentorName(''); // Reset the input field after adding
  };

  return (
    <div>
      <h2 className='display-6 my-3'>Add New Mentor</h2>
      <input type="text" className="form-control mb-3" id="addNewStudent" value={mentorName} onChange={handleMentorNameChange} />
      <button className="btn btn-secondary mb-3" onClick={handleAddMentor}>Add Mentor</button>
      <p><small>Task 1. API to create Mentor</small></p>
    </div>
  );
};

export default AddNewMentor;
