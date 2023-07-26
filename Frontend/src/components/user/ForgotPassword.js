import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [mail, setMail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/forgot', { mail });

      // Handle the response from the API
      console.log(response.data);
      alert(response.data);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ForgotPassword;
