import React from "react";
import { ModalOverlay, StyledModalContainer, ModalContent, ModalActions, ModalButton } from "./Modal.style";

interface ModalProps {
    isVisible: boolean;
    hideModal: () => void;
    onConfirm?: () => void;
    showConfirmButton?: boolean;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isVisible, hideModal, onConfirm, showConfirmButton = true, children }) => {
    return (
        <ModalOverlay $show={isVisible} $confirmation={showConfirmButton}>
            <StyledModalContainer $confirmation={showConfirmButton}>
                <ModalContent>{children}</ModalContent>
                <ModalActions>
                    {showConfirmButton && (
                        <ModalButton
                            onClick={() => {
                                onConfirm && onConfirm();
                                hideModal();
                            }}
                        >
                            Confirm
                        </ModalButton>
                    )}
                    <ModalButton onClick={hideModal}>Close</ModalButton>
                </ModalActions>
            </StyledModalContainer>
        </ModalOverlay>
    );
};

export default Modal;
