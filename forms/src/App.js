import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    employee_id: '',
    name1: '',
    phone_number: '',
    dob: '',
    doj: '',
    email: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:8080/register', formData);
      alert(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>ERP</h1>
      <label>
        Employee ID:
        <input
          type="text"
          name="employee_id"
          value={formData.employee_id}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Name:
        <input
          type="text"
          name="name1"
          value={formData.name1}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Phone Number:
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          required
          pattern="\d{10}" // Validates a 10-digit phone number
          title="Phone number should be 10 digits"
        />
      </label>
      <br />
      <label>
        Date of Birth:
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Date of Joining:
        <input
          type="date"
          name="doj"
          value={formData.doj}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default RegistrationForm;
