import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // If you're using React Router
import axios from 'axios';

const ResetPassword = () => {
  const { code } = useParams(); // Get the code parameter from the URL
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/api/auth/reset-password/${code}`, { password });
      console.log(response.data); // Handle the response from the backend
      alert(response.data);
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during the request
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleResetPassword}>
        <input type="password" value={password} onChange={handlePasswordChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ResetPassword;
