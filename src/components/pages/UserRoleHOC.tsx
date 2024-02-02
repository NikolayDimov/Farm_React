import React, { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";

interface UserRoleHOCProps {
    children: ReactNode;
}

const UserRoleHOC: React.FC<UserRoleHOCProps> = ({ children }) => {
    const { user } = useAuth();
    const canUserViewForm = user?.role === "OPERATOR" || user?.role === "OWNER";

    return canUserViewForm ? <>{children}</> : null;
};

export default UserRoleHOC;
