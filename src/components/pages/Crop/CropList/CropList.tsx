import React from "react";
import EditIcon from "../../../BaseLayout/common/icons/EditIcon";
import DeleteIcon from "../../../BaseLayout/common/icons/DeleteIcon";
import { ListContainer, ListHeader, List, ListItem } from "../../../BaseLayout/common/ListStyles";
import { ButtonContainer } from "../../../BaseLayout/common/icons/ButtonContainer";
import { StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from "../../../BaseLayout/BaseLayout.style";
import UserRoleHOC from "../../UserRoleHOC";
import useCropList from "../CropList/CropList.logic";
import { Crop as CropProp } from "../Crop.static";

interface CropListProps {
    crops: CropProp[];
    fetchCrops: () => Promise<void>;
}

const CropList: React.FC<CropListProps> = ({ crops, fetchCrops }) => {
    const {
        onDeleteClick,
        onEditClick,
        isDeleteModalVisible,
        isEditModalVisible,
        currentCropName,
        setCurrentCropName,
        originalCropName,
        handleDeleteConfirm,
        handleDeleteCancel,
        handleEditConfirm,
        handleEditCancel,
    } = useCropList({ fetchCrops });

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
                                    <EditIcon onClick={() => onEditClick(crop.id || "", crop.name)} />
                                    <DeleteIcon onClick={() => onDeleteClick(crop.id || "")} />
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

export default CropList;
