import { useAuth } from "../../../context/AuthContext";
import { NavbarContainer, ContentWrapper, Logo, NavbarButtons, NavbarButton } from "./Navbar.static";

const Navbar = () => {
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
                            <NavbarButton to="/home">Home</NavbarButton>
                            <NavbarButton to="/service">Service</NavbarButton>
                            <NavbarButton to="/report">Report</NavbarButton>
                            <NavbarButton to="/profile">Farms</NavbarButton>
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
