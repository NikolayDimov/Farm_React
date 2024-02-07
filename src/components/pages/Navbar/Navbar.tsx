import { useAuth } from "../../../context/AuthContext";

import { NavbarContainer, ContentWrapper, Logo, NavbarButtons, NavbarButton, UserRoleText, WelcomeTitle } from "./Navbar.styles";

const Navbar = () => {
    const { user } = useAuth();
    const { isLoggedIn, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <NavbarContainer>
            <ContentWrapper>
                <Logo to="/">MyFarm</Logo>
                <NavbarButtons>
                    {!isLoggedIn ? (
                        <></>
                    ) : (
                        <>
                            <WelcomeTitle>Welcome, {user?.email}</WelcomeTitle>
                            <UserRoleText>User role: {user?.role}</UserRoleText>
                            <NavbarButton to="/home">Contacts</NavbarButton>
                            <NavbarButton to="/service">Service</NavbarButton>
                            <NavbarButton to="/" onClick={handleLogout}>
                                Logout
                            </NavbarButton>
                        </>
                    )}
                </NavbarButtons>
            </ContentWrapper>
        </NavbarContainer>
    );
};

export default Navbar;
