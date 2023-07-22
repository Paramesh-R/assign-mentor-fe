import React from 'react'
import AddNewMentor from '../components/mentor/AddNewMentor'
import AssignMentorToMultipleStudents from '../components/mentor/AssignMentorToMultipleStudents'


const MentorPage = ({ students, mentors, studentsWithoutMentor, onAddMentor, onAssignMentorToMultiple }) => {



    return (
        <div className="container">

            <h3 className="display-5">Mentor</h3>

            <div className="row justify-content-evenly" >
                <div className="col-sm-12 col-lg-4 rounded border border-secondary me-1 my-3" style={{ minHeight: '15vh' }}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <AddNewMentor onAddMentor={onAddMentor} />
                    </div>
                </div>

                <div className="col-sm-12 col-lg-7 rounded border border-secondary me-1 my-3" style={{ minHeight: '15vh' }}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <AssignMentorToMultipleStudents
                            mentors={mentors}
                            onAssignMentorToMultiple={onAssignMentorToMultiple}
                            studentsWithoutMentor={studentsWithoutMentor}
                        />
                    </div>
                </div>
            </div>

            {/*
            <div className="col-sm-12 col-lg-4 rounded border border-secondary  my-3" style={{ minHeight: '15vh' }}>
                <div className="d-flex justify-content-center align-items-center h-100">
                    <StudentDetails students={students} />
                </div>
            </div>
            <div className="col-12 rounded border border-secondary">
                <h4 className="display-5">Student List</h4>
                <StudentTable students={students} />
            </div> */}

        </div>
    )
}

export default MentorPage