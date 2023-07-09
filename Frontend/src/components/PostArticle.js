
import React, { useState } from 'react';

function PostArticle() {
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState([]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContextChange = (event) => {
    setContext(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTagChange = (event) => {
    const selectedTags = Array.from(event.target.selectedOptions, (option) => option.value);
    setTags(selectedTags);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('data', JSON.stringify({ title, context, tagNames: tags }));
    formData.append('file', file);

    // Retrieve the access token from localStorage
    const accessToken = localStorage.getItem('accessToken');

    fetch('http://localhost:8080/api/articles', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log(data);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={handleTitleChange} />
      </div>
      <div>
        <label htmlFor="context">Context:</label>
        <textarea id="context" value={context} onChange={handleContextChange} />
      </div>
      <div>
        <label htmlFor="file">Image:</label>
        <input type="file" id="file" onChange={handleFileChange} />
      </div>
      <div>
        <label htmlFor="tags">Tags:</label>
        <select multiple id="tags" value={tags} onChange={handleTagChange}>
          <option value="tag1">Tag 1</option>
          <option value="tag2">Tag 2</option>
          <option value="tag3">Tag 3</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}



export default PostArticle;
