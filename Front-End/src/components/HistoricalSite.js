    import Button from 'react-bootstrap/Button';
    import Card from 'react-bootstrap/Card';
    import Row from 'react-bootstrap/Row';
    import Col from 'react-bootstrap/Col';
    import Form from 'react-bootstrap/Form';
    import ReactPaginate from 'react-paginate';
    import { useEffect, useState } from 'react';
    import axios from 'axios';
    import Container from 'react-bootstrap/Container';
    import { useNavigate, useLocation } from 'react-router-dom';
    import Dropdown from 'react-bootstrap/Dropdown';
    // import Dropdown from 'react-bootstrap/Dropdown';
    // import { Link } from 'react-router-dom';


    const HistoricalSite = (props) => {

        const [listSites, setListSites] = useState([]);
        const [totalPages, setTotalPages] = useState(0);
        const [currentPage, setCurrentPage] = useState(1);
        const [searchTerm, setSearchTerm] = useState('');
        const navigate = useNavigate();
        const location = useLocation();


        const fetchData = async (page, searchTerm) => {
            try {
                const response = await axios.get(`http://localhost:8080/api/historicalSites/search/${page}?title=${searchTerm}`);
                setListSites(response.data.data.content)
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
            let data = [...listSites];
            if (data.length > 0) {
                let result = data.sort((a, b) => a.historicalSiteName.localeCompare(b.historicalSiteName))
                setListSites(result);
            }
        }


        const handleSortTitleDescClick = () => {
            let data = [...listSites];
            if (data.length > 0) {
                let result = data.sort((a, b) => b.historicalSiteName.localeCompare(a.historicalSiteName))
                setListSites(result);
            }
        }

        return (<>
            <Row>
                <Col>
                    <div style={{ paddingLeft: '75px' }}>Bạn đang ở: Trang Chủ / <b>Di Tích</b></div>
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
                        <Dropdown>
                            <Dropdown.Toggle style={{ marginRight: '10px' }} id="dropdown-button-dark-example1" variant="secondary">
                                <i className="fa-solid fa-filter fa-1x"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu variant="dark">
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
                    <Col><div className='text-header'>Di Tích</div></Col>
                    <Row><h2>Di Tích Lịch Sử</h2></Row>
                </Row>
                <Row>
                    {listSites.map(sites => (
                        <Col sm={12} className='video-container' key={sites.historicalSiteID}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{sites.historicalSiteName}</Card.Title>
                                    <Card.Img src={sites.photo} />
                                    <Card.Text>
                                        <div dangerouslySetInnerHTML={{ __html: sites.description }} />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
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
        </>)

    }

    export default HistoricalSite;