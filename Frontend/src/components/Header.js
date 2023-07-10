// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import { Link, useLocation } from 'react-router-dom';
// import { Card, Row, Col } from 'react-bootstrap';
// import React, { useState, useEffect } from 'react';
// import ModalLogin from './ModalLogin';
import "bootstrap/dist/css/bootstrap.min.css";
// import SignInPopup from "../components/pages/SignInPopup";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./auth/Login";
import CarouselHomePage from "./CarouselHomePage";

const Header = (props) => {
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = (token) => {
    setLoginPopupOpen(true);
  };

  // const handleButtonClick = () => {
  //   setModelOpen(true);
  // };

  // const handleCloseModel = () => {
  //   setModelOpen(false);
  // };

  useEffect(() => {
    if (location.hash.includes('vinhdanh')) {
      setActiveLink('vinhdanh');
    } else {
      setActiveLink('');
    }
  }, [location]);

  const handleLinkClick = (eventKey) => {
    setActiveLink(eventKey);
  }

  return (<>
    <Navbar expand="lg">
    <Link style={{color:'white', textDecoration:'none'}} to="/">
      <Nav.Link href="#home"><Card.Img style={{width:'130px', marginLeft:'20px'}} src="assets/image/Logo1.jpg" alt='' /></Nav.Link></Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {/* <Nav.Link href="#thoiki">Các Thời Kì</Nav.Link> */}
            <NavDropdown title="Phòng Trưng Bày" id="collasible-nav-dropdown">
              <Link style={{color:'white', textDecoration:'none'}} to="/historicalfigure"><NavDropdown.Item href="#historicalfigure">Nhân Vật</NavDropdown.Item></Link>
              <Link style={{color:'white', textDecoration:'none'}} to="/historicalsite"><NavDropdown.Item href="#historicalsite">Di Tích</NavDropdown.Item></Link>
              <Link style={{color:'white', textDecoration:'none'}} to="/historicalitem"><NavDropdown.Item href="#historicalitem">Di Vật-Cổ Vật</NavDropdown.Item></Link>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Link style={{color:'white', textDecoration:'none'}} to="/video"><Nav.Link href="#video">Video</Nav.Link></Link>
            <Link style={{color:'white', textDecoration:'none'}} to="/book"><Nav.Link href="#book">Sách</Nav.Link></Link>
            <Link style={{color:'white', textDecoration:'none'}} to="/baiviet"><Nav.Link href="#baiviet">Bài Viết</Nav.Link></Link>
            <Link to="/postarticle"><Nav.Link href="#postarticle"><i class="fa-solid fa-pen-to-square fa-1.5x"></i> Viết bài</Nav.Link></Link>
          </Nav>
          {/* <Link onClick={() => setIsOpen(true)}> */}
            {/* <button style={{ backgroundColor: '#FFC701', color: 'black', padding: '10px 30px', borderRadius: '25px', fontWeight:'bold' }} className='btn' onClick={() => setLoginPopupOpen(true)}>
              Tài Khoản 
            </button> */}
            {/* <LoginPopup /> */}


            <Login />

            {/* {isLoginPopupOpen && (
        <LoginPopup onClose={() => setLoginPopupOpen(false)} onLogin={handleLogin} />
      )} */}

          {/* </Link> */}
           {/* <button
            style={{
              backgroundColor: "#FFC701",
              color: "black",
              padding: "10px 30px",
              borderRadius: "25px",
              fontWeight: "bold",
            }}
            className="btn"
            onClick={handleButtonClick}
          >
            Tài Khoản
          </button> */}

          {/* {isModelOpen && <SignInPopup onClick={handleCloseModel} />} */}
        </Navbar.Collapse>
    </Navbar>
    {/* {isOpen && <ModalLogin setIsOpen={setIsOpen} />} */}
    {/* <Row>
            <Col>
            <div className="google-maps">
            <iframe
            src="https://www.google.com/maps/d/embed?mid=1Zxxnsgw7XKbWBOqIsvC0k8K-_HCOVgU&ehbc=2E312F"
            title="map"
            ></iframe>
            </div>
            </Col>
    </Row> */}
    <Navbar expand="lg">
        <Nav.Link href="#home"></Nav.Link>
        {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
        {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
          {/* <Nav className="me-auto">
          <Link style={{color:'white', textDecoration:'none'}} to="/vinhdanh"><Nav.Link
            href="#vinhdanh"
            className={activeLink === 'vinhdanh' ? 'active' : ''}
            onClick={() => handleLinkClick('vinhdanh')}
            >
            VINH DANH
          </Nav.Link></Link> */}
          {/* <Link style={{color:'white', textDecoration:'none'}} to="/game"><Nav.Link
            href="#minigame"
            className={activeLink === 'minigame' ? 'active' : ''}
            onClick={() => handleLinkClick('minigame')}
            >
            BXH THÀNH VIÊN
          </Nav.Link></Link>
          </Nav>
        </Navbar.Collapse> */}
    </Navbar>
    <Card style={{backgroundColor: '#F5F5F5'}}>
    <div>
      <CarouselHomePage />
    </div>
  </Card>
  </>);
}

export default Header;
