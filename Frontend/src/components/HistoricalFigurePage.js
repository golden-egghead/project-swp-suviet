import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { FcBookmark } from 'react-icons/fc';



const HistoricalFigurePage = (props) => {

  const [listCharacter, setListCharacter] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  // const [hoveredCharacter, setHoveredCharacter] = useState(null);

  const fetchData = async (page, searchTerm) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/characters/search/${page}?title=${searchTerm}`);
      setListCharacter(response.data.data.content)
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
    let data = [...listCharacter];
    if (data.length > 0) {
      let result = data.sort((a, b) => a.characterName.localeCompare(b.characterName))
      setListCharacter(result);
    }
  }


  const handleSortTitleDescClick = () => {
    let data = [...listCharacter];
    if (data.length > 0) {
      let result = data.sort((a, b) => b.characterName.localeCompare(a.characterName))
      setListCharacter(result);
    }
  }

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  //ToolTip
  // const handleMouseEnter = (characterID) => {
  //   setHoveredCharacter(characterID);
  // };

  // const handleMouseLeave = (characterID) => {
  //   setHoveredCharacter(null);
  // };

  return (<>
    <Row>
      <Col>
        <div style={{ paddingLeft: '75px' }}>Bạn đang ở: Trang Chủ / <b>Nhân Vật</b></div>
      </Col>
    </Row>
    <Container fluid={true} id="container">
      <Row>
        <Col>
          <Form style={{ maxWidth: '600px', margin: '20px', padding: '30px 1px', marginLeft: '60px' }} className="d-flex" onSubmit={handleSearchSubmit} >
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
        <Col><div className='text-header'>NHÂN VẬT</div></Col>
      </Row>
      {listCharacter.map((character) => (
        <Paper
          sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 1200,
            flexGrow: 1,
            backgroundColor: 'rgba(180, 180, 180, 0.1)'
          }}
          key={character.characterID}
          style={{ boxShadow: '10px', marginTop: '60px', marginBottom: '50px', borderRadius: '20px' }}
        >
          <Grid container spacing={2}>
            <Grid item>
              <Link to={`/historicalfigure-details/${character.characterID}`} style={{ color: 'white', textDecoration: 'none' }}>
                <ButtonBase sx={{ width: 500, height: 500 }}>
                  <Img style={{ width: 500, height: 500, borderRadius: '20px' }} alt="complex" src={character.image} />
                </ButtonBase>
              </Link>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid style={{ paddingTop: '120px' }} item xs>
                  <Typography style={{ textAlign: 'center', fontWeight: 'bold', color: 'red', fontSize: '30px' }} gutterBottom variant="subtitle1" component="div">
                    {character.characterName}
                  </Typography>
                  <Typography style={{ textAlign: 'left', fontSize: '20px', marginLeft: '40px' }} variant="body2" gutterBottom>
                    {character.description}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography style={{ fontSize: '30px' }} variant="subtitle1" component="div">
                  {<FcBookmark />}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
      {/* </div> */}
    </Container >
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

export default HistoricalFigurePage;