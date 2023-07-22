import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const AssignMentorToMultipleStudents = ({ mentors, onAssignMentorToMultiple, studentsWithoutMentor }) => {
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedMentor, setSelectedMentor] = useState('');



    const handleStudentChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedStudents([...selectedStudents, value]);
        } else {
            setSelectedStudents(selectedStudents.filter((studentId) => studentId !== value));
        }
    };

    const handleMentorChange = (event) => {
        setSelectedMentor(event.target.value);
    };

    const handleAssignMentorToMultiple = () => {
        // Send the selectedStudents and selectedMentor to the backend to assign the mentor to the selected students
        // The onAssignMentorToMultiple function is passed from the parent component and will handle the backend API call
        onAssignMentorToMultiple(selectedStudents, selectedMentor);


    };

    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <h2 className='display-6'>Assign Mentor to Multiple Students (without Mentor)</h2>
            <div className="text-left">
                {studentsWithoutMentor.length
                    ? studentsWithoutMentor.map((student) => (
                        <div key={student._id} className='text-start'>
                            <input type="checkbox" value={student._id} onChange={handleStudentChange} />
                            <label className='ms-2'>{student.name}</label>
                        </div>
                    ))
                    : <p><strong>No Students without Mentor</strong></p>
                }
            </div>

            {/* Select Mentor */}
            <div className="mb-2 w-50">
                <Form.Select aria-label="Select Student" value={selectedMentor} onChange={handleMentorChange} >
                    {/* <option disabled selected value>Select Mentor</option> */}
                    <option value=""> -- select an option -- </option>

                    {
                        mentors && mentors.map((mentor) => (
                            <option key={mentor._id} value={mentor._id}>
                                {mentor.name}
                            </option>
                        ))
                    }
                </Form.Select>
            </div>




            <button
                className='btn btn-secondary mb-3'
                onClick={handleAssignMentorToMultiple}
                disabled={!selectedStudents.length || !selectedMentor}
            >
                Assign Mentor to Selected Students
            </button>
            <p><small>Task 3. Assign One or Multiple Students (without Mentor) to Mentor</small></p>
        </div>
    );
};

export default AssignMentorToMultipleStudents;
