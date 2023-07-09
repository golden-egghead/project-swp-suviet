
import React, { useState, useEffect } from 'react';

const CommentForm = ({ accessToken, articleId }) => {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/articles/' + articleId + '/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ commentText }),
      });

      if (response.ok) {
        // Comment posted successfully
        setCommentText('');
      } else {
        // Handle error when posting comment
        console.error('Failed to post comment');
      }
    } catch (error) {
      console.error('Failed to post comment', error);
    }
  };

  return (
    <form onSubmit={handleCommentSubmit}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write your comment..."
        required
      />
      <button type="submit">Post Comment</button>
    </form>
  );
};

const Comments = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/articles/' + articleId + '/comments', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setComments(data.comments);
        } else {
          // Handle error when fetching comments
          console.error('Failed to fetch comments');
        }
      } catch (error) {
        console.error('Failed to fetch comments', error);
      }
    };

    fetchComments();
  }, [articleId, accessToken]);

  return (
    <div>
      <h1>Post a Comment</h1>
      <CommentForm accessToken={accessToken} articleId={articleId} />

      <h2>Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id}>{comment.text}</div>
      ))}
    </div>
  );
};

export default Comments;
