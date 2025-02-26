import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

export const NavbarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
`;

export const ContentWrapper = styled.div`
  margin-top: 52px;
  width: 100%;
  height: calc(100vh - 52px);
  overflow-y: auto;
`;