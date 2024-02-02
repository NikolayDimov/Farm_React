import React from "react";
import { Field } from "../Field.static";
import EditIcon from "../../../BaseLayout/common/icons/EditIcon";
import DeleteIcon from "../../../BaseLayout/common/icons/DeleteIcon";
import { ListContainer, ListHeader, List, ListItem } from "../../../BaseLayout/common/ListStyles";
import { ButtonContainer } from "../../../BaseLayout/common/icons/ButtonContainer";
import { StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from "../../../BaseLayout/BaseLayout.style";
import { Soil } from "../../Soil/Soil.static";
import UserRoleHOC from "../../UserRoleHOC";

interface FieldListPresentationProps {
    fields: Field[];
    soils: Soil[];
    findFarmName: (farmId: string) => string;
    findSoilName: (soilId: string) => string;
    onDeleteClick: (fieldId: string | undefined) => void;
    onEditClick: (fieldId: string | undefined, fieldName: string, soilId: string) => void;
    isDeleteModalVisible: boolean;
    isEditModalVisible: boolean;
    currentFieldName: string;
    originalFieldName: string;
    setCurrentFieldName: (fieldName: string) => void;
    selectedSoilId: string;
    setSelectedSoilId: (soilId: string) => void;
    handleDeleteConfirm: () => void;
    handleDeleteCancel: () => void;
    handleEditConfirm: () => void;
    handleEditCancel: () => void;
}

const FieldListPresentation: React.FC<FieldListPresentationProps> = ({
    fields,
    soils,
    findFarmName,
    findSoilName,
    onDeleteClick,
    onEditClick,
    isDeleteModalVisible,
    isEditModalVisible,
    currentFieldName,
    originalFieldName,
    setCurrentFieldName,
    selectedSoilId,
    setSelectedSoilId,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleEditConfirm,
    handleEditCancel,
}) => {
    return (
        <ListContainer>
            <ListHeader>Field List</ListHeader>
            <List>
                {Array.isArray(fields) && fields.length > 0 ? (
                    fields.map((field) => (
                        <ListItem key={field.id}>
                            <strong>Name:</strong> {field.name} |&nbsp;
                            <strong>Farm:</strong> {findFarmName(field.farmId)} |&nbsp;
                            <strong>Soil:</strong> {findSoilName(field.soilId)}
                            <UserRoleHOC>
                                <ButtonContainer>
                                    <EditIcon onClick={() => onEditClick(field.id, field.name, field.soilId)} />
                                    <DeleteIcon onClick={() => onDeleteClick(field.id)} />
                                </ButtonContainer>
                            </UserRoleHOC>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>No fields available</ListItem>
                )}
            </List>

            {/* Edit Modal */}
            <ModalOverlay show={isEditModalVisible} confirmation={false}>
                <StyledModalContainer confirmation={false}>
                    <ModalContent>
                        <p>Current Field Name: {originalFieldName}</p>
                        <input type="text" placeholder="Enter new field name" value={currentFieldName} onChange={(e) => setCurrentFieldName(e.target.value)} />
                        <div>
                            <label>Select Soil:</label>
                            <select value={selectedSoilId} onChange={(e) => setSelectedSoilId(e.target.value)}>
                                <option value="" disabled>
                                    Select Soil
                                </option>
                                {soils.map((soil) => (
                                    <option key={soil.id} value={soil.id}>
                                        {soil.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </ModalContent>
                    <ModalActions>
                        <ModalButton onClick={handleEditConfirm}>Save</ModalButton>
                        <ModalButton onClick={handleEditCancel}>Cancel</ModalButton>
                    </ModalActions>
                </StyledModalContainer>
            </ModalOverlay>

            {/* Delete Modal */}
            <ModalOverlay show={isDeleteModalVisible} confirmation={false}>
                <StyledModalContainer confirmation={false}>
                    <ModalContent>
                        <p>Are you sure you want to delete this field?</p>
                    </ModalContent>
                    <ModalActions>
                        <ModalButton onClick={handleDeleteConfirm}>Yes</ModalButton>
                        <ModalButton onClick={handleDeleteCancel}>No</ModalButton>
                    </ModalActions>
                </StyledModalContainer>
            </ModalOverlay>
        </ListContainer>
    );
};

export default FieldListPresentation;
