import React, { useState, useEffect, useContext, createContext } from "react";
import styled from "styled-components";
import TextArea from "react-textarea-autosize";
import Markdown from "./Markdown";
import Button from "./Button";

const CommentContext = createContext({});

function compare(a1, a2) {
  if (JSON.stringify(a1) === JSON.stringify(a2)) {
    return true;
  }
  return false;
}

function Reply(props) {
  const [text, setText] = useState("");
  const { commentId, showReplyForm } = props.replyToComment;

  const handleReplySubmit = () => {
    // Handle submitting reply
    // You can integrate your API call here to submit the reply
    console.log("Submitting reply:", text);

    // Reset text and hide the reply form after successful reply submission
    setText("");
    props.setShowReplyForm(false);
  };

  return (
    <div {...props}>
      <TextArea
        placeholder="What are your thoughts?"
        minRows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="panel">
        <div className="comment_as">
          Comment as{" "}
          <a href="" className="username">
            Kevin
          </a>
        </div>
        <Button onClick={handleReplySubmit}>COMMENT</Button>
      </div>
    </div>
  );
}

Reply = styled(Reply)`
  // Add your custom styles for Reply component here
`;

function Comment(props) {
  const [replying, setReplying] = useContext(CommentContext);
  const [minimized, setMinimized] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { username, date, text, comments } = props.comment;

  return (
    <div {...props}>
      {hidden ? (
        <button
          id="showMore"
          onClick={() => {
            setHidden(false);
          }}
        >
          Show More Replies
        </button>
      ) : (
        <>
          <div id="left" className={minimized ? "hidden" : ""}></div>
          <div id="right">
            <div id="top">
              <span
                className="minimize"
                onClick={() => {
                  setMinimized(!minimized);
                }}
              >
                [{minimized ? "+" : "-"}]
              </span>
              <span id="username">
                <a href="">{username}</a>
              </span>
              <span id="date">
                <a href="">{date}</a>
              </span>
            </div>
            <div id="content" className={minimized ? "hidden" : ""}>
              <Markdown options={{ forceBlock: true }}>{text}</Markdown>
            </div>
            <div id="actions" className={minimized ? "hidden" : ""}>
              <span
                className={`${compare(replying, props.path) ? "selected" : ""}`}
                onClick={() => {
                  if (compare(replying, props.path)) {
                    setReplying([]);
                  } else {
                    setReplying(props.path);
                  }
                }}
              >
                reply
              </span>
              <span>report</span>
            </div>
            <Reply
              className={
                compare(replying, props.path) && !minimized ? "" : "hidden"
              }
              replyToComment={{ commentId: props.comment.id, showReplyForm: true }}
              setShowReplyForm={props.setParentShowReplyForm}
            />
            <div className={`comments ${minimized ? "hidden" : ""}`}>
              {comments.map((comment, index) => (
                <Comment
                  key={index}
                  username={comment.username}
                  date={comment.date}
                  text={comment.text}
                  votes={comment.votes}
                  comments={comment.comments}
                  colorindex={props.colorindex + 1}
                  path={[...props.path, index]}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

Comment = styled(Comment)`
  // Add your custom styles for Comment component here
`;

function Comments(props) {
  const [replying, setReplying] = useState([]);
  const [comments, setComments] = useState([...props.comments]);

  // Fetch comments function and other code here...

  return (
    <div {...props}>
      <h1>Bình luận</h1>
      <CommentContext.Provider value={[replying, setReplying]}>
        {comments.map((comment, index) => (
          <Comment
            key={index}
            username={comment.username}
            date={comment.date}
            text={comment.text}
            votes={comment.votes}
            comments={comment.comments}
            colorindex={0}
            path={[index]}
            setParentShowReplyForm={setReplying}
          />
        ))}
      </CommentContext.Provider>
    </div>
  );
}

export default styled(Comments)`
  // Add your custom styles for Comments component here
`;

// Note: Remember to add your custom styles for each styled component (Reply, Comment, and Comments) as needed.
