import React, { use } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const RequireAuth = ({ children, allowedRoles = null, redirectTo = "/" }) => {
  const location = useLocation();
  const authContext = use(AuthContext);
  const user = authContext?.user;
  const role = authContext?.role;
  const loading = authContext?.loading;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-amber-50 text-stone-600">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default RequireAuth;
