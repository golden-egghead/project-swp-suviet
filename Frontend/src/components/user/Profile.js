// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const UserProfile = () => {
// //   const [fullName, setFullName] = useState('');
// //   const [image, setImage] = useState(null);
// //   const [email, setEmail] = useState('');
// //   const [role, setRole] = useState('');
// //   const accessToken = localStorage.getItem('accessToken');

// //   useEffect(() => {
// //     const fetchProfileData = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:8080/api/user/profile', {
// //           headers: {
// //             Authorization: `Bearer ${accessToken}`, 
// //           },
// //         });
// //         const profileData = response.data.dto;

// //         setFullName(profileData.fullName);
// //         setEmail(profileData.email);
// //         setImage(profileData.image);
// //         setRole(profileData.role);
// //       } catch (error) {
// //         console.error('Error fetching user profile:', error);
// //       }
// //     };

// //     fetchProfileData();
// //   }, []);

// //   return (
// //     <div>
// //       <h2>User Profile</h2>
// //       <p>Full Name: {fullName}</p>
// //       <p>Email: {email}</p>
// //       <p>Role: {role}</p>
// //       {image && <img src={image} alt="Profile" />}
// //     </div>
// //   );
// // };

// // export default UserProfile;


// // UserProfile.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const UserProfile = () => {
//   const [fullName, setFullName] = useState('');
//   const [image, setImage] = useState(null);
//   const [email, setEmail] = useState('');
//   const [role, setRole] = useState('');
//   const accessToken = localStorage.getItem('accessToken');

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/user/profile', {
//           headers: {
//             Authorization: `Bearer ${accessToken}`, 
//           },
//         });
//         const profileData = response.data.dto;

//         setFullName(profileData.fullName);
//         setEmail(profileData.email);
//         setImage(profileData.image);
//         setRole(profileData.role);
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//       }
//     };

//     fetchProfileData();
//   }, []);

//   return (
//     <div>
//       <h2>User Profile</h2>
//       <p>Full Name: {fullName}</p>
//       <p>Email: {email}</p>
//       <p>Role: {role}</p>
//       {image && <img src={image} alt="Profile" />}
//     </div>
//   );
// };

// export default UserProfile;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      setImage(null);
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
      <h2>User Profile</h2>
      <p>Full Name: {isEditing ? <input type="text" value={updatedFullName} onChange={(e) => setUpdatedFullName(e.target.value)} maxLength={50} /> : fullName}</p>
      <p>Email: {email}</p>
      <p>Role: {role}</p>
      {image && <img src={image} alt="Profile" />}
      <br />
      {isEditing ? (
        <div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <br />
          <button type="submit" onClick={handleSubmit}>Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <button type="button" onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
};

export default UserProfile;
