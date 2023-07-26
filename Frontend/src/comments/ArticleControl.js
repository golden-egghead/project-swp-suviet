import React, { useState, useEffect } from 'react';
import './article_control.css'

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
    <div>
      <h1 className='pending_h1'>Pending Articles</h1>
      {articles.map((article) => (
        <div className='article' key={article.articleID}>
          <h2>Title: {article.title}</h2>
          <p><b>Content:</b> {article.context}</p>
          <p><b>Created Date:</b> {article.createdDate}</p>
          <p><b>Status:</b> {article.status ? 'Approved' : 'Pending'}</p>
          <p><b>Enabled:</b> {article.enabled ? 'Yes' : 'No'}</p>
          <div className='button-container'>
            <button className='button-approve' onClick={() => handleArticleAction(article.articleID, true)}>Approve</button>
            <button className='button-reject' onClick={() => handleArticleAction(article.articleID, false)}>Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewArticle;
