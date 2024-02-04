// Modal.style.ts

import styled from "styled-components";

export const ModalOverlay = styled.div<{ show: boolean; confirmation: boolean }>`
    display: ${(props) => (props.show ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`;

export const StyledModalContainer = styled.div<{ confirmation: boolean }>`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: ${(props) => (props.confirmation ? "300px" : "400px")};
    text-align: center;
`;

export const ModalContent = styled.div`
    color: black; // Add this line to set the text color to black
`;

export const ModalActions = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`;

export const ModalButton = styled.button`
    padding: 10px 20px;
    margin: 0 10px;
    cursor: pointer;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    outline: none;
`;
