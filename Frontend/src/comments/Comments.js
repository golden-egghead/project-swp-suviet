import React, { useState, useEffect, useContext, createContext } from "react";
import styled from "styled-components";
import TextArea from "react-textarea-autosize";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card } from "react-bootstrap";

const CommentForm = ({ accessToken, articleId, updateComments, replyToComment, showReplyForm, setShowReplyForm }) => {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/articles/${articleId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ commentText }),
      });

      if (response.ok) {
        // Comment posted successfully
        console.log('Comment posted successfully');
        toast.success('Bình luận đã được gửi cho quản trị viên xét duyệt!');
        setCommentText('');
        updateComments(); // Update comments after posting a new comment
      } else {
        // Handle error when posting comment
        alert('login to comment')
        console.error('Failed to post comment');
      }
    } catch (error) {
      alert('login to comments')
      console.error('Failed to post comment', error);
    }
  };const handleReplySubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:8080/api/articles/${articleId}/comments/${replyToComment.commentId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ commentText }),
      });

      if (response.ok) {
        // Reply posted successfully
        console.log('Reply posted successfully');
        toast.success('Bình luận đã được gửi cho quản trị viên xét duyệt!');
        setCommentText('');
        updateComments(); // Update comments after posting a new reply
        setShowReplyForm(false); // Use setShowReplyForm from props to hide the reply form after successful reply
      } else {
        // Handle error when posting reply
        console.error('Failed to post reply');
      }
    } catch (error) {
      console.error('Failed to post reply', error);
    }
  };

  
  if (!showReplyForm) {
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
  } else {
    return (
      <form onSubmit={handleReplySubmit}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write your reply..."
          required
        />
        <button type="submit">Reply</button>
      </form>
    );
  }
};

const Reply = ({ accessToken, articleId, comment, updateComments, setParentShowReplyForm }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplyClick = () => {
    setShowReplyForm({ commentId: comment.id, showReplyForm: true });
  };

  const handleCancelReply = () => {
    setShowReplyForm(false);
  };

  return (
    <div>
      <p>Comment: {comment.commentText}</p>
      <p>Created Date: {comment.createdDate}</p>
      {comment.repliesComments && Array.isArray(comment.repliesComments) && (
        <div>
          {comment.repliesComments.map((reply) => (
            <div key={reply.id}>
              <p>Reply: {reply.commentText}</p>
              <p>Created Date: {reply.createdDate}</p>
            </div>
          ))}
        </div>
      )}
      {!showReplyForm && (
        <button onClick={handleReplyClick}>Trả lời</button>
      )}
      {showReplyForm && (
        <>
          <CommentForm
            accessToken={accessToken}
            articleId={articleId}
            updateComments={updateComments}
            replyToComment={comment} // Pass the comment object as the replyToComment value
            showReplyForm={showReplyForm} // Pass the showReplyForm value
            setShowReplyForm={setShowReplyForm} // Pass the setShowReplyForm function
          />
          <button onClick={handleCancelReply}>Cancel Reply</button>
        </>
      )}
    </div>
  );
};

const Comments = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [replyToComment, setReplyToComment] = useState(null);
  const accessToken = localStorage.getItem('accessToken');



  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/articles/${articleId}/comments`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched comments:', data.data);
        setComments(data.data);
      } else {
        // Handle error when fetching comments
        console.error('Failed to fetch comments');
      }
    } catch (error) {
      console.error('Failed to fetch comments', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [articleId, accessToken]);
  return (
    <div>
      <h1>Bình luận</h1>
      <CommentForm
        accessToken={accessToken}
        articleId={articleId}
        updateComments={fetchComments}
        replyToComment={replyToComment}
        showReplyForm={replyToComment?.showReplyForm}
        setShowReplyForm={setReplyToComment}
      />
      {comments.map((comment) => (
        <Reply
        key={comment.id}
        accessToken={accessToken}
        articleId={articleId}
        comment={comment}
        updateComments={fetchComments}
        setParentShowReplyForm={setReplyToComment}
      />
      ))}
    </div>
  );
};

export default Comments;


