import React from 'react';
import AddNewStudent from '../components/students/AddNewStudent';
import AssignMentorToStudent from '../components/students/AssignMentorToStudent';
import StudentDetails from '../components/students/StudentDetails';
import StudentTable from '../components/students/StudentTable';


const StudentPage = ({ students, mentors, onAddStudent, onAssignMentor }) => {
  return (
    <div className="container-fluid">
      <h3 className="display-5">Student</h3>

      <div className="row justify-content-evenly">

        {/* Add New Student */}
        <div
          className="col-sm-12 col-lg-4 rounded border border-secondary me-1 my-3"
          style={{ minHeight: '15vh' }}
        >
          <div className="d-flex justify-content-center align-items-center h-100">
            <AddNewStudent onAddStudent={onAddStudent} />
          </div>
        </div>

        {/* Assign Mentor to Student */}
        <div
          className="col-sm-12 col-lg-4 rounded border border-secondary me-1 my-3"
          style={{ minHeight: '15vh' }}
        >
          <div className="d-flex justify-content-center align-items-center h-100">
            <AssignMentorToStudent students={students} mentors={mentors} onAssignMentor={onAssignMentor} />
          </div>
        </div>

        {/* Student Details to display Current and Previous Mentor */}
        <div
          className="col-sm-12 col-lg-4 rounded border border-secondary  my-3"
          style={{ minHeight: '20vh' }}
        >
          <div className="d-flex justify-content-center align-items-center h-100">
            <StudentDetails students={students} />
          </div>
        </div>

        {/* Student List */}
        <div className="col-12 rounded border border-secondary">
          <h4 className="display-5">Student List</h4>
          <p><small>Task 5. API to show all students for a particular mentor</small></p>
          <StudentTable students={students} mentors={mentors} />
        </div>
      </div>
    </div>

  );
};

export default StudentPage;
