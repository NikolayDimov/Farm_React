import styled from "styled-components";
import { Link } from "react-router-dom";
import loginImage from "../../../../public/corn_field.webp";

export const AuthLink = styled.div`
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    height: 5vh;
    border-radius: 5px;
    color: #1967c0;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: #e6f3ff;
        cursor: pointer;
    }

    a {
        text-decoration: none;
        color: inherit;
        font-weight: bold;
        height: 5vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const LabelForm = styled.label`
    color: black;
    margin-bottom: 5px;
`;

export const StyledInput = styled.input`
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    background-color: white;
    border-radius: 5px;
    color: black;
    height: 6vh;
`;

export const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
`;

export const LeftPanel = styled.div`
    flex: 1;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 40px;
`;

export const RightPanel = styled.div`
    flex: 1.2;
    background-image: url(${loginImage});
    background-size: cover;
    background-position: center;
`;

export const FormBlock = styled.div`
    max-width: 400px;
    width: 100%;
    margin: 100px auto 0 auto;
`;

export const Title = styled.div`
    text-align: center;
    margin-bottom: 20px;
    color: black;
    font-family: Noto Sans;
    font-size: 1.5em;
`;

export const FormGroup = styled.div`
    margin-bottom: 20px;
    &:first-child {
        margin-bottom: 30px;
    }
`;

export const ErrorStyles = styled.p`
    color: red;
    font-size: 12px;
    position: relative;
    top: -10px;
`;

export const Logo = styled.div`
    font-size: 24px;
    font-weight: lighter;
    color: black;
    margin-bottom: 20px;
`;

export const StyledButton = styled.button`
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    background-color: #0056b8;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 45px;
    margin-bottom: 15px;
    height: 6vh;

    span {
        font-size: 16px;
        font-weight: bold;
    }
`;
