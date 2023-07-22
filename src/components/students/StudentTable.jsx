import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Table } from 'react-bootstrap';

const StudentTable = ({ students, mentors }) => {
    const [selectedMentor, setSelectedMentor] = useState("");
    const [studentTableData, setStudentTableData] = useState([...students]);

    const handleMentorChange = (event) => {
        setSelectedMentor(event.target.value);
        console.log(event.target.value);



    };

    useEffect(() => {
        if (selectedMentor === "") {
            setStudentTableData([...students])
        } else {
            axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mentors/assigned-students-mentor/${selectedMentor}`)
                .then(response => {
                    console.log(response.data)
                    setStudentTableData(response.data)
                })
        }


    }, [students, selectedMentor])





    return (
        <>
            <div className="mb-2 w-25">                {/* Select Mentor */}
                <Form.Select aria-label="Select Mentor" value={selectedMentor} onChange={handleMentorChange} >
                    <option value="">Select Mentor</option>
                    {
                        mentors && mentors.map((mentor) => (
                            <option key={mentor._id} value={mentor._id}>
                                {mentor.name}
                            </option>
                        ))
                    }
                </Form.Select>
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Assigned Mentor</th>
                        <th>Previous Mentor</th>
                        {/* Add other student details as needed */}
                    </tr>
                </thead>
                <tbody>
                    {studentTableData.map((student, index) => (
                        <tr key={student._id}>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.mentor ? student.mentor.name : ""}</td>
                            <td>{student.previousMentor ? student.previousMentor.name : ""}</td>
                            {/* Add other student details as needed */}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default StudentTable;
