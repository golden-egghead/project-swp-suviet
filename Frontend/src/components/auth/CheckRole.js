import React from 'react';

function CheckRole() {
  // Retrieve the user's role from localStorage
  const userRole = localStorage.getItem('userRole');

  // Check the user's role and conditionally render or handle access
  if (userRole === 'ADMIN' ) {
    return <div>This is an admin-only component.</div>;
  } else {
    return <div>Access denied.</div>;
  }
}

export default CheckRole;
