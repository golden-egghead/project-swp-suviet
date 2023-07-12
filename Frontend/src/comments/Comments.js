import React, { useState, useEffect } from 'react';

const CommentForm = ({ accessToken, articleId, updateComments, replyToComment }) => {
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
  };
  const handleReplySubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:8080/api/articles/${articleId}/comments/${replyToComment.commentId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ commentText }),
      });
  
      // Rest of the code...
    } catch (error) {
      console.error('Failed to post reply', error);
    }
  };
  

  return (
    <form onSubmit={replyToComment ? handleReplySubmit : handleCommentSubmit}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder={replyToComment ? 'Write your reply...' : 'Write your comment...'}
        required
      />
      <button type="submit">{replyToComment ? 'Reply' : 'Post Comment'}</button>
    </form>
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

  const handleReplyClick = (commentId) => {
    setReplyToComment({ commentId, showReplyForm: true });
  };


  const handleCancelReply = () => {
    setReplyToComment(null);
  };


  return (
    <div>
      <h1>Bình luận</h1>
      <CommentForm
        accessToken={accessToken}
        articleId={articleId}
        updateComments={fetchComments}
        replyToComment={replyToComment}
      />

      <h2>Bình luận</h2>
      {comments?.map((comment) => (
        <div key={comment.id}>
          <p>Comment: {comment.commentText}</p>
          <p>Created Date: {comment.createdDate}</p>
          {comment.repliesComments && Array.isArray(comment.repliesComments) && (
            <div>
              {comment.repliesComments?.map((reply) => (
                <div key={reply.id}>
                  <p>Reply: {reply.commentText}</p>
                  <p>Created Date: {reply.createdDate}</p>
                </div>
              ))}
            </div>
          )}
          {!replyToComment && (
            <button onClick={() => handleReplyClick(comment.id)}>Reply</button>
          )}
          {replyToComment && replyToComment.commentId === comment.id && replyToComment.showReplyForm && (
            <>
              <CommentForm
                accessToken={accessToken}
                articleId={articleId}
                updateComments={fetchComments}
                replyToComment={comment.id} // Pass the commentId as the replyToComment value
              />
              <button onClick={handleCancelReply}>Cancel Reply</button>
            </>
          )}

        </div>
      ))}
    </div>
  );
};

export default Comments;
