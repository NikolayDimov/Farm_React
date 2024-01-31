import styled from "styled-components";

export const DeleteIcon = styled.span`
    cursor: pointer;
    color: red;
    margin-left: auto;
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
