import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

const AssignMentorToStudent = ({ students, mentors, onAssignMentor }) => {
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedMentor, setSelectedMentor] = useState('');

    const handleStudentChange = (event) => {
        setSelectedStudent(event.target.value);
    };

    const handleMentorChange = (event) => {
        setSelectedMentor(event.target.value);
    };

    const handleAssignMentor = () => {
        // Send the selectedStudent and selectedMentor to the backend to assign the mentor to the student
        // The onAssignMentor function is passed from the parent component and will handle the backend API call
        onAssignMentor(selectedStudent, selectedMentor);
        setSelectedStudent("");
        setSelectedMentor("");
    };



    return (
        <div>
            <h2 className='display-6 my-3'>Assign Mentor</h2>

            <div className="mb-2">                {/* Select Student */}
                <Form.Select aria-label="Select Student" value={selectedStudent} onChange={handleStudentChange} >
                    <option>Select Student</option>
                    {
                        students && students.map((student) => (
                            <option key={student._id} value={student._id}>
                                {student.name}
                            </option>
                        ))
                    }
                </Form.Select>
            </div>

            <div className="mb-2">                {/* Select Mentor */}
                <Form.Select aria-label="Select Mentor" value={selectedMentor} onChange={handleMentorChange} >
                    <option>Select Mentor</option>
                    {
                        mentors && mentors.map((mentor) => (
                            <option key={mentor._id} value={mentor._id}>
                                {mentor.name}
                            </option>
                        ))
                    }
                </Form.Select>
            </div>

            {/* Button Assign Mentor */}
            <button
                className="btn btn-secondary mb-2"
                onClick={handleAssignMentor}
                disabled={selectedMentor === "" || selectedStudent === ""}
            >
                Assign Mentor
            </button>
            <p><small>Task 4. Assign or Change Mentor for Particular Student</small></p>
        </div >
    );
};

export default AssignMentorToStudent;
