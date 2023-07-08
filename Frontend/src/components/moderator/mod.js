import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModeratorPage = () => {
  // const [articles, setArticles] = useState([]);

  // useEffect(() => {
  //   fetchArticles();
  // }, []);

  // const fetchArticles = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8080/api/articles/pending/1');
  //     setArticles(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleApprove = async (articleID) => {
  //   try {
  //     await axios.post(`http://localhost:8080/api/articles/${articleID}/approve`);
  //     // Optionally, you can remove the approved article from the local state
  //     setArticles((prevArticles) =>
  //       prevArticles.filter((article) => article.articleID !== articleID)
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleReject = async (articleID) => {
  //   try {
  //     await axios.post(`http://localhost:8080/api/browse/${articleID}/browsed `);
  //     // Optionally, you can remove the rejected article from the local state
  //     setArticles((prevArticles) =>
  //       prevArticles.filter((article) => article.articleID !== articleID)
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // return (
  //   <div>
  //     <h2>Moderator Page</h2>
  //     {articles.length === 0 ? (
  //       <p>No articles pending review.</p>
  //     ) : (
  //       <ul>
  //         {articles.map((article) => (
  //           <li key={article.articleID}>
  //             <h3>{article.title}</h3>
  //             <p>{article.context}</p>
  //             <p>Tags: {article.tags.join(', ')}</p>
  //             <button onClick={() => handleApprove(article.articleID)}>Approve</button>
  //             <button onClick={() => handleReject(article.articleID)}>Reject</button>
  //           </li>
  //         ))}
  //       </ul>
  //     )}
  //   </div>
  // );
};

export default ModeratorPage;
