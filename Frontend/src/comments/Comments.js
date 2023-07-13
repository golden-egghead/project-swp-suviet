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


// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';

// const Card = ({ className, children }) => {
//   return <div className={className}>{children}</div>;
// };

// const StyledCard = styled(Card)`
//   text-align: left;
//   padding: 24px;
//   background: #1d252c;
//   color: #fff;
//   border-radius: 8px;
// `;

// const Button = ({ className, children, onClick }) => {
//   const handleClick = (e) => {
//     const d = document.createElement('div');
//     d.className = 'circle';
//     const x = e.nativeEvent.offsetX;
//     const y = e.nativeEvent.offsetY;
//     d.style.left = `${x}px`;
//     d.style.top = `${y}px`;
//     e.currentTarget.appendChild(d);
//     d.addEventListener('animationend', function () {
//       d.parentElement.removeChild(d);
//     });
//     onClick();
//   };

//   return (
//     <button className={className} onClick={handleClick}>
//       {children}
//     </button>
//   );
// };

// const StyledButton = styled(Button)`
//   overflow: hidden;
//   position: relative;
//   display: block;
//   font-weight: bold;
//   width: fit-content;
//   height: fit-content;
//   color: #ffffff;
//   cursor: pointer;
//   padding: 6px 16px;
//   border: none;
//   border-radius: 4px;
//   background: #4f9eed;
//   transition: 0.1s ease 0s;

//   -webkit-touch-callout: none; /* iOS Safari */
//   -webkit-user-select: none; /* Safari */
//   -khtml-user-select: none; /* Konqueror HTML */
//   -moz-user-select: none; /* Firefox */
//   -ms-user-select: none; /* Internet Explorer/Edge */
//   user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */

//   &:hover {
//     background: #2e78c2;
//   }

//   .circle {
//     position: absolute;
//     box-sizing: border-box;
//     background: white;
//     border-radius: 50%;
//     animation: clickEffect 0.4s ease-out;
//     z-index: 99999;
//   }

//   @keyframes clickEffect {
//     0% {
//       opacity: 1;
//       width: 0.5em;
//       height: 0.5em;
//       margin: -0.25em;
//       border-width: 0.5em;
//     }

//     100% {
//       opacity: 0;
//       width: 15em;
//       height: 15em;
//       margin: -7.5em;
//       border-width: 0.03em;
//     }
//   }
// `;

// const Markdown = ({ className, children }) => {
//   return <div className={className}>{children}</div>;
// };

// const StyledMarkdown = styled(Markdown)`
//   code {
//     padding: 4px;
//     background: rgba(255, 255, 255, 0.1);
//     border: 1px solid #576877;
//     border-radius: 4px;
//   }

//   blockquote {
//     margin: 0px;
//     padding-left: 8px;
//     border-left: 4px solid #576877;
//     background: rgba(255, 255, 255, 0.1);
//   }
// `;

// const CommentForm = ({ accessToken, articleId, updateComments, replyToComment }) => {
//   const [commentText, setCommentText] = useState('');

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`http://localhost:8080/api/articles/${articleId}/comments`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({ commentText }),
//       });

//       if (response.ok) {
//         console.log('Comment posted successfully');
//         setCommentText('');
//         updateComments();
//       } else {
//         alert('Please log in to comment');
//         console.error('Failed to post comment');
//       }
//     } catch (error) {
//       alert('Please log in to comment');
//       console.error('Failed to post comment', error);
//     }
//   };

//   const handleReplySubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/articles/${articleId}/comments/${replyToComment.commentId}/reply`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`,
//           },
//           body: JSON.stringify({ commentText }),
//         }
//       );

//       if (response.ok) {
//         console.log('Reply posted successfully');
//         setCommentText('');
//         updateComments();
//       } else {
//         alert('Please log in to reply');
//         console.error('Failed to post reply');
//       }
//     } catch (error) {
//       alert('Please log in to reply');
//       console.error('Failed to post reply', error);
//     }
//   };

//   return (
//     <StyledCard>
//       <form onSubmit={replyToComment ? handleReplySubmit : handleCommentSubmit}>
//         <textarea
//           value={commentText}
//           onChange={(e) => setCommentText(e.target.value)}
//           placeholder={replyToComment ? 'Write your reply...' : 'Write your comment...'}
//           required
//         />
//         <StyledButton type="submit">{replyToComment ? 'Reply' : 'Post Comment'}</StyledButton>
//       </form>
//     </StyledCard>
//   );
// };

// const Comments = ({ articleId }) => {
//   const [comments, setComments] = useState([]);
//   const [replyToComment, setReplyToComment] = useState(null);
//   const accessToken = localStorage.getItem('accessToken');

//   const fetchComments = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/articles/${articleId}/comments`, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Fetched comments:', data.data);
//         setComments(data.data);
//       } else {
//         console.error('Failed to fetch comments');
//       }
//     } catch (error) {
//       console.error('Failed to fetch comments', error);
//     }
//   };

//   useEffect(() => {
//     fetchComments();
//   }, [articleId, accessToken]);

//   const handleReplyClick = (commentId) => {
//     setReplyToComment({ commentId, showReplyForm: true });
//   };

//   const handleCancelReply = () => {
//     setReplyToComment(null);
//   };

//   return (
//     <div>
//       <h1>Bình luận</h1>
//       <CommentForm
//         accessToken={accessToken}
//         articleId={articleId}
//         updateComments={fetchComments}
//         replyToComment={replyToComment}
//       />

//       <h2>Bình luận</h2>
//       <div className='cmtreply'>
//       {comments?.map((comment) => (
//         <StyledCard key={comment.id}>
//           <p>Comment: {comment.commentText}</p>
//           <p>Created Date: {comment.createdDate}</p>
//           {comment.repliesComments && Array.isArray(comment.repliesComments) && (
//             <div>
//               {comment.repliesComments?.map((reply) => (
//                 <StyledCard key={reply.id}>
//                   <p>Reply: {reply.commentText}</p>
//                   <p>Created Date: {reply.createdDate}</p>
//                 </StyledCard>
//               ))}
//             </div>
//           )}
//           {!replyToComment && (
//             <StyledButton onClick={() => handleReplyClick(comment.id)}>Reply</StyledButton>
//           )}
//           {replyToComment && replyToComment.commentId === comment.id && replyToComment.showReplyForm && (
//             <>
//               <CommentForm
//                 accessToken={accessToken}
//                 articleId={articleId}
//                 updateComments={fetchComments}
//                 replyToComment={comment} // Pass the whole comment object as replyToComment
//               />
//               <StyledButton onClick={handleCancelReply}>Cancel Reply</StyledButton>
//             </>
//           )}
//         </StyledCard>
//       ))}
//       </div>
//     </div>
//   );
// };

// export default Comments;
