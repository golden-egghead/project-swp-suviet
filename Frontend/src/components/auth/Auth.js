
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authProvider";

import React from "react";

const Auth = ({ allowedRoles }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  return allowedRoles.find((roleID) => auth.roleID.includes(roleID)) ? (
    <Outlet />
  ) : auth?.mail ? (
    <Navigate to="/baiviet" state={{ from: location }} replace />
  ) : (
    <Navigate to="/postarticle" state={{ from: location }} replace />
  );
};

export default Auth;