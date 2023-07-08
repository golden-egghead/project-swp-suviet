import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import PostArticle from '../PostArticle';

const ProtectedRoute = ({ member }) => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        // Redirect to login page if token is not present
        alert('please login first');
        navigate("/");
      } 
    }, []);
  
    return (
      <PostArticle />
    )
  };
  export default ProtectedRoute;