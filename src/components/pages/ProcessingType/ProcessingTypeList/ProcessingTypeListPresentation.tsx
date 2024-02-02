import React from "react";
import { ProcessingType } from "../ProcessingType.static";
import EditIcon from "../../../BaseLayout/common/icons/EditIcon";
import DeleteIcon from "../../../BaseLayout/common/icons/DeleteIcon";
import { ListContainer, ListHeader, List, ListItem } from "../../../BaseLayout/common/ListStyles";
import { ButtonContainer } from "../../../BaseLayout/common/icons/ButtonContainer";
import { StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from "../../../BaseLayout/BaseLayout.style";
import { useAuth } from "../../../../context/AuthContext";

interface ProcessingTypeListPresentationProps {
    processingTypes: ProcessingType[];
    onDeleteClick: (processingTypeId: string | undefined) => void;
    onEditClick: (processingTypeId: string | undefined, processingTypeName: string) => void;
    isDeleteModalVisible: boolean;
    isEditModalVisible: boolean;
    currentProcessingTypeName: string;
    originalProcessingTypeName: string;
    setCurrentProcessingTypeName: (processingTypeName: string) => void;
    handleDeleteConfirm: () => void;
    handleDeleteCancel: () => void;
    handleEditConfirm: () => void;
    handleEditCancel: () => void;
}

const ProcessingTypeListPresentation: React.FC<ProcessingTypeListPresentationProps> = ({
    processingTypes,
    onDeleteClick,
    onEditClick,
    isDeleteModalVisible,
    isEditModalVisible,
    currentProcessingTypeName,
    originalProcessingTypeName,
    setCurrentProcessingTypeName,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleEditConfirm,
    handleEditCancel,
}) => {
    const { user } = useAuth();
    const canUserEdit = user?.role === "OPERATOR" || user?.role === "OWNER";

    return (
        <ListContainer>
            <ListHeader>ProcessingType List</ListHeader>
            <List>
                {Array.isArray(processingTypes) && processingTypes.length > 0 ? (
                    processingTypes.map((processingType) => (
                        <ListItem key={processingType.id}>
                            {processingType.name}
                            {canUserEdit && (
                                <ButtonContainer>
                                    <EditIcon onClick={() => onEditClick(processingType.id, processingType.name)} />
                                    <DeleteIcon onClick={() => onDeleteClick(processingType.id)} />
                                </ButtonContainer>
                            )}
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

export default ProcessingTypeListPresentation;
