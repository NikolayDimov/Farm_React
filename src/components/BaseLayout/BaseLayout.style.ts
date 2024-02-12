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
    width: 100%;
    max-width: 1400px;
    margin: 0px auto;
    padding: 15px;
`;

export const SidebarWrapper = styled.div`
    flex: 0 0 150px;
    height: 100%;
    overflow-y: auto;
`;

export const MainContainer = styled.div`
    flex: 1;
    margin-left: 151px;
    padding: 20px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin: 0px auto;
`;
