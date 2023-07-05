import React, { useState } from 'react';
import axios from 'axios';

const CommentBox = () => {
  const [comment, setComment] = useState('');

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('your-api-endpoint', {
        comment: comment,
      });

      // Handle the response or perform any additional actions
      console.log(response.data);

      // Clear the comment box
      setComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={comment} onChange={handleChange} />
      <button type="submit">Submit Comment</button>
    </form>
  );
};

export default CommentBox;
