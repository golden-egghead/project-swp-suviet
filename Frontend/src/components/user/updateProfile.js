// import axios from 'axios';
// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const UpdateProfile = () => {
//   const [fullName, setFullName] = useState('');
//   const [image, setImage] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState('');

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError('');

//     try {
//       // Prepare form data for sending to the API
//       const formData = new FormData();
//       formData.append('fullName', fullName);
//       formData.append('image', image);

//       // Get the access token from the localStorage
//       const accessToken = localStorage.getItem('accessToken');

//       // Make an API request to save the profile
//       const response = await axios.post(
//         'http://localhost:8080/api/user/profile/update',
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
//           },
//         }
//       );

//       // Handle the response, e.g., display a success message
//       console.log(response.data);
      
//       // Update the displayed name in the app
//       setFullName(response.data.dto.fullName);
//       localStorage.setItem('fullname', response.data.dto.fullName);
//       // Clear the form inputs and image
//       setFullName('');
//       setImage(null);
//       // Reload the page to reflect the updated name
//       window.location.reload();
//       alert(response.data.message);
//     } catch (err) {
//       // Handle error response from the API
//       setError('An error occurred while saving the profile.');
//       console.error(err);
//       toast.error(err.message);
//     }

//     setIsSubmitting(false);
//   };

//   return (
//     <div>
//       <h2>Update account</h2>
//       {error && <p>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           maxLength={50}
//           placeholder="Name"
//         />
//         <br />
//         <input type="file" accept="image/*" onChange={handleImageChange} />
//         <br />
//         <button type="submit" disabled={isSubmitting}>
//           Save
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateProfile;
