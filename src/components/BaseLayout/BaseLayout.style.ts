import styled from "styled-components";
import servicePageImage from "../../assets/nivaSand.jpg";

export const Container = styled.div`
    width: 90%;
    max-width: 1200px;
    margin: 20px auto;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px;
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
`;
