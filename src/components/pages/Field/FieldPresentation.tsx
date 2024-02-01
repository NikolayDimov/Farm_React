import React from "react";
import { Field } from "./Field.static";
// import FieldList from "./FieldList";
import { ModalOverlay, StyledModalContainer, modalContentStyles, closeButtonStyles } from "../../BaseLayout/BaseLayout.style";
import { Farm } from "../Farm/Farm.static";
import { Soil } from "../Soil/Soil.static";
import AddFieldLogic from "./AddField/AddFieldLogic";
import FieldListLogic from "./FieldList/FieldListLogic";

interface FieldPresentationProps {
    fields: Field[];
    farms: Farm[];
    soils: Soil[];
    modalVisible: boolean;
    confirmation: boolean;
    modalMessage: string;
    onDeleteField: (fieldId: string) => void;
    onEditField: (fieldId: string, newFieldName: string, newSoilId: string) => void;
    setModalVisible: (visible: boolean) => void;
    fetchFields: () => void;
}

const FieldPresentation: React.FC<FieldPresentationProps> = ({
    fields,
    farms,
    soils,
    modalVisible,
    confirmation,
    modalMessage,
    onDeleteField,
    onEditField,
    setModalVisible,
    fetchFields,
}) => {
    return (
        <>
            <AddFieldLogic fetchFields={fetchFields} />
            <FieldListLogic fields={fields} farms={farms} soils={soils} onDeleteField={onDeleteField} onEditField={onEditField} />
            <ModalOverlay show={modalVisible} confirmation={false}>
                <StyledModalContainer confirmation={confirmation}>
                    <div style={modalContentStyles}>{confirmation ? "Machine cannot be deleted" : modalMessage}</div>
                    <div style={closeButtonStyles}>
                        <button onClick={() => setModalVisible(false)}>Close</button>
                    </div>
                </StyledModalContainer>
            </ModalOverlay>
        </>
    );
};

export default FieldPresentation;
