import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavbarContainer = styled.div`
    background-color: #343a40;
`;

export const ContentWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
    padding: 15px;
    padding-right: 30px;
    padding-left: 30px;
`;

export const Logo = styled(Link)`
    color: #fff;
    text-decoration: none;
    font-size: 26px;
`;

export const NavbarButtons = styled.div`
    display: flex;
    gap: 20px;
`;

export const NavbarButton = styled(Link)`
    color: #fff;
    text-decoration: none;
`;
