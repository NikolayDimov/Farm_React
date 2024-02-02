import React from "react";
import { Crop } from "../Crop.static";
import EditIcon from "../../../BaseLayout/common/icons/EditIcon";
import DeleteIcon from "../../../BaseLayout/common/icons/DeleteIcon";
import { ListContainer, ListHeader, List, ListItem } from "../../../BaseLayout/common/ListStyles";
import { ButtonContainer } from "../../../BaseLayout/common/icons/ButtonContainer";
import { StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from "../../../BaseLayout/BaseLayout.style";
import UserRoleHOC from "../../UserRoleHOC";

interface CropListPresentationProps {
    crops: Crop[];
    onDeleteClick: (cropId: string | undefined) => void;
    onEditClick: (cropId: string | undefined, cropName: string) => void;
    isDeleteModalVisible: boolean;
    isEditModalVisible: boolean;
    currentCropName: string;
    originalCropName: string;
    setCurrentCropName: (cropName: string) => void;
    handleDeleteConfirm: () => void;
    handleDeleteCancel: () => void;
    handleEditConfirm: () => void;
    handleEditCancel: () => void;
}

const CropListPresentation: React.FC<CropListPresentationProps> = ({
    crops,
    onDeleteClick,
    onEditClick,
    isDeleteModalVisible,
    isEditModalVisible,
    currentCropName,
    originalCropName,
    setCurrentCropName,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleEditConfirm,
    handleEditCancel,
}) => {
    return (
        <ListContainer>
            <ListHeader>Crop List</ListHeader>
            <List>
                {Array.isArray(crops) && crops.length > 0 ? (
                    crops.map((crop) => (
                        <ListItem key={crop.id}>
                            {crop.name}
                            <UserRoleHOC>
                                <ButtonContainer>
                                    <EditIcon onClick={() => onEditClick(crop.id, crop.name)} />
                                    <DeleteIcon onClick={() => onDeleteClick(crop.id)} />
                                </ButtonContainer>
                            </UserRoleHOC>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>No crops available</ListItem>
                )}
            </List>

            {/* Edit Modal */}
            <ModalOverlay show={isEditModalVisible} confirmation={false}>
                <StyledModalContainer confirmation={false}>
                    <ModalContent>
                        <p>Current Crop Name: {originalCropName}</p>
                        <input type="text" placeholder="Enter new crop name" value={currentCropName} onChange={(e) => setCurrentCropName(e.target.value)} />
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
                        <p>Are you sure you want to delete this crop?</p>
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

export default CropListPresentation;
