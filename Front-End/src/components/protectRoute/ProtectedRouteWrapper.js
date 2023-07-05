import React, { useEffect } from 'react';
import AdminPage from "../../admin/admin";
import { Routes, Route, useNavigate } from 'react-router-dom';

const ProtectedRouteWrapper = ({ role }) => {
    const navigate = useNavigate();
    useEffect(() => {
      const token = localStorage.getItem('accessToken');
      const userRole = localStorage.getItem('role');
      if (!token) {
        // Redirect to login page if token is not present
        alert('please login first');
        navigate("/");
      } 
      else if (userRole === "ADMIN"){
        navigate("/admin");
      } 
      else if (userRole === "MODERATOR"){
        navigate("/moderator");
      } else {
        alert('You are not authorized to access this page');
        navigate("/")
      }
    }, []);
  
    return (
      <div>
        <AdminPage />
      </div>
    )

  };
  export default ProtectedRouteWrapper;