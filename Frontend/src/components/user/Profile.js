
import React, { useEffect, useState } from 'react';
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
import profile from './profile.css';

const UserProfile = () => {
  const [fullName, setFullName] = useState('');
  const [updatedFullName, setUpdatedFullName] = useState('');
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const accessToken = localStorage.getItem('accessToken');
  const [isLoading, setIsLoading] = useState(true);

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
      localStorage.setItem('fullname', response.data.dto.fullName);
      localStorage.setItem('avatar', response.data.dto.avatar);
      setImage(response.data.dto.image);
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
      <Row className="mt-4">
          {/* { JSON.stringify(data) } */}

          <Col 
          className='profile-content'
          >
            <Card className='profile' color="dark" inverse>
                <h3> Thông tin tài khoản </h3>
      <p>Full Name: {isEditing ? <input type="text" value={updatedFullName} onChange={(e) => setUpdatedFullName(e.target.value)} maxLength={50} /> : fullName}</p>
      <p>Email: {email}</p>
      <p>Role: {role}</p>
      <p>Avatar:</p> <br />
      {image && <img src={image} alt="Avatar" style={{flex: 1, width: '300px', height: '200px', overflow: 'hidden'}}/>}
      <br />
      {isEditing ? (
        <div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <br />
          <button className='button' type="submit" onClick={handleSubmit}>Save</button>
          <button className='button' type="button" onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <button className='button' type="button" onClick={handleEdit}> <i class="fa-solid fa-gear"></i> Edit </button>
      )}
      </Card>
          </Col>
        </Row>
    </div>
  );
};

export default UserProfile;
