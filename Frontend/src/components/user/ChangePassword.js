// import axios from 'axios';
// import React, { useState, useEffect, useContext, useRef } from 'react';

// const ChangePassword = () => {


//   // const [mail, setMail] = useState('');

//   // const [oldPassword, setOldPassword] = useState([]);
//   // const [newPassword, setNewPassword] = useState([]);
//   // const [isSubmitting, setIsSubmitting] = useState(false);
//   // const [error, setError] = useState('');


//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setIsSubmitting(true);
//   //   setError('');

//   //   try {
//   //     // Prepare form data for sending to the API
//   //     const formData = new FormData();
//   //     formData.append('mail', mail);
//   //     formData.append('oldPassword', oldPassword);
//   //     formData.append('newPassword', newPassword);  

//   //     // Make an API request to save the article
//   //     const xhr = new XMLHttpRequest();
//   //     xhr.open('PUT', 'http://localhost:8080/api/user/change_password');
//   //     xhr.send(formData);

//   //     // Handle the response, e.g., display a success message
//   //     xhr.onreadystatechange = function () {
//   //       if (xhr.readyState === 4) {
//   //         if (xhr.status === 200) {
//   //           console.log(xhr.responseText);
//   //         } else {
//   //           setError('An error occurred while saving the article.');
//   //           console.error(xhr.responseText);
//   //         }
//   //       }
//   //     };

//   //     // Clear the form inputs and images
//   //     setOldPassword('');
//   //     setNewPassword('');
//   //     setMail('');

//   //   } catch (err) {
//   //     // Handle error response from the API
//   //     setError('An error occurred while saving the article.');
//   //     console.error(err);
//   //   }

//   //   setIsSubmitting(false);
//   // };


//   // Get the form element
// const form = document.getElementById('changePasswordForm');

// // Add a submit event listener to the form
// form.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   // Get the user input values
//   const email = document.getElementById('email').value;
//   const oldPassword = document.getElementById('oldPassword').value;
//   const newPassword = document.getElementById('newPassword').value;

//   // Prepare the request payload
//   const payload = {
//     mail: email,
//     oldPassword: oldPassword,
//     newPassword: newPassword
//   };

//   try {
//     // Send a PUT request to the backend API
//     const response = await fetch('http://localhost:8080/api/user/change_password', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Include the access token from localStorage
//       },
//       body: JSON.stringify(payload)
//     });

//     // Check if the request was successful
//     if (response.ok) {
//       alert('Password changed successfully!');
//       // You can redirect the user to another page or perform any other action here
//     } else {
//       const errorData = await response.json();
//       alert(`Error: ${errorData.message}`);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     alert('An error occurred. Please try again.');
//   }
// });

//   return (
//     <div>
//       <h2>change password</h2>
//       {error && <p>{error}</p>}
//       <form onSubmit={handleSubmit}>
//       <input
//           type="text"
//           value={mail}
//           onChange={(e) => setMail(e.target.value)}
//           maxLength={50}
//           placeholder="mail"
//           required
//         />
//         <input
//           type="text"
//           value={oldPassword}
//           onChange={(e) => setOldPassword(e.target.value)}
//           maxLength={50}
//           placeholder="pass"
//           required
//         />
//         <input
//           type="text"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           maxLength={50}
//           placeholder="pass"
//           required
//         />
//         <button type="submit" disabled={isSubmitting}>
//           Save
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChangePassword;


import axios from 'axios';
import React, { useState } from 'react';
import './profile.css';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the request payload
    const payload = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    };

    try {
      // Send a PUT request to the backend API
      const response = await axios.put('http://localhost:8080/api/user/change_password', payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Include the access token from localStorage
        }
      });

      // Check if the request was successful
      if (response.status === 200) {
        console.log(response.data);
        alert(response.data.message);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        // You can redirect the user to another page or perform any other action here
      } else {
        setError('Có lỗi xảy ra, vui lòng thực hiện lại!');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('Có lỗi xảy ra, vui lòng thực hiện lại!' + error.message);
    }
  };

  return (
    <div className='wrapper_change-password'>
      <div className='change-password_main'>
      <h2>Đặt lại mật khẩu</h2>
      {error && <p>{error}</p>}
      <div className='change-password'>
        <form className='change-password_form' onSubmit={handleSubmit}>

          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            maxLength={50}
            placeholder="Mật khẩu cũ"
            required
          />
          <br />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            maxLength={50}
            placeholder="Mật khẩu mới"
            required
          />
          <br />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            maxLength={50}
            placeholder="Xác nhận lại mật khẩu"
            required
          />
          <br />
          <button className='btnSave' style={{ backgroundColor: '#FFC701', color: 'black', padding: '10px 30px', borderRadius: '25px', fontWeight: 'bold' }} type="submit" disabled={isSubmitting}>
            Lưu
          </button>
        </form>
      </div>

    </div>
    </div>
  );
};

export default ChangePassword;
