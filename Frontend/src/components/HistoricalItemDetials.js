import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IoReturnUpBackSharp } from "react-icons/io5";

const HistoricalItemDetails = () => {
    const { historicalItemID } = useParams();
    const [historicalItem, setHistoricalItem] = useState([]);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const totalPages = 13; // Số trang tổng cộng trong API
                const promises = [];

                for (let page = 1; page <= totalPages; page++) {
                    promises.push(axios.get(`http://localhost:8080/api/HistoricalItems/${page}`));
                }

                const responses = await Promise.all(promises);
                const historicalItems = [];

                responses.forEach(response => {
                    const content = response.data.data.content;
                    const foundHistoricalItems = content.filter(item => item.historicalItemID == historicalItemID);
                    historicalItems.push(...foundHistoricalItems);
                });

                setHistoricalItem(historicalItems);

            } catch (error) {
                console.error('Error fetching video:', error);
            }
        };

        fetchVideo();
    }, [historicalItemID]);

    const handleBack = () => {
        window.history.back();
    };

    return (
        <>
            <Row style={{ height: '3rem' }}>
                <Col>
                    Bạn đang ở: Trang Chủ/ Di Tích - Cổ Vật / <b>Chi Tiết Di Tích - Cổ Vật</b>
                </Col>
                <Col xs="auto" className="ml-auto">
                    <Button style={{ fontSize: '20px' }} onClick={handleBack}>
                        <IoReturnUpBackSharp />
                    </Button>
                </Col>
            </Row>
            <Col xs>
                <div className="d-flex justify-content-around"
                    style={{
                        backgroundImage: `url('https://vhx.imgix.net/sbtnott/assets/44ad8c03-33f4-44ce-8cec-3e263f0ba586-63b0cf8f.jpeg?auto=format%2Ccompress&fit=crop&h=720&q=75&w=1280')`,
                        backgroundRepeat: `no-repeat`,
                        backgroundSize: `cover`,
                        height: `45rem`
                    }}>
                    {historicalItem.length > 0 && (
                    <Card style={{ width: '75rem', margin: `auto`, height: `35rem` }}>
                        <Card.Body style={{ display: 'flex' }}>
                            <img
                                style={{ width: 500, height: 400, borderRadius: '20px', marginTop: '60px', boxShadow: '5px 5px 8px black' }}
                                alt={historicalItem[0].name}
                                src={historicalItem[0].photo}
                            />
                            <Card.Text style={{ width: '50rem', margin: 'auto', paddingLeft:'40px' }}>                              
                                    <div dangerouslySetInnerHTML={{ __html: historicalItem[0].description }} />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    )}
                </div>
            </Col>
        </>
    );
};

export default HistoricalItemDetails;


