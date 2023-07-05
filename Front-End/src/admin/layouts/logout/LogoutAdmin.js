import React, { useEffect } from 'react';

export default function LogoutAdmin() {
  useEffect(() => {
    // Clear user data and redirect to the login page
    localStorage.clear();
    window.location.href = '/'; // Replace '/login' with the desired login page URL
  }, []);

  return null; // This component doesn't need to render anything
}
