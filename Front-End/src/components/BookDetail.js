import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IoReturnUpBackSharp } from "react-icons/io5";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';


const BookDetail = () => {
    const { bookID } = useParams();
    const [book, setBook] = useState([]);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const totalPages = 18; // Số trang tổng cộng trong API
                const promises = [];

                for (let page = 1; page <= totalPages; page++) {
                    promises.push(axios.get(`http://localhost:8080/api/Books/${page}`));
                }

                const responses = await Promise.all(promises);
                const videos = [];

                responses.forEach(response => {
                    const content = response.data.data.content;
                    const foundVideos = content.filter(item => item.bookID == bookID);
                    videos.push(...foundVideos);
                });

                setBook(videos);

            } catch (error) {
                console.error('Error fetching video:', error);
            }
        };

        fetchVideo();
    }, [bookID]);

    const handleBack = () => {
        window.history.back();
    };
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    return (
        <>
            <Row>
                <Col style={{ marginTop: '30px', paddingLeft: '40px' }}>
                    Bạn đang ở: Trang Chủ/ Book / <b>Chi Tiết Book</b>
                </Col>
                <Col xs="auto" className="ml-auto" style={{ marginTop: '30px', marginRight: '40px' }}>
                    <Button style={{ fontSize: '20px' }} onClick={handleBack}>
                        <IoReturnUpBackSharp />
                    </Button>
                </Col>
            </Row>

            <Paper
                sx={{
                    p: 2,
                    margin: 'auto',
                    maxWidth: 1400,
                    flexGrow: 1,
                    backgroundColor: 'rgba(180, 180, 180, 0.1)'
                }}
                style={{ boxShadow: '10px', marginTop: '60px', marginBottom: '50px', borderRadius: '20px' }}
            >
                {book && book.length > 0 ? (
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Img style={{ width: 500, height: 500, borderRadius: '20px' }} alt="complex" src={book[0].cover} />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography style={{ fontWeight: 'bold', color: 'red', fontSize: '30px', marginBottom: '20px', textAlign: 'center' }} gutterBottom variant="subtitle1" component="div">
                                {book[0].title}
                            </Typography>
                            <Typography style={{ fontWeight: 'bold', color: 'black', fontSize: '15px', marginBottom: '40px' }} gutterBottom variant="subtitle1" component="div">
                                <b style={{ color: 'red' }}>Tác Giả:</b> {book[0].author}
                            </Typography>
                            <Typography style={{ fontWeight: 'bold', color: 'black', fontSize: '15px', marginBottom: '40px' }} gutterBottom variant="subtitle2" component="div">
                                <b style={{ color: 'red' }}>Năm Xuất Bản:</b> {book[0].yearOfPublication}
                            </Typography>
                            <Typography style={{ fontWeight: 'bold', color: 'black', fontSize: '15px', marginBottom: '40px' }} gutterBottom variant="subtitle3" component="div">
                                <b style={{ color: 'red' }}>Nhà Phát Hành:</b>{book[0].publisher}
                            </Typography>
                            <Typography style={{ fontWeight: 'bold', color: 'black', fontSize: '15px', marginBottom: '40px' }} gutterBottom variant="subtitle4" component="div">
                                <b style={{ color: 'red' }}>Giá:</b> {book[0].price} VND
                            </Typography>
                            <Typography style={{ fontWeight: 'bold', color: 'black', fontSize: '15px', marginBottom: '40px' }} gutterBottom variant="subtitle5" component="div">
                                <b style={{ color: 'red' }}>Số Trang:</b> {book[0].pageNumber}
                            </Typography>
                        </Grid>
                        <div style={{ paddingTop: '30px', paddingLeft: '40px' }}>
                            <Typography style={{ color: 'black', fontSize: '20px', marginBottom: '40px' }} gutterBottom variant="subtitle6" component="div">
                            <div dangerouslySetInnerHTML={{ __html: book[0].description }} />
                            </Typography>
                        </div>
                    </Grid>
                ) : (
                    <Typography>No video available</Typography>
                )}
            </Paper>

        </>
    );
};

export default BookDetail;


