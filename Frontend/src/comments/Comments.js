// import { useState, useEffect } from "react";
// import CommentForm from "./CommentForm";
// import Comment from "./Comment";
// import {
//   getComments as getCommentsApi,
//   createComment as createCommentApi,
//   updateComment as updateCommentApi,
//   deleteComment as deleteCommentApi,
// } from "../components/api";

// import axios from 'axios';

// const Comments = ({ currentUserId }) => {
//   const [backendComments, setBackendComments] = useState([]);
//   const [activeComment, setActiveComment] = useState(null);
//   const rootComments = backendComments.filter(
//     (backendComment) => backendComment.parentId === null
//   );
//   const getReplies = (commentId) =>
//     backendComments
//       .filter((backendComment) => backendComment.parentId === commentId)
//       .sort(
//         (a, b) =>
//           new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
//       );
//   const addComment = (text, parentId) => {
//     createCommentApi(text, parentId).then((comment) => {
//       setBackendComments([comment, ...backendComments]);
//       setActiveComment(null);
//     });
//   };


//   useEffect(() => {
//     getCommentsApi().then((data) => {
//       setBackendComments(data);
//     });
//   }, []);
//   return (
//     <div className="comments">
//       <h3 className="comments-title">Comments</h3>
//       <div className="comment-form-title">Write comment</div>
//       <CommentForm submitLabel="Write" handleSubmit={addComment} />
//       <div className="comments-container">
//         {rootComments.map((rootComment) => (
//           <Comment
//             key={rootComment.id}
//             comment={rootComment}
//             replies={getReplies(rootComment.id)}
//             activeComment={activeComment}
//             setActiveComment={setActiveComment}
//             addComment={addComment}
//             // deleteComment={deleteComment}
//             // updateComment={updateComment}
//             currentUserId={currentUserId}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Comments;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comments = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    // Fetch comments for the article when the component mounts
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/articles/${articleId}/comments`);
      setComments(response.data.comments);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  const postComment = async () => {
    try {
      // Make sure the user is logged in before posting a comment
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        // Redirect to login page or show a login modal
        return;
      }

      const response = await axios.post(`http://localhost:8080/api/articles/${articleId}/comments`, {
        commentText,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Update the comments with the newly posted comment
      setComments([...comments, response.data.comment]);
      setCommentText('');
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleReplyComment = async (commentId, replyText) => {
    try {
      // Make sure the user is logged in before replying to a comment
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        // Redirect to login page or show a login modal
        return;
      }

      const response = await axios.post(`http://localhost:8080/api/articles/${articleId}/comments/${commentId}/reply`, {
        replyText,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Find the commented that was replied to and update its replies
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, response.data.reply],
          };
        }
        return comment;
      });

      setComments(updatedComments);
    } catch (error) {
      console.error('Failed to reply to comment:', error);
    }
  };

  const handleReportComment = async (commentId) => {
    try {
      // Make sure the user is logged in before reporting a comment
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        // Redirect to login page or show a login modal
        return;
      }

      await axios.post(`/api/articles/${articleId}/comments/${commentId}/report`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Show a success message or update the UI to indicate that the comment was reported
    } catch (error) {
      console.error('Failed to report comment:', error);
    }
  };

  return (
    <div>
      {/* Comment input */}
      <textarea value={commentText} onChange={handleCommentTextChange} />
      <button onClick={postComment}>Post Comment</button>

      {/* Display comments */}
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.text}</p>

          {/* Reply form */}
          <textarea
            value={replyText}
            onChange={(event) => setReplyText(event.target.value)}
          />
          <button onClick={() => handleReplyComment(comment.id, replyText)}>Reply</button>

          {/* Display replies */}
          {comment.replies.map((reply) => (
            <div key={reply.id}>
              <p>{reply.text}</p>
            </div>
          ))}

          {/* Report button */}
          <button onClick={() => handleReportComment(comment.id)}>Report</button>
        </div>
      ))}
    </div>
    // <div>
    //   {/* Comment input */}
    //   <textarea value={commentText} onChange={handleCommentTextChange} />
    //   <button onClick={postComment}>Post Comment</button>

    //   {/* Display comments */}
    //   {comments.map((comment) => (
    //     <div key={comment.id}>
    //       <p>{comment.text}</p>

    //       {/*Reply form */}
    //       <textarea
    //         value={replyText}
    //         onChange={(event) => setReplyText(event.target.value)}
    //       />
    //       <button onClick={() => handleReplyComment(comment.id, replyText)}>Reply</button>

    //       {/* Display replies */}
    //       {comment.replies.map((reply) => (
    //         <div key={reply.id}>
    //           <p>{reply.text}</p>
    //         </div>
    //       ))}

    //       {/* Report button */}
    //       <button onClick={() => handleReportComment(comment.id)}>Report</button>
    //     </div>
    //   ))}
    // </div>
  );
};

export default Comments;
