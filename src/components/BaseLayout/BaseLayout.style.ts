import styled from "styled-components";
import servicePageImage from "../../assets/nivaSand.jpg";

export const Container = styled.div`
    width: 94%;
    max-width: 1400px;
    margin: 20px auto;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

export const MapWrapper = styled.div`
    width: 100%;
    height: 400px;
    margin-bottom: 20px;
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
    /* filter: blur(2px); */
`;

const PageContainer = styled.div`
    display: flex;
    overflow: hidden;
`;

const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 150px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 2;
    height: 100vh;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const TopButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

export const BottomButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

const SidebarButton = styled.button`
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 5px 10px 5px 10px;
    cursor: pointer;
    z-index: 4;
    &:hover {
        background-color: #ccc;
    }
`;

const Content = styled.div`
    flex-grow: 1;
    position: relative;
`;

const MainContent = styled.div`
    margin: 20px;
`;

export { PageContainer, Sidebar, SidebarButton, Content, Container as MainContent };
