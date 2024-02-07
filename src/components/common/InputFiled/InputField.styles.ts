import styled from "styled-components";

export const FormGroup = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

export const LabelForm = styled.label`
    color: black;
    margin-right: 10px;
`;

export const StyledInput = styled.input`
    box-sizing: border-box;
    width: calc(30% - 10px);
    padding: 10px;
    background-color: white;
    border-radius: 5px;
    color: black;
    height: 4vh;
    margin-right: 10px;
`;

export const StyledButton = styled.button`
    width: 15%;
    padding: 8px;
    background-color: #0056b8;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    span {
        font-size: 12px;
        font-weight: bold;
    }
`;

export const ErrorStyles = styled.p`
    color: red;
    font-size: 12px;
    margin-left: 15px;
`;

export const ErrorStylesMachine = styled.p`
    color: red;
    font-size: 12px;
    margin-left: 15px;
`;
