import React from "react";
import { ProcessingType } from "./ProcessingType.static";
import { ModalOverlay, StyledModalContainer, modalContentStyles, closeButtonStyles } from "../../BaseLayout/BaseLayout.style";
import AddProcessingTypeLogic from "./AddProcessingType/AddProcessingTypeLogic";
import ProcessingTypeListLogic from "./ProcessingTypeList/ProcessingTypeListLogic";

interface ProcessingTypePresentationProps {
    processingTypes: ProcessingType[];
    modalVisible: boolean;
    confirmation: boolean;
    modalMessage: string;
    onDeleteProcessingType: (processingTypeId: string) => void;
    onEditProcessingType: (processingTypeId: string, newProcessingTypeName: string) => void;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    fetchProcessingTypes: () => void;
}

const ProcessingTypePresentation: React.FC<ProcessingTypePresentationProps> = ({
    processingTypes,
    modalVisible,
    confirmation,
    modalMessage,
    onDeleteProcessingType,
    onEditProcessingType,
    setModalVisible,
    fetchProcessingTypes,
}) => {
    return (
        <>
            <AddProcessingTypeLogic fetchProcessingTypes={fetchProcessingTypes} />
            <ProcessingTypeListLogic processingTypes={processingTypes} onDeleteProcessingType={onDeleteProcessingType} onEditProcessingType={onEditProcessingType} />
            <ModalOverlay show={modalVisible} confirmation={false}>
                <StyledModalContainer confirmation={confirmation}>
                    <div style={modalContentStyles}>{confirmation ? "ProcessingType cannot be deleted" : modalMessage}</div>
                    <div style={closeButtonStyles}>
                        <button onClick={() => setModalVisible(false)}>Close</button>
                    </div>
                </StyledModalContainer>
            </ModalOverlay>
        </>
    );
};

export default ProcessingTypePresentation;
