import { useEffect, useState } from 'react';
import axios from 'axios';
import StudentPage from './StudentPage';
import MentorPage from './MentorPage';
import { toast } from 'react-toastify';


const Dashboard = () => {
    const [studentsData, setStudentsData] = useState([]);
    const [mentorsData, setMentorsData] = useState([]);
    const [studentsWithoutMentor, setStudentsWithoutMentor] = useState([])

    function getStudentDetails() {
        // Fetch student details
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/students`)
            .then((response) => {
                setStudentsData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching student details:', error);
            });
    }

    function getMentorDetails() {
        // Fetch mentor details
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mentors`)
            .then((response) => {
                setMentorsData(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.error('Error fetching mentor details:', error);
            });
    }

    function getStudentsWithoutMentor() {
        // Fetch mentor details
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/students/students-without-mentor`)
            .then((response) => {

                setStudentsWithoutMentor(response.data.students);
            })
            .catch((error) => {
                console.error('Error fetching mentor details:', error);
            });
    }
    useEffect(() => {
        getStudentDetails();
        getMentorDetails();
        getStudentsWithoutMentor();


    }, []); // Empty dependency array ensures useEffect runs only once

    // <---------------------------Handle Mentor--------------------------->
    const handleAddMentor = (mentorName) => {
        const newMentor = {
            name: mentorName,
        }
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/mentors`, newMentor)
            .then((response) => {

                toast.success(response.data.message + ': ' + response.data.mentor.name);
                console.log(response.data)
                setMentorsData([...mentorsData, response.data.mentor]);
            })
            .catch((error) => {
                toast.error(error.response.data.message)
                console.log('Error Creating Mentor:', error);
            });

    }

    const handleAssignMultipleStudents = (selectedStudents, selectedMentor) => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/mentors/${selectedMentor}/assign-students`, { studentIds: selectedStudents })
            .then((response) => {
                // Handle the successful assignment here if needed
                console.log('Students assigned to mentor successfully:', response.data);
                getStudentDetails();
                getStudentsWithoutMentor()
            })
            .catch((error) => {
                console.error('Error assigning students to mentor:', error);
            });
    }

    // <---------------------------Handle Student--------------------------->
    const handleAddStudent = (studentName) => {
        // Add logic to add a new student to the backend and update the state
        // Create a new student object with the name entered by the user
        const newStudent = {
            name: studentName,
            // Add other properties as needed, e.g., age, grade, etc.
        };

        // Send a POST request to '${process.env.REACT_APP_SERVER_URL}/api/students' to create the new student
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/students`, newStudent)
            .then((response) => {

                // console.log(response.data)
                // Handle the successful creation of the new student here, if needed
                toast.success(response.data.message + ': ' + response.data.student.name);
                console.log(response.data)
                // Update the student data with the new student
                setStudentsData([...studentsData, response.data.student]);
                getStudentsWithoutMentor();
            })
            .catch((error) => {
                console.log(error)
                // Handle errors here, e.g., display an error message to the user
                toast.error('Error creating student:', error);
            });

    };

    const handleAssignMentor = (studentId, mentorId) => {
        // Add logic to assign a mentor to a student in the backend and update the state
        // Send a POST request to the backend to assign the mentor to the student
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/students/${studentId}/assign-mentor/${mentorId}`)
            .then((response) => {
                // Update the frontend state to reflect the new assignment
                // You'll need to fetch the updated data from the backend
                // or update the local state with the new assignment manually
                const updatedStudentData = studentsData.map((student) => {
                    if (student._id === response.data.updatedStudent._id) {
                        return { ...student, mentor: response.data.updatedStudent.mentor };
                    }
                    return student;
                });

                toast.success('Mentor assigned successfully:', response.data.updatedStudent);
                setStudentsData(updatedStudentData);
            })
            .catch((error) => {
                console.error('Error assigning mentor:', error);
            });
    };



    return (
        <>
            <div className="container-fluid bg-light min-vh-100">
                {/* <----------------Heading----------------> */}
                <h2 className="display-4 text-center">
                    Assign Mentor using Database
                </h2>
                <hr />

                {/* <-----------------MENTOR-----------------> */}
                <section className="mentor">
                    <MentorPage
                        students={studentsData}
                        mentors={mentorsData}
                        studentsWithoutMentor={studentsWithoutMentor}
                        onAddMentor={handleAddMentor}
                        onAssignMentorToMultiple={handleAssignMultipleStudents}
                    />
                </section>
                <hr />

                {/* <----------------STUDENT----------------> */}
                <div>
                    <StudentPage
                        students={studentsData}
                        mentors={mentorsData}
                        onAddStudent={handleAddStudent}
                        onAssignMentor={handleAssignMentor}
                    />
                </div>
                {/* ---------------------------------------- */}
            </div>




        </>
    )
}

export default Dashboard