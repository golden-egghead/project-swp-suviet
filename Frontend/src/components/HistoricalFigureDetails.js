import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { IoReturnUpBackSharp } from "react-icons/io5";
import Button from 'react-bootstrap/Button';

export default function HistoricalFigureDetails() {

  const { characterID } = useParams();
  const [character, setCharacter] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const totalPages = 10; // Số trang tổng cộng trong API
        const promises = [];

        for (let page = 1; page <= totalPages; page++) {
          promises.push(axios.get(`http://localhost:8080/api/characters/${page}`));
        }

        const responses = await Promise.all(promises);
        const videos = [];

        responses.forEach(response => {
          const content = response.data.data.content;
          const foundVideos = content.filter(item => item.characterID == characterID);
          videos.push(...foundVideos);
        });

        setCharacter(videos);

      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideo();
  }, [characterID]);

  const handleBack = () => {
    window.history.back();
  };

  return (<>
    <div style={{
      backgroundImage: `url('https://vhx.imgix.net/sbtnott/assets/44ad8c03-33f4-44ce-8cec-3e263f0ba586-63b0cf8f.jpeg?auto=format%2Ccompress&fit=crop&h=720&q=75&w=1280')`,
      backgroundRepeat: `no-repeat`,
      backgroundSize: `cover`,
      paddingBottom: `50px`
    }}>
      <Row style={{ backgroundColor: '#fff' }}>
        <Col style={{ marginTop: '30px', paddingLeft: '40px' }}>
          Bạn đang ở: Trang Chủ/ Video / <b>Chi Tiết Nhân Vật</b>
        </Col>
        <Col xs="auto" className="ml-auto" style={{ marginTop: '30px', marginRight: '40px' }}>
          <Button style={{ fontSize: '19px' }} onClick={handleBack}>
            <IoReturnUpBackSharp />
          </Button>
        </Col>
      </Row>
      <Card style={{
        width: '75rem', margin: 'auto',
        background: 'transparent',
        border: '1px solid rgba(137, 133, 133, 0.5)',
        backdropFilter: 'blur(250px)',
        borderRadius: '25px',
        color: '#fff',
        marginTop: '50px',
      }}>
        <Card.Body>
          <Card.Text style={{ fontSize: '20px', color: '#fff', fontWeight: '600'}}>
            {character && character.length > 0 ? (
              <div dangerouslySetInnerHTML={{ __html: character[0].story }} />
            ) : null
            }
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  </>);

}


//     const userCharacter = useParams();
//     const character = .find(obj => {
//     return obj.id == userCharacter.id;
//   });
// {/* {Parser(character.story
//         // , {
//         //   replace: (domNode) => {
//         //     if (domNode.type === 'tag' && domNode.name === 'img') {
//         //       return <img src={domNode.attribs.src} alt={domNode.attribs.alt} />;
//         //     }
//         //   },
//         // }
//         )} */}