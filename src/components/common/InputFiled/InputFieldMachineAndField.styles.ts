import styled from "styled-components";

export const StyledForm = styled.form`
    display: flex;
    align-items: baseline;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
`;

export const StyledLabel = styled.label`
    margin-bottom: 5px;
`;

export const StyledInput = styled.input`
    box-sizing: border-box;
    width: calc(20% - 10px);
    padding: 10px;
    background-color: white;
    border-radius: 5px;
    color: black;
    height: 4vh;
    margin-right: 10px;
`;

export const StyledSelect = styled.select`
    width: 15%;
    padding: 8px;
    color: black;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
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
