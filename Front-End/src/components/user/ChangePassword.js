import axios from 'axios';
import React, { useState, useEffect, useContext, useRef } from 'react';

const ChangePassword = () => {

  
  const [mail, setMail] = useState('');

  const [oldPassword, setOldPassword] = useState([]);
  const [newPassword, setNewPassword] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Prepare form data for sending to the API
      const formData = new FormData();
      formData.append('mail', mail);
      formData.append('oldPassword', oldPassword);
      formData.append('newPassword', newPassword);  

      // Make an API request to save the article
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', 'http://localhost:8080/api/user/change_password');
      xhr.send(formData);

      // Handle the response, e.g., display a success message
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log(xhr.responseText);
          } else {
            setError('An error occurred while saving the article.');
            console.error(xhr.responseText);
          }
        }
      };

      // Clear the form inputs and images
      setOldPassword('');
      setNewPassword('');
      setMail('');

    } catch (err) {
      // Handle error response from the API
      setError('An error occurred while saving the article.');
      console.error(err);
    }

    setIsSubmitting(false);
  };

  return (
    <div>
      <h2>change password</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          maxLength={50}
          placeholder="mail"
          required
        />
        <input
          type="text"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          maxLength={50}
          placeholder="pass"
          required
        />
        <input
          type="text"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          maxLength={50}
          placeholder="pass"
          required
        />
        <button type="submit" disabled={isSubmitting}>
          Save
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;