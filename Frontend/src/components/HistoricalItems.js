import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
// import Dropdown from 'react-bootstrap/Dropdown';
// import { Link } from 'react-router-dom';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { Link } from 'react-router-dom';


const HistoricalItems = (props) => {

    const [listItems, setListItems] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();


    const fetchData = async (page, searchTerm) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/HistoricalItems/search/${page}?title=${searchTerm}`);
            setListItems(response.data.data.content)
            setTotalPages(response.data.total_pages)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

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
        let data = [...listItems];
        if (data.length > 0) {
            let result = data.sort((a, b) => a.name.localeCompare(b.name))
            setListItems(result);
        }
    }


    const handleSortTitleDescClick = () => {
        let data = [...listItems];
        if (data.length > 0) {
            let result = data.sort((a, b) => b.name.localeCompare(a.name))
            setListItems(result);
        }
    }

    return (<>
    <div className='item-page'>
        <Row>
            <Col>
                <div style={{ paddingLeft: '75px' }}>Bạn đang ở: Trang Chủ / <b>Di Vật - Cổ Vật</b></div>
            </Col>
        </Row>
        <Container fluid={true} id="container">
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
                        <Button variant="btn btn-success"><i className="fa-solid fa-magnifying-glass"></i></Button>
                    </Form></Col>
                <Col><div className='text-header'>Di Vật - Cổ Vật</div></Col>
            </Row>
            <Grid container wrap="wrap">
                {listItems.map(item => (
                    <Box className='item-page-card' key={item.historicalItemID} sx={{ width: 500, my: 5}}>
                        {item ? (
                            <Link to={`/historical-detail/${item.historicalItemID}`} style={{ color: 'white', textDecoration: 'none' }}>
                            <img
                            style={{ width: 500, height: 400, borderRadius: '20px'}}
                            alt={item.name}
                            src={item.photo}
                        />
                        </Link>
                        ) : (
                            <Skeleton variant="rectangular" width={500} height={400} />
                        )}

                        {item ? (
                            <Box sx={{ pr: 2 }}>
                                <Typography style={{ marginTop: '20px', textAlign: 'center', fontSize: '25px', color: 'red' }} gutterBottom variant="body2">
                                    {/* <div className="image-overlay"> */}
                                        {/* <div className="image-title"></div> */}
                                        {item.name}
                                    {/* </div> */}
                                </Typography>
                                <Typography style={{ textAlign: 'center', fontSize: '20px', color: 'red' }} display="block" variant="caption" color="text.secondary">
                                    {item.nation}
                                </Typography>
                                {/* <Typography variant="caption" color="text.secondary">
                                    {`${item.views} • ${item.createdAt}`}
                                </Typography> */}
                            </Box>
                        ) : (
                            <Box sx={{ pt: 0.5 }}>
                                <Skeleton />
                                <Skeleton width="60%" />
                            </Box>
                        )}
                    </Box>
                ))}
            </Grid>
        </Container>
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
            containerClassName="pagination"
            activeClassName='active'
        />
        </div>
    </>)

}

export default HistoricalItems;