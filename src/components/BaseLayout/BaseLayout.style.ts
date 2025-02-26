import styled, { createGlobalStyle } from "styled-components";
import servicePageImage from "../../assets/nivaSand.jpg";

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Noto Sans', sans-serif;
    display: block;
    margin: 0;
  }
`;

export const PageWrapper = styled.div`
    display: flex;
`;

export const BackgroundImage = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${servicePageImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    z-index: -1;
`;

export const Container = styled.div`
  flex: 1;
  padding: 15px;
  margin-left: 180px; 
  overflow: hidden
`;

export const SidebarWrapper = styled.div`
  position: fixed;
  left: 0;
  width: 180px;
  z-index: 10;
  padding-bottom: 40px;
`;

export const MainContainer = styled.div`
    flex: 1;
    margin-left: 151px;
    padding: 20px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin: 0px auto;
    overflow-y: auto;
`;
