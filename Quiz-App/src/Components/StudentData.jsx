import React from 'react';
import './studentData.css';

function StudentData() {
    const students = [
      { sno: 1, name: 'Student 1', id: 'ID1', marks: 85, timeTaken: '2 hours' },
      { sno: 2, name: 'Student 2', id: 'ID2', marks: 90, timeTaken: '1.5 hours' },
    ];
    return (
    <table>
      <thead>
        <tr>
          <th>Sno</th>
          <th>Student Name</th>
          <th>Student ID</th>
          <th>Marks</th>
          <th>Time Taken</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.sno}>
            <td>{student.sno}</td>
            <td>{student.name}</td>
            <td>{student.id}</td>
            <td>{student.marks}</td>
            <td>{student.timeTaken}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentData;
