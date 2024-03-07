import { useAuth } from "../../../context/AuthContext/AuthContext";
import { routes } from "../../../static/routes";

import { NavbarContainer, ContentWrapper, Logo, NavbarButtons, UserRoleText, WelcomeTitle } from "./Navbar.styles";

const Navbar = () => {
    const { user } = useAuth();
    const { isLoggedIn } = useAuth();

    return (
        <NavbarContainer>
            <ContentWrapper>
                <Logo to={routes.service}>MyFarm</Logo>
                <NavbarButtons>
                    {!isLoggedIn ? (
                        <></>
                    ) : (
                        <>
                            <WelcomeTitle>Welcome, {user?.email}</WelcomeTitle>
                            <UserRoleText>User role: {user?.role}</UserRoleText>
                        </>
                    )}
                </NavbarButtons>
            </ContentWrapper>
        </NavbarContainer>
    );
};

export default Navbar;
