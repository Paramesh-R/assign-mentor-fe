import axios from 'axios';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const StudentDetails = ({ students }) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [currentMentor, setCurrentMentor] = useState(null);
  const [previousMentor, setPreviousMentor] = useState(null);

  const handleStudentChange = (event) => {
    const selectedStudentId = event.target.value;
    setSelectedStudent(selectedStudentId);
    console.log(selectedStudentId)

    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/students/${selectedStudentId}`)
      .then((response) => {
        console.log(response.data)
        const students = response.data

        // Update the current and previous mentor details
        setCurrentMentor(students.mentor);
        setPreviousMentor(students.previousMentor);
      })


  };

  return (
    <div>
      <h2 className='display-6 my-3'>Student Details</h2>

      {/* Select Student */}
      <div className="mb-2">
        <Form.Select aria-label="Select Student" value={selectedStudent} onChange={handleStudentChange} >
          <option value="">Select Student</option>
          {
            students && students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))
          }
        </Form.Select>
      </div>


      {/* RESULT - Current Mentor and Previous Mentor */}
      <div className="d-flex ">

        {currentMentor
          ? (
            <div className='m-3'>
              <h3>Current Mentor</h3>
              <p>Mentor Name: {currentMentor.name}</p>
              {/* Add other mentor details here */}
            </div>
          )
          : (
            <div className='m-3'>
              <h3>Current Mentor</h3>
              <p>NA</p>
            </div>
          )
        }

        {previousMentor
          ? (
            <div className='m-3'>
              <h3>Previous Mentor</h3>
              <p>Mentor Name: {previousMentor.name}</p>
              {/* Add other mentor details here */}
            </div>
          )
          : (
            <div className='m-3'>
              <h3>Previous Mentor</h3>
              <p>NA</p>
            </div>
          )
        }
      </div>

      <hr />
      {/* Task Details */}
      <p>
        <small>
          Task 6. API to show the previously assigned mentor for a particular student.
        </small>
      </p>
    </div>
  );
};

export default StudentDetails;
