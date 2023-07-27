import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import Carousel from 'react-bootstrap/Carousel';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';


function BookPage(props) {

    const [listBooks, setListBooks] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const fetchData = async (page, searchTerm) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/Books/search/${page}?title=${searchTerm}`);
            setListBooks(response.data.data.content)
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
        let data = [...listBooks];
        if (data.length > 0) {
            let result = data.sort((a, b) => a.title.localeCompare(b.title))
            setListBooks(result);
        }
    }


    const handleSortTitleDescClick = () => {
        let data = [...listBooks];
        if (data.length > 0) {
            let result = data.sort((a, b) => b.title.localeCompare(a.title))
            setListBooks(result);
        }
    }

    return (<>
        <Row>
            <Col>
                <div style={{ paddingLeft: '75px' }}>Bạn đang ở: Trang Chủ / <b> Sách </b></div>
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
                <Col><div className='text-header'>SÁCH</div></Col>
            </Row>


            {/* <Row style={{ margin: '20px' }}>
                {listBooks.map(books => (
                    <Col key={books.bookID} xs>
                        <div className="d-flex justify-content-around">
                            <Card style={{ width: '28rem' }}>
                                <Card.Img variant="top" src={books.cover} />
                                <Card.Body>
                                    <Card.Title>{books.title}</Card.Title>
                                    <Card.Title>{books.author}</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                ))}

            </Row> */}

            <div className='book-items container-fluid mt-5'>
                <div className='row'>
                    {listBooks.map(books => (
                        <div key={books.bookID} className='col-12 col-md-4'>
                            <div style={{ boxShadow: '5px 5px 8px black', borderRadius:'20px', margin: '0 10px 20px', backgroundColor:'rgba(255, 217, 102, 0.2'}} className='row my-5'>
                                <div className='item1 col-12 my-5'>
                                    <div className='row Item-inside'>
                                        <div className='col-12 col-md-4 img-div'>
                                            <img src={books.cover} alt='bookPic' className='img-fluid' style={{ width:'220px', height: '250px', borderRadius:'20px' }} />
                                        </div>
                                        <div className='col-12 col-md-8'>
                                            <div className='main-title pt-4 pb-3'>
                                                <h2 style={{ fontSize: '22px', fontWeight: 'bold', textTransform: 'uppercase'}}>{books.title}</h2>
                                                <i style={{fontWeight:'bold', color:'red'}}>{books.author}</i>
                                            </div>
                                            <div className='menu-year-book'>
                                                <div style={{ marginBottom: '10px' }} className='year-book-divide d-flex justify-content-between'>
                                                    <h3 style={{ fontSize: '20px', fontWeight: '400', color: '#4db6ac' }}>{books.yearOfPublication}</h3>
                                                    <Link to={`/book-details/${books.bookID}?page=${currentPage}`} style={{ textDecoration: 'none' }}>
                                                        <button style={{ backgroundColor: '#4db6ac', border: 'none', marginRight:'30px'}} className='btn btn-primary'>Xem Thêm</button>
                                                    </Link>
                                                </div>
                                                <p style={{fontSize:'20px'}}>{books.publisher}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
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
        </Container>
    </>);

}

export default BookPage;