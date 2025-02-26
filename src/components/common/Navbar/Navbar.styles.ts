import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavbarContainer = styled.nav`
    background-color: #00205b;
    padding: 12px;
    z-index: 1000;
`;

export const ContentWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Logo = styled(Link)`
    color: #fff;
    text-decoration: none;
    font-size: 26px;
`;

export const NavbarButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 16px;
`;

export const NavbarButton = styled(Link)`
    color: white;
    text-decoration: none;
    padding: 10px;
    margin: 0 5px;
    font-size: 16px;
    text-align: center;

    &:hover {
        background-color: #45a049;
        border-radius: 5px;
        padding: 10px;
    }
`;

export const WelcomeTitle = styled.div`
    color: #fff;
    font-size: 16px;
`;

export const UserRoleText = styled.div`
    font-size: 16px;
    color: white;
    margin-left: auto;
`;
