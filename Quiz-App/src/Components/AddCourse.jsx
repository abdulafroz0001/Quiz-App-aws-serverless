import React, { useState } from 'react';
import axios from 'axios';
import './addCourse.css';

function AddCourse() {
  const [form, setForm] = useState({ name: '', courseCode: '', credits: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    const payload=
    {
      body:form
    }
    try {
      const response = await axios.post('https://d1y0zdfdne.execute-api.us-east-1.amazonaws.com/prod/addCourse', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)
      if (!response.status === 200) {
        throw new Error('Failed to submit form');
      }
      alert('Form submitted successfully!');
      // Optionally, reset the form after successful submission
      setForm({ name: '', courseCode: '', credits: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again later.');
    }
  };

  return (
    <div className="addCourse">
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} />
        <label>Course Code:</label>
        <input type="text" name="courseCode" value={form.courseCode} onChange={handleChange} />
        <label>Credits:</label>
        <input type="text" name="credits" value={form.credits} onChange={handleChange} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default AddCourse;
