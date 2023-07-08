// import axios from 'axios';

// const Admin = () => {
//   const handleLogout = () => {
//     // Clear the stored token from local storage
//     localStorage.removeItem('accessToken');
//     // Redirect to login page
//     // window.location.href = '/login';
//   };

//   const handleProtectedRequest = async () => {
//     try {
//       const accessToken = localStorage.getItem('accessToken');
//       const response = await axios.get('http://localhost:8080/api/admin/ban/', {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.log(error);
//       // Handle unauthorized error or token expiration
//     }
//   };

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <button onClick={handleLogout}>Logout</button>
//       <button onClick={handleProtectedRequest}>Make Protected Request</button>
//     </div>
//   );
// };

// export default Admin;
