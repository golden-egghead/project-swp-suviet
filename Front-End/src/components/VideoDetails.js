import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { IoReturnUpBackSharp } from "react-icons/io5";

const VideoDetails = () => {
  const { videoID } = useParams();
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const totalPages = 13; // Số trang tổng cộng trong API
        const promises = [];

        for (let page = 1; page <= totalPages; page++) {
          promises.push(axios.get(`http://localhost:8080/api/videos/${page}`));
        }

        const responses = await Promise.all(promises);
        const videos = [];

        responses.forEach(response => {
          const content = response.data.data.content;
          const foundVideos = content.filter(item => item.videoID == videoID);
          videos.push(...foundVideos);
        });

        setVideo(videos);

      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideo();
  }, [videoID]);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <Row>
        <Col style={{ marginTop: '30px', paddingLeft: '40px' }}>
          Bạn đang ở: Trang Chủ/ Video / <b>Chi Tiết Video</b>
        </Col>
        <Col xs="auto" className="ml-auto" style={{ marginTop: '30px', marginRight:'40px'}}>
          <Button style={{fontSize:'20px'}} onClick={handleBack}>
          <IoReturnUpBackSharp />
          </Button>
        </Col>
      </Row>
      <Col xs>
        <div className="d-flex justify-content-around">
          <Card style={{ width: '80rem', marginTop: '50px',marginBottom:'50px' }}>
            <Card.Body>
            <div className="embed-responsive embed-responsive-16by9">
                        <ReactPlayer
                        url={video.length > 0 && (video[0].video)}
                        className="embed-responsive-item"
                        controls
                    />
            </div>
              <Card.Text>
              {video.length > 0 && (
                  <div dangerouslySetInnerHTML={{ __html: video[0].description }} />
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Col>
    </>
  );
};

export default VideoDetails;


