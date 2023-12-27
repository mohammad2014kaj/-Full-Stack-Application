import React, { useState } from 'react';

const Form = () => {
  // updated form state to include address and phone
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent the default form submit action
    setSubmissionMessage(''); // Clear any previous messages
  
    // Perform client-side validation
    if (!formData.name || !formData.email || !formData.address || !formData.phone) {
      setSubmissionMessage('Please fill in all the fields.');
      return; // Exit early if any field is missing
    }
  
    // Check for valid email format
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setSubmissionMessage('Please enter a valid email address.');
      return; // Exit early if the email is not valid
    }
  
    // proceed with form submission if validation passes
    try {
      const response = await fetch('http://localhost:3001/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log('Server response:', data);
  
      // Provide feedback to the user based on the response
      if (data.success) {
        setSubmissionMessage('Form submitted successfully!');
        // Optionally clear the form
        // setFormData({
        //   name: '',
        //   email: '',
        //   address: '',
        //   phone: '',
        // });
      } else {
        setSubmissionMessage(data.message('Form submission failed.'));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
        Address:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Phone Number:
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </label>
      <br />
        <label>
          E-mail:
          <input
            type="email" // Set correct type for email input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {submissionMessage && <p>{submissionMessage}</p>}
    </div>
  );
};

export default Form;