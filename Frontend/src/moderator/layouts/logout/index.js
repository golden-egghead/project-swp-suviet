import React, { useEffect } from 'react';

export default function LogoutModerator() {
  useEffect(() => {
    // Clear user data and redirect to the login page
     // Clear cache
    window.location.href = '/'; // Replace '/login' with the desired login page URL
  }, []);

  return null; // This component doesn't need to render anything
}
