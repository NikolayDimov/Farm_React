import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { BaseLayout } from "./BaseLayout/BaseLayout";
import { useAuthContext } from "../context/AuthContext/AutheContext.hook";
import { routes } from "../static/routes";

export const AuthHOC = ({ children }) => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Logic for is user authenticated
  const isUserAuthenticated = isAuthenticated;

  if (!isUserAuthenticated) {
    return (
      <>
        <h2>Sorry! You are not authenticated</h2>
        <button
          onClick={() => {
            setIsAuthenticated(true);
            navigate(routes.login);
          }}
        >
          LogIn
        </button>
      </>
    );
  }

  return (
    <BaseLayout>
      <h2>Hello user!</h2>
      {children}
      <Outlet />
    </BaseLayout>
  );
};

AuthHOC.propTypes = {
  children: React.Component,
};

export default AuthHOC;
