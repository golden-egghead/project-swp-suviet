

import React, { useState, useEffect, useContext, createContext } from "react";
import styled from "styled-components";
import TextArea from "react-textarea-autosize";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card } from "react-bootstrap";
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import './cmt.css';


const CommentForm = ({ accessToken, articleId, updateComments, updateReplies, commentId, showReplyForm, setShowReplyForm }) => {
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');

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
  };
  // const handleReplySubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch(`http://localhost:8080/api/articles/${articleId}/comments/${commentId}/reply`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  //       },
  //       body: JSON.stringify({ replyText }),
  //     });

  //     if (response.ok) {
  //       // Reply posted successfully
  //       console.log('Reply posted successfully');
  //       toast.success('Bình luận đã được gửi cho quản trị viên xét duyệt!');
  //       setReplyText('');
  //       updateReplies(); // Update comments after posting a new reply
  //       setShowReplyForm(false); // Use setShowReplyForm from props to hide the reply form after successful reply
  //     } else {
  //       // Handle error when posting reply
  //       toast.error('có lỗi xảy ra');
  //       console.error('Failed to post reply');
  //     }
  //   } catch (error) {
  //     toast.error('có lỗi ');
  //     console.error('Failed ', error);
  //   }
  // };


  if (!showReplyForm) {
    return (
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write your comment..."
          required
        />
        <button type="submit">Đăng bình luận</button>
      </form>
    );
  }
};

const Reply = ({ commentId, articleId, comment, updateReplies }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const fullname = localStorage.getItem('fullname');
  // const avatar = localStorage.getItem('avatar');
  const avatar = localStorage.getItem('avatar');
  const handleReplyClick = () => {
    setShowReplyForm({ commentId: commentId, showReplyForm: true });
    setAccessToken(accessToken);
  };

  const handleCancelReply = () => {
    setShowReplyForm(false);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/articles/${articleId}/comments/${commentId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ replyText }),
      });

      if (response.ok) {
        // Reply posted successfully
        console.log('Reply posted successfully');
        toast.success('Bình luận đã được gửi cho quản trị viên xét duyệt!');
        setReplyText('');
        updateReplies(); // Update comments after posting a new reply
        setShowReplyForm(false); // Use setShowReplyForm from props to hide the reply form after successful reply
      } else {
        // Handle error when posting reply
        toast.error('có lỗi xảy ra');
        console.error('Failed to post reply');
      }
    } catch (error) {
      toast.error('có lỗi ');
      console.error('Failed ', error);
    }
  };

  return (
    <div>
      <Comment.Group>
        <Comment>

          <Comment.Content>
            <Comment.Author ><p> {comment.user.fullName}</p></Comment.Author>
            <Comment.Metadata>
              <div>{comment.createdDate}</div>
            </Comment.Metadata>
            <Comment.Text>
              <p>{comment.commentText}</p>
            </Comment.Text>
          </Comment.Content>

          <Comment.Group>
            <Comment>
              <Comment.Content>
                {comment.repliesComments && Array.isArray(comment.repliesComments) && (
                  <div style={{marginTop:'80px', marginLeft:'0px', backgroundColor:'#ffc701'}}>
                    {comment.repliesComments.map((reply) => (
                      <div key={reply.id}>
                        <div><p>Trả lời bình luận của {comment.user.fullName} </p></div>
                        <Comment.Author ><p> {reply.user.fullName}</p></Comment.Author>
                        <Comment.Metadata>
                          <div>{reply.createdDate}</div>
                        </Comment.Metadata>
                        <Comment.Text><p> {reply.replyText}</p></Comment.Text>


                      </div>
                    ))}
                  </div>

                )}
              </Comment.Content>
            </Comment>
          </Comment.Group>
        </Comment>
      </Comment.Group>
      {!showReplyForm && (

        <Comment.Actions>
          <Comment.Action><button onClick={handleReplyClick}>Trả lời</button></Comment.Action>
        </Comment.Actions>
      )}
      {showReplyForm && (
        <>
          <form onSubmit={handleReplySubmit}>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
              required
            />
            <button type="submit">Trả lời</button>
          </form>
          <button onClick={handleCancelReply}>Hủy</button>
        </>
      )}
    </div>
  );
};

const Comments = ({ articleId, }) => {
  const [comments, setComments] = useState([]);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [commentId, setCommentId] = useState('');


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
        setCommentId(data.data.commentID)
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
  }, [articleId,commentId, accessToken]);
  return (
    <div>
      <Card className="comments-all">
        <Comment.Group>
          <Header as='h3' dividing>
            Bình luận
          </Header>
        </Comment.Group>
        <div>
        <CommentForm
          accessToken={accessToken}
          articleId={articleId}
          updateComments={fetchComments}
          setShowReplyForm={setShowReplyForm} // Pass setShowReplyForm function to CommentForm
        /></div>
        {comments.map((comment) => (
          <Reply
          key={comment.id}
          accessToken={accessToken}
          articleId={articleId}
          commentId={commentId} // Pass comment.id, not commentId
          comment={comment} // Pass the comment object to the Reply component
          updateReplies={fetchComments}
        />
        ))}
      </Card>
      
    </div>
  );
};

export default Comments;
