import React, { useState, useEffect } from 'react';
import './article_control.css'
import Card from 'react-bootstrap/Card';

const ReviewArticle = ({ accessToken }) => {
  const [articles, setArticles] = useState([]);

  const fetchPendingArticles = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/articles/pending/1', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched pending articles:', data.data);
        setArticles(data.data);
      } else {
        // Handle error when fetching pending articles
        console.error('Failed to fetch pending articles');
      }
    } catch (error) {
      console.error('Failed to fetch pending articles', error);
    }
  };

  const handleArticleAction = async (articleId, browsed) => {
    try {
      const response = await fetch(`http://localhost:8080/api/articles/browse/${articleId}?browsed=${browsed}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Article action:', data);
        // Update the articles list after approving/rejecting an article
        fetchPendingArticles();
      } else {
        // Handle error when approving/rejecting article
        console.error('Failed to perform article action');
      }
    } catch (error) {
      console.error('Failed to perform article action', error);
    }
  };

  useEffect(() => {
    fetchPendingArticles();
  }, []);

  return (
    <div className='pending-article'>
      <h1 className='pending_h1'>Duyệt Bài Viết</h1>
      {articles.map((article) => (
        <div className='article' key={article.articleID}>
          <h2>{article.title}</h2>
          <p><b>Nội dung:</b> {article.context}</p>
          <p><b>Hình ảnh:</b></p>
          <Card.Img variant="top" src={article.photo} style={{width: '500px', height: '300px', flex: '1'}}/>
          <p><b>Ngày đăng:</b> {article.createdDate}</p>
          <p><b>Trạng thái:</b> {article.status ? 'Đã được duyệt' : 'Đang chờ duyệt'}</p>
          <div className='button-container'>
            <button className='button-approve' onClick={() => handleArticleAction(article.articleID, true)}>Chấp thuận</button>
            <button className='button-reject' onClick={() => handleArticleAction(article.articleID, false)}>Từ chối</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewArticle;
