import React from "react";
import EditIcon from "../../../BaseLayout/common/icons/EditIcon";
import DeleteIcon from "../../../BaseLayout/common/icons/DeleteIcon";
import { ListContainer, ListHeader, List, ListItem } from "../../../BaseLayout/common/ListStyles";
import { ButtonContainer } from "../../../BaseLayout/common/icons/ButtonContainer";
import { StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from "../../../BaseLayout/BaseLayout.style";
import UserRoleHOC from "../../UserRoleHOC";
import useProcessingTypeList from "./ProcessingTypeList.logic";
import { ProcessingType as ProcessingTypeProp } from "../ProcessingType.static";

interface ProcessingTypeListProps {
    processingTypes: ProcessingTypeProp[];
    fetchProcessingTypes: () => Promise<void>;
}

const ProcessingTypeList: React.FC<ProcessingTypeListProps> = ({ processingTypes, fetchProcessingTypes }) => {
    const {
        onDeleteClick,
        onEditClick,
        isDeleteModalVisible,
        isEditModalVisible,
        currentProcessingTypeName,
        setCurrentProcessingTypeName,
        originalProcessingTypeName,
        handleDeleteConfirm,
        handleDeleteCancel,
        handleEditConfirm,
        handleEditCancel,
    } = useProcessingTypeList({ fetchProcessingTypes });

    return (
        <ListContainer>
            <ListHeader>ProcessingType List</ListHeader>
            <List>
                {Array.isArray(processingTypes) && processingTypes.length > 0 ? (
                    processingTypes.map((processingType) => (
                        <ListItem key={processingType.id}>
                            {processingType.name}
                            <UserRoleHOC>
                                <ButtonContainer>
                                    <EditIcon onClick={() => onEditClick(processingType.id || "", processingType.name)} />
                                    <DeleteIcon onClick={() => onDeleteClick(processingType.id || "")} />
                                </ButtonContainer>
                            </UserRoleHOC>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>No processingTypes available</ListItem>
                )}
            </List>

            {/* Edit Modal */}
            <ModalOverlay show={isEditModalVisible} confirmation={false}>
                <StyledModalContainer confirmation={false}>
                    <ModalContent>
                        <p>Current ProcessingType Name: {originalProcessingTypeName}</p>
                        <input
                            type="text"
                            placeholder="Enter new processingType name"
                            value={currentProcessingTypeName}
                            onChange={(e) => setCurrentProcessingTypeName(e.target.value)}
                        />
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
                        <p>Are you sure you want to delete this processingType?</p>
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

export default ProcessingTypeList;
