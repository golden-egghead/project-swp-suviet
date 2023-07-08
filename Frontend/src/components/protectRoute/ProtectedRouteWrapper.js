import React, { useEffect } from 'react';
import AdminPage from "../../admin/admin";
import Moderator from "../../components/moderator2/moderator"
import { Routes, Route, useNavigate } from 'react-router-dom';

const ProtectedRouteWrapper = ({ role }) => {
    const navigate = useNavigate();
    useEffect(() => {
      const token = localStorage.getItem('accessToken');
      const roleName = localStorage.getItem('role');
      if (!token) {
        // Redirect to login page if token is not present
        alert('please login first');
        navigate("/");
      } 
      else if (roleName === "ADMIN"){
        navigate("/admin");
      } 
      else if (roleName === "MODERATOR"){
        navigate("/moderator");
      } else {
        alert('You are not authorized to access this page');
        navigate("/")
      }
    }, []);
  
    return (
      <div>
        <AdminPage />
        <Moderator/>
      </div>
    )

  };
  export default ProtectedRouteWrapper;