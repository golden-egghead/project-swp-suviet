

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${authToken}`, // Replace authToken with your actual authentication token
          },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchProfileData();
  }, []);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{profileData.name}</h1>
      <p>Email: {profileData.email}</p>
      <p>Bio: {profileData.bio}</p>
      {/* Render other profile information as needed */}
    </div>
  );
};

export default UserProfile;


