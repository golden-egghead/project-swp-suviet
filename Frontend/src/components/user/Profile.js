
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "react-bootstrap";
import './profile.css';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";

const UserProfile = () => {
  const [fullName, setFullName] = useState('');
  const [updatedFullName, setUpdatedFullName] = useState('');
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const accessToken = localStorage.getItem('accessToken');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role);
    console.log(localStorage.getItem('role'))

  }, []);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const profileData = response.data.data;

        setFullName(profileData.fullName);
        setEmail(profileData.email);
        setImage(profileData.image);
        setRole(profileData.role);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setImage(file);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedFullName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);

    try {
      const formData = new FormData();
      formData.append('fullName', updatedFullName);
      formData.append('image', image);

      const response = await axios.post(
        'http://localhost:8080/api/user/profile/update',
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setFullName(response.data.dto.fullName);
      setImage(response.data.dto.avatar);

      localStorage.setItem('fullname', response.data.dto.fullName);
      localStorage.setItem('avatar', response.data.dto.avatar);
      console.log(response)
      alert(response.data.message);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Row className="mt-4" style={{ display: 'flex', height: '800px' }}>
        {/* { JSON.stringify(data) } */}

        <Col
          className='profile-content'
        >
          <Card className='profile' color="dark" inverse>
            <div>
              {image && <img src={image} alt="Avatar" style={{ flex: 1, width: '300px', height: '200px', overflow: 'hidden' }} />}
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>{fullName}</h3>
              <p style={{fontSize: '20px', textAlign: 'center' }}>{email}</p>
              <p style={{fontSize: '20px', textAlign: 'center' }}>{role}</p>
            </div>
            <div>
                {/* <p>Họ và tên: {isEditing ? <input type="text" value={updatedFullName} onChange={(e) => setUpdatedFullName(e.target.value)} maxLength={50} /> : fullName}</p> */}
                <br />
                {isEditing ? (
                  <div>

                    <div >
                      <label class="custom-file-upload" htmlFor="file">
                        Thay đổi ảnh đại diện
                      </label>
                      <input type="file" id="file" accept="image/*" onChange={handleImageChange} />
                      <p style={{ width: '300px', marginLeft: '10px', marginBottom: '0px', marginTop: '7px' }}>
                        {selectedFile ? selectedFile.name : 'Không có ảnh nào được chọn'}
                      </p>

                    </div>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    <br />
                    <button className='button' type="submit" onClick={handleSubmit}>Lưu thay đổi</button>
                    <button className='button' type="button" onClick={handleCancel}>Hủy</button>
                  </div>
                ) : (
                  <button className='profile-button' type="button" onClick={handleEdit}> <i class="edit-profile-icon fa-solid fa-gear"></i> Chỉnh sửa thông tin cá nhân </button>
                )}

                <div className="profile-nav">
                  <Navbar expand="lg">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                      <Nav className="ms-auto">
                        <Link style={{ color: 'black', textDecoration: 'none' }} to="/ownerarticles">
                          <Nav.Link href="#ownerarticles">Bài viết của bạn</Nav.Link></Link>
                        {userRole === 'MEMBER' && (

                          <Link style={{ color: 'black', textDecoration: 'none' }} to="/userarticlepending">
                            <Nav.Link href="#userarticlepending">Bài viết đang đợi quản trị viên xem xét</Nav.Link></Link>

                        )}

                      </Nav>
                    </Navbar.Collapse>
                  </Navbar>
                </div>
              </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserProfile;
