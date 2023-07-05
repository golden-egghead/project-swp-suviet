import axios from 'axios';
import React, { useState, useEffect, useContext, useRef } from 'react';

const UpdateProfile = () => {

  
  const [fullName, setFullName] = useState('');

  const [image, setImage] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImage(files.slice(0, 5)); // Limit to maximum 5 images
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Prepare form data for sending to the API
      const formData = new FormData();
      formData.append('fullName', fullName);
      image.forEach((image, index) => {
        formData.append(`image${index + 1}`, image);
      });

      // Get the access token from the localStorage
      const accessToken = localStorage.getItem('accessToken');

      // Make an API request to save the profile
      const response = await axios.post('http://localhost:8080/profile', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
        },
      });

      // Handle the response, e.g., display a success message
      console.log(response.data);

      // Clear the form inputs and images
      setFullName('');
      setImage([]);
    } catch (err) {
      // Handle error response from the API
      setError('An error occurred while saving the article.');
      console.error(err);
    }

    setIsSubmitting(false);
  };

  return (
    <div>
      <h2>Update account</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          maxLength={50}
          placeholder="name"
          required
        />

        <br />
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />
        <br />
        <button type="submit" disabled={isSubmitting}>
          Save
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;