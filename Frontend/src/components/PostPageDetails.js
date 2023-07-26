import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IoReturnUpBackSharp } from 'react-icons/io5';
import Button from 'react-bootstrap/Button';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Comments from '../comments/Comments';

export default function PostPageDetails() {
  const { articleID } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userVote, setUserVote] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [changeVoteClicked, setChangeVoteClicked] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/articles/details/${articleID}`);
        setArticle(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching article:', error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleID]);
  const [hasVoted, setHasVoted] = useState(false);
  useEffect(() => {
    // Retrieve the user's vote from local storage when the component mounts
    const storedVote = localStorage.getItem(`userVote-${articleID}`);
    if (storedVote) {
      setUserVote(JSON.parse(storedVote));
      setSelectedRating(JSON.parse(storedVote).voteLevel);
      setHasVoted(true); // Set hasVoted to true if the user has voted before
    }
  }, [articleID]);

  const handleBack = () => {
    window.history.back();
  };
  const [userVoteId, setUserVoteId] = useState(null);
  const handleVoteArticle = async (voteLevel) => {
    try {
      if (!hasVoted) {
        // If the user has not voted yet, create a new vote
        const response = await axios.post(`http://localhost:8080/api/articles/${articleID}/votes`, { voteLevel });
        const newVoteId = response.data.data.voteID; // Assuming the API response contains the voteId
        setUserVote({ voteLevel, voteID: newVoteId });
        setUserVoteId(newVoteId);
        setSelectedRating(voteLevel);
        setHasVoted(true);
        // Save the user's vote and voteId to local storage
        localStorage.setItem(`userVote-${articleID}`, JSON.stringify({ voteLevel, voteID: newVoteId }));
      } else {
        // If the user has already voted, update their vote level
        await handleUpdateVote(userVote.voteID, voteLevel);
      }
    } catch (error) {
      console.error('Error voting article:', error);
    }
  };
  const handleUpdateVote = async (voteId, voteLevel) => {
    try {
      await axios.put(`http://localhost:8080/api/articles/${articleID}/vote/${voteId}`, {
        voteLevel,
      });
      setUserVote((prevVote) => ({ ...prevVote, voteLevel }));
      setSelectedRating(voteLevel);
    } catch (error) {
      console.error('Error updating vote:', error);
    }
  };
  const handleChangeVoteClick = () => {
    // Clear the old vote value and vote ID from local storage when the user clicks "Change Your Vote"
    localStorage.removeItem(`userVote-${articleID}`);
    setUserVote(null);
    setUserVoteId(null); // Reset the userVoteId state
    setSelectedRating(0);
    setHasVoted(false);
  };
  
  useEffect(() => {
    // Function to handle view count when component mounts
    const handleViewCount = async () => {
      try {
        await axios.put(`http://localhost:8080/api/articles/view/${articleID}`);
      } catch (error) {
        console.error('Error updating view count:', error);
      }
    };

    // Call the view count function
    handleViewCount();
  }, [articleID]);
  return (
    <>
      <Row>
        <Col style={{ marginTop: '30px', paddingLeft: '40px' }}>
          Bạn đang ở: Trang Chủ/ Video / <b>Chi Tiết </b>
        </Col>
        <Col xs="auto" className="ml-auto" style={{ marginTop: '30px', marginRight: '40px' }}>
          <Button style={{ fontSize: '20px' }} onClick={handleBack}>
            <IoReturnUpBackSharp />
          </Button>
        </Col>
      </Row>
      <Col xs>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Card>
            <Card.Img variant="top" src={article.photo} />
            <Card.Body>
              <Card.Title>{article.title}</Card.Title>
              <Card.Text>Created Date: {article.createdDate}</Card.Text>
              <Card.Text>Views: {article.articleView}</Card.Text>
              {hasVoted ? (
      <>
        <Box component="fieldset" borderColor="transparent">
          <Rating name="article-rating" value={selectedRating} readOnly />
        </Box>
        {!changeVoteClicked && <Button onClick={handleChangeVoteClick}>Change Your Vote</Button>}
      </>
    ) : (
      <Box component="fieldset" borderColor="transparent">
        <Rating
          name="article-rating"
          value={selectedRating}
          onChange={(event, newValue) => {
            handleVoteArticle(newValue);
          }}
        />
      </Box>
    )}
                  
              <Card.Body>
                <Card.Text style={{ fontSize: '18px' }}>{article.context}</Card.Text>
              </Card.Body>
            </Card.Body>
          </Card>
        )}
      </Col>
      <div>
        {article && <Comments articleId={articleID} />}
      </div>
    </>
  );
}
