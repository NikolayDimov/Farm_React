import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const NavbarContainer = styled.div`
  background-color: #343a40;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 15px;
  padding-right: 30px;
  padding-left: 30px;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 26px;
`;

const NavbarButtons = styled.div`
  display: flex;
  gap: 20px;
`;

const NavbarButton = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <NavbarContainer>
      <ContentWrapper>
        <Logo to="/">Your Farm</Logo>
        <NavbarButtons>
          <NavbarButton to="/home">Home</NavbarButton>
          <NavbarButton to="/about">About</NavbarButton>
          <NavbarButton to="/service">Service</NavbarButton>
          <NavbarButton to="/contact">Contact</NavbarButton>

          {!isLoggedIn ? (
            <>
              <NavbarButton to="/login">Login</NavbarButton>
              <NavbarButton to="/register">Register</NavbarButton>
            </>
          ) : (
            <>
              <NavbarButton to="/profile">Profile</NavbarButton>
              <NavbarButton to="/logout" onClick={handleLogout}>
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
