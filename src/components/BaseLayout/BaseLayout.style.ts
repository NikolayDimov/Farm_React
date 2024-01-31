import React from "react";
import styled from "styled-components";

export const EditIcon = styled.span`
    cursor: pointer;
    margin-left: 25px;
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: #4285f4;
    border-radius: 50%;
    position: relative;

    &::before,
    &::after {
        content: "";
        position: absolute;
        background-color: #fff;
    }

    &::before {
        width: 2px;
        height: 10px;
        top: 3px;
        left: 7px;
    }

    &::after {
        width: 10px;
        height: 2px;
        top: 7px;
        left: 3px;
    }
`;

// export const DeleteIcon = styled.span`
//     cursor: pointer;
//     color: red;
//     margin-left: auto;
// `;

export const DeleteIcon = styled.span`
    cursor: pointer;
    margin-left: 5px; // Adjust the spacing as needed
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: #ff5722; // Change the color as needed
    border-radius: 50%;
    position: relative;

    &::before,
    &::after {
        content: "";
        position: absolute;
        background-color: #fff; // Change the color as needed
    }

    &::before {
        width: 2px;
        height: 10px;
        top: 3px;
        left: 7px;
        transform: rotate(45deg);
    }

    &::after {
        width: 2px;
        height: 10px;
        top: 3px;
        left: 7px;
        transform: rotate(-45deg);
    }
`;

interface ModalContainerProps {
    confirmation: boolean;
}

export const StyledModalContainer = styled.div<ModalContainerProps>`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border: 1px solid #ccc;
    color: ${(props) => (props.confirmation ? "red" : "black")};
`;

export const ModalContent = styled.div`
    margin-bottom: 20px;
`;

export const ModalActions = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const ModalButton = styled.button`
    margin-left: 10px;
`;

export interface ModalOverlayProps {
    show: boolean;
    confirmation: boolean;
}

export const ModalOverlay = styled.div<ModalOverlayProps>`
    display: ${(props) => (props.show ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`;

export const modalContentStyles = {
    marginBottom: "20px",
};

export const closeButtonStyles = {
    display: "flex",
    justifyContent: "flex-end",
};
