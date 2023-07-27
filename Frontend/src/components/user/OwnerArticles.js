import React, { useState, useEffect } from 'react';

const OwnerArticles = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchOwnerArticles = async (page) => {
    try {
      const response = await fetch(`http://localhost:8080/api/articles/owner/article/${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched owner articles:', data.data);
        setArticles(data.data);
        setTotalPages(data.total_pages);
      } else {
        // Handle error when fetching owner articles
        console.error('Failed to fetch owner articles');
      }
    } catch (error) {
      console.error('Failed to fetch owner articles', error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    fetchOwnerArticles(currentPage);
  }, [currentPage]);

  if (articles === null) {
    return <div>Loading...</div>;
  }
  const filteredArticles = articles.filter((article) => article.status);
  return (
    <div>
      <h1>Bài viết bạn đã đăng</h1>
      {filteredArticles.length === 0 ? (
        <p>Tạm thời chưa có</p>
      ) : (
        <>
      {filteredArticles.map((article) => (
        <div key={article.articleID}>
          <h2>Title: {article.title}</h2>
          <p>Content: {article.context}</p>
          <p>Created Date: {article.createdDate}</p>
          <p>View: {article.articleView}</p>
          <p>Vote: {article.voteLevel}</p>
          <hr />
        </div>
      ))}
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
      </>
      )}
    </div>
  );
};

export default OwnerArticles;
