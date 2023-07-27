// import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ReactPaginate from 'react-paginate';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import * as React from 'react';
import FilterVideoPage from './FilterVideoPage';


const VideoPage = (props) => {
    const [selectedPeriod, setSelectedPeriod] = useState('');

    const [listVideos, setListVideos] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const fetchData = async (page, searchTerm) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/videos/search/${page}?title=${searchTerm}`);
            setListVideos(response.data.data.content)
            setTotalPages(response.data.total_pages)
            console.log("log:", response)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchVideoDatafromPeriodName = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/period/videos?periodName=${selectedPeriod ? selectedPeriod : '1'}`);
            setListVideos(response.data.data)
            // setTotalPages(response.data.total_pages)
            console.log("log111:", response)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchVideoDatafromPeriodName();
    }, [selectedPeriod]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchTerm = searchParams.get('title') || '';
        setSearchTerm(searchTerm);
        setCurrentPage(1);
        fetchData(1, searchTerm);
    }, [location.search]);

    useEffect(() => {
        sessionStorage.setItem('currentPage', currentPage.toString());
    }, [currentPage]);

    // PAGINATE
    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage);
        fetchData(selectedPage, searchTerm);
        // lưu trạng thái hiện tại
        localStorage.setItem("currentPage", selectedPage);
        // cuộn trang lên giữa
        const containerElement = document.getElementById('container');
        const containerOffsetTop = containerElement.offsetTop;
        const windowHeight = window.innerHeight;
        const scrollToPosition = containerOffsetTop - windowHeight / 8;
        window.scrollTo({ top: scrollToPosition, behavior: 'smooth' })
    }

    // SEARCH
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

        const searchParams = new URLSearchParams(location.title);
        searchParams.set('title', searchTerm);

        navigate(`?${searchParams.toString()}`);
        fetchData(1, searchTerm);
    };

    // const handleChangeSearchTerm = (event) => {
    //     const searchTerm = event.target.value;
    //     setSearchTerm(searchTerm);
    //   };
    // SORT
    const handleSortTitleAscClick = () => {
        let data = [...listVideos];
        if (data.length > 0) {
            let result = data.sort((a, b) => a.title.localeCompare(b.title))
            setListVideos(result);
        }
    }


    const handleSortTitleDescClick = () => {
        let data = [...listVideos];
        if (data.length > 0) {
            let result = data.sort((a, b) => b.title.localeCompare(a.title))
            setListVideos(result);
        }
    }

    //Menu Timeline
    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    //Grid 
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (<>
        <Container className='container-video' fluid={true} id="container" >
            <Row>
                <Col>
                    <div style={{ paddingLeft: '75px' }}>Bạn đang ở: Trang Chủ / <b> Video </b></div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form style={{ maxWidth: '600px', margin: '20px', padding: '30px 1px', marginLeft: '60px' }} className="d-flex" onSubmit={handleSearchSubmit}>
                        <Dropdown>
                            <Dropdown.Toggle style={{ marginRight: '10px' }} id="dropdown-button-dark-example1" variant="secondary">
                                <i className="fa-solid fa-arrow-down-wide-short fa-1x"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu variant="dark">
                                <Dropdown.Item onClick={handleSortTitleAscClick} href="#s=1">Title <i className='fa-solid fa-arrow-down-a-z'></i></Dropdown.Item>
                                <Dropdown.Item onClick={handleSortTitleDescClick} href="#s=2">Title <i className='fa-solid fa-arrow-up-a-z'></i></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form.Control
                            type="search"
                            name="title"
                            placeholder="Tìm kiếm"
                            className="me-2"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={handleSearchSubmit}
                        />
                        <Button variant="contained" color="success">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Button>
                    </Form></Col>
                <Col>
                    <div className="text-header">VIDEO</div>
                </Col>
            </Row>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Item>
                            <Grid container spacing={2}>
                                {listVideos.map(video => (
                                    <Grid item xs={6} key={video.videoID} style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
                                        <Card sx={{ maxWidth: 500, backgroundColor: 'rgba(0,0,0,0.1)' }}>
                                            <CardActionArea>
                                                <ReactPlayer style={{ border: '10px solid #FFC701', }}
                                                    component="video"
                                                    url={video.video}
                                                    alt="video"
                                                    width="500px" // Điều chỉnh chiều rộng của video
                                                    height="300px"
                                                />
                                                <CardContent>
                                                    <Link to={`/video-details/${video.videoID}`} style={{ textDecoration: 'none' }}>
                                                        <Typography>
                                                            <div className='video-title'>
                                                                {video.title}
                                                            </div>
                                                        </Typography>
                                                    </Link>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>

                        </Item>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={totalPages}
                            previousLabel="< previous"

                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination d-flex justify-content-center"
                            activeClassName='active'
                        />
                    </Grid>
                    <Grid item xs={4} container justifyContent="center" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                        <FilterVideoPage setSelectedPeriod={setSelectedPeriod} />
                    </Grid>
                </Grid>
            </Box>
        </Container >
    </>)

}

export default VideoPage;





