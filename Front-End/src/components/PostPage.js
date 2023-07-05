import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate, useLocation } from 'react-router-dom';


function PostPage(props) {

    const [listPosts, setListPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();


    const fetchData = async (page, searchTerm) => {
        try {   
            const response = await axios.get(`http://localhost:8080/api/articles/${page}`);
            setListPosts(response.data.data)
            setTotalPages(response.data.totalPage)
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
    const handleSortViewAscClick = () => {
        let data = [...listPosts];
        if (data.length > 0) {
            let result = data.sort((a, b) => a.articleView - b.articleView);
            setListPosts(result);
        }
    }

    const handleSortViewDescClick = () => {
        let data = [...listPosts]
        if (data.length > 0) {
            let result = data.sort((a, b) => b.articleView - a.articleView)
            setListPosts(result)
        }
    }

    const handleSortTitleAscClick = () => {
        let data = [...listPosts];
        if (data.length > 0) {
            let result = data.sort((a, b) => a.title.localeCompare(b.title))
            setListPosts(result);
        }
    }

    const handleSortTitleDescClick = () => {
        let data = [...listPosts];
        if (data.length > 0) {
            let result = data.sort((a, b) => b.title.localeCompare(a.title))
            setListPosts(result);
        }
    }

    return (<>
        <Row>
            <Col>
                <div style={{ paddingLeft: '75px' }}>Bạn đang ở: Trang Chủ / <b> Bài viết</b></div>
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
                                <Dropdown.Item onClick={handleSortViewDescClick} href="#s=1">View <i className='fa-solid fa-arrow-down-long'></i></Dropdown.Item>
                                <Dropdown.Item onClick={handleSortViewAscClick} href="#s=2">View <i className='fa-solid fa-arrow-up-long'></i></Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleSortTitleAscClick} href="#s=3">Title <i className='fa-solid fa-arrow-down-a-z'></i></Dropdown.Item>
                                <Dropdown.Item onClick={handleSortTitleDescClick} href="#s=4">Title <i className='fa-solid fa-arrow-up-a-z'></i></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle style={{ marginRight: '10px' }} id="dropdown-button-dark-example1" variant="secondary">
                                <i className="fa-solid fa-filter fa-1x"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu variant="dark">
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form.Control
                            type="search"
                            placeholder="Tìm kiếm"
                            className="me-2"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={handleSearchSubmit}
                        />
                        <Button variant="btn btn-success"><i className="fa-solid fa-magnifying-glass"></i></Button>
                    </Form></Col>
                <Col><div className='text-header'>BÀI VIẾT</div></Col>
            </Row>
            <Row >
            </Row>
            <Container fluid={true}>
                <Row style={{ margin: '20px' }}>
                    {listPosts.map(post => (
                        <Col key={post.articleID} xs>
                            <div className="d-flex justify-content-around">
                                <Card style={{ width: '28rem' }}>
                                <Link to={`/postdetails/${post.articleID}`} style={{ textDecoration: 'none' }}>
                                     <Card.Img variant="top" src={post.photo} /> </Link>
                                    <Card.Body>
                                        <Card.Title>{post.title}</Card.Title>
                                    </Card.Body>
                                    <Card>View: {post.articleView}</Card>
                                    <Card>Date: {post.createdDate}</Card>
                                </Card>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
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
    </>);

}

export default PostPage;