import React from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

const ModalContainer = styled.div`
    background-color: #ddd;
    padding: 20px;
    margin-top: 20px;
    z-index: 4;
    @media (max-width: 768px) {
        width: 80%;
    }
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    cursor: grab;
    width: 100%;
`;

const CloseButton = styled.button`
    cursor: pointer;
`;

const MinimizeButton = styled.button`
    cursor: pointer;
`;

const CloseMinimizeContainer = styled.div`
    display: flex;
`;

export const BottomBar = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #f0f0f0;
    display: flex;
    justify-content: space-evenly;
    padding: 10px;
    z-index: 5;
`;

export const MinimizedTableButton = styled.button`
    cursor: pointer;
    padding: 8px 16px;
    font-size: 14px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 4px;
    margin-right: 8px;

    &:hover {
        background-color: #45a049;
    }
`;

export const GenerateTableButton = styled.button`
    padding: 10px;
    margin-right: 10px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #2980b9;
    }
`;

interface ModalProps {
    modalName: string;
    onClose: () => void;
    onMinimize: () => void;
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalName, onClose, onMinimize, children }) => (
    <Draggable handle=".modal-header" defaultPosition={{ x: 0, y: 0 }}>
        <Resizable width={800} height={600} minConstraints={[200, 100]} maxConstraints={[800, 600]}>
            <ModalContainer>
                <ModalHeader className="modal-header">
                    <div>{modalName}</div>
                    <CloseMinimizeContainer>
                        <MinimizeButton onClick={onMinimize}>Minimize</MinimizeButton>
                        <CloseButton onClick={onClose}>Close</CloseButton>
                    </CloseMinimizeContainer>
                </ModalHeader>

                <>{children}</>
            </ModalContainer>
        </Resizable>
    </Draggable>
);

export default Modal;
