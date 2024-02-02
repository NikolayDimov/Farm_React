import React from "react";
import { useAuth } from "../../../../context/AuthContext";
import { WelcomeUserContainer, WelcomeTitle, UserRoleText } from "./WelcomeUser.styled";

const WelcomeUser: React.FC = () => {
    const { user } = useAuth();

    return (
        <WelcomeUserContainer>
            <WelcomeTitle>Welcome, {user?.email}!</WelcomeTitle>
            <UserRoleText>User role: {user?.role}</UserRoleText>
        </WelcomeUserContainer>
    );
};

export default WelcomeUser;
