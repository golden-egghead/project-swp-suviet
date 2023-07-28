import React, { useState, useEffect } from 'react';
import './browsed-comment.css'

const BrowsedComment = ({ accessToken }) => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [title, setTitle] = useState([]);

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
        setTitle(data.data)
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
      <div className='pending-comments'>
      <h1 className='pending_h1'>Duyệt Bình Luận</h1>
      {/* {title.map((article) => (
        <div className='comments' key={article.articleID}>
      <p>Bình luận từ bài viết: {article.title}</p>
      </div>
      ))} */}
      {comments.map((comment) => (
        <div className='comments' key={comment.commentID}>
        
          <p>Nội dung bình luận: {comment.commentText}</p>
          <p>Ngày bình luận: {comment.createdDate}</p>
          <p>Trạng thái: {comment.status ? 'Approved' : 'Đang chờ xem xét'}</p>
          <div className='button-container'>
            <button className='button-approve'  onClick={() => handleCommentAction(comment.commentID, true)}>Chấp thuận</button>
            <button className='button-reject' onClick={() => handleCommentAction(comment.commentID, false)}>Từ chối</button>
          </div>
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
    </div>
  );
};

export default BrowsedComment;
