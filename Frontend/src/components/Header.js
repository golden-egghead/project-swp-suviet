
import "bootstrap/dist/css/bootstrap.min.css";

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
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role);
    console.log(localStorage.getItem('role'))
    
  }, []);
  return (<>
    <Navbar expand="lg">
      <Link style={{ color: 'white', textDecoration: 'none' }} to="/">
        <Nav.Link href="#home"><Card.Img style={{ width: '130px', marginLeft: '20px' }} src="assets/image/Logo1.jpg" alt='' /></Nav.Link></Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto">
       
          <NavDropdown title="Phòng Trưng Bày" id="collasible-nav-dropdown">
            <Link style={{ color: 'white', textDecoration: 'none' }} to="/historicalfigure"><NavDropdown.Item href="#historicalfigure">Nhân Vật</NavDropdown.Item></Link>
            <Link style={{ color: 'white', textDecoration: 'none' }} to="/historicalsite"><NavDropdown.Item href="#historicalsite">Di Tích</NavDropdown.Item></Link>
            <Link style={{ color: 'white', textDecoration: 'none' }} to="/historicalitem"><NavDropdown.Item href="#historicalitem">Di Vật-Cổ Vật</NavDropdown.Item></Link>
          </NavDropdown>
          <Link style={{ color: 'white', textDecoration: 'none' }} to="/timeline"><Nav.Link href="#timeline">Dòng lịch sử</Nav.Link></Link>
          <Link style={{ color: 'white', textDecoration: 'none' }} to="/video"><Nav.Link href="#video">Video</Nav.Link></Link>
          <Link style={{ color: 'white', textDecoration: 'none' }} to="/book"><Nav.Link href="#book">Sách</Nav.Link></Link>
          <Link style={{ color: 'white', textDecoration: 'none' }} to="/baiviet"><Nav.Link href="#baiviet">Bài Viết</Nav.Link></Link>
          <Link to="/postarticle"><Nav.Link href="#postarticle"><i class="fa-solid fa-pen-to-square fa-1.5x"></i> Viết bài</Nav.Link></Link>
          {userRole === 'MODERATOR' && (
            
            <Link to="/articlecontrol"><Nav.Link href="#articlecontrol"><i class="fa-solid fa-file-pen"></i></Nav.Link></Link>
            
          )}
        </Nav>
       


        <Login />

      
      </Navbar.Collapse>
    </Navbar>
    
    <Navbar expand="lg">
      <Nav.Link href="#home"></Nav.Link>
      
    </Navbar>

  </>);
}

export default Header;
