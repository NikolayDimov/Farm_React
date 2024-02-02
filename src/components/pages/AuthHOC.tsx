// AuthHOC.tsx

import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserRoleLayout from "../../components/BaseLayout/UserRolelayuot";
import { useAuth } from "../../context/AuthContext";
import { routes } from "../../static/routes";

interface AuthHOCProps {
    children: (params: { allowedRoles: string[]; user: any }) => React.ReactNode;
    allowedRoles: string[];
}

const AuthHOC: React.FC<AuthHOCProps> = ({ children, allowedRoles }) => {
    const { isAuthenticated, user, setIsAuthenticated } = useAuth();
    const navigate = useNavigate();

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
                    Log In
                </button>
            </>
        );
    }

    return (
        <UserRoleLayout>
            {children({ allowedRoles, user })}
            <Outlet />
        </UserRoleLayout>
    );
};

export default AuthHOC;
