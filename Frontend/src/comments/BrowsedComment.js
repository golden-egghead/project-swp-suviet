import React, { useState, useEffect } from 'react';

const BrowsedComment = ({ accessToken }) => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPendingComments = async (page) => {
    try {
      const response = await fetch(`http://localhost:8080/api/articles/pending/comments/${page}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched pending comments:', data.data);
        setComments(data.data);
        setTotalPages(data.total_pages);
      } else {
        // Handle error when fetching pending comments
        console.error('Failed to fetch pending comments');
      }
    } catch (error) {
      console.error('Failed to fetch pending comments', error);
    }
  };

  const handleCommentAction = async (commentId, browsed) => {
    try {
      const response = await fetch(`http://localhost:8080/api/articles/browse/comment/${commentId}?browsed=${browsed}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Comment action:', data);
        // Update the comments list after approving/rejecting a comment
        fetchPendingComments(currentPage);
      } else {
        // Handle error when approving/rejecting comment
        console.error('Failed to perform comment action');
      }
    } catch (error) {
      console.error('Failed to perform comment action', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchPendingComments(pageNumber);
  };

  useEffect(() => {
    fetchPendingComments(currentPage);
  }, []);

  return (
    <div>
      <h1>Pending Comments</h1>
      {comments.map((comment) => (
        <div key={comment.commentID}>
          <p>Comment Text: {comment.commentText}</p>
          <p>Created Date: {comment.createdDate}</p>
          <p>Status: {comment.status ? 'Approved' : 'Pending'}</p>
          <p>Enabled: {comment.enabled ? 'Yes' : 'No'}</p>
          <button onClick={() => handleCommentAction(comment.commentID, true)}>Approve</button>
          <button onClick={() => handleCommentAction(comment.commentID, false)}>Reject</button>
          <hr />
        </div>
      ))}
      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrowsedComment;
