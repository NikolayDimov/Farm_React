import React from "react";
import { ModalOverlay, StyledModalContainer, modalContentStyles, closeButtonStyles } from "../../BaseLayout/BaseLayout.style";

interface ProcessingPresentationProps {
    modalVisible: boolean;
    confirmation: boolean;
    modalMessage: string;
    setModalVisible: (visible: boolean) => void;
}

const ProcessingPresentation: React.FC<ProcessingPresentationProps> = ({ modalVisible, confirmation, modalMessage, setModalVisible }) => {
    return (
        <ModalOverlay show={modalVisible} confirmation={false}>
            <StyledModalContainer confirmation={confirmation}>
                <div style={modalContentStyles}>{confirmation ? "Processing cannot be deleted" : modalMessage}</div>
                <div style={closeButtonStyles}>
                    <button onClick={() => setModalVisible(false)}>Close</button>
                </div>
            </StyledModalContainer>
        </ModalOverlay>
    );
};

export default ProcessingPresentation;
