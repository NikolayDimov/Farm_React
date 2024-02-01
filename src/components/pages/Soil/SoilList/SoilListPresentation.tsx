import React from "react";
import { Soil } from "../Soil.static";
import EditIcon from "../../../BaseLayout/common/icons/EditIcon";
import DeleteIcon from "../../../BaseLayout/common/icons/DeleteIcon";
import { ListContainer, ListHeader, List, ListItem } from "../../../BaseLayout/common/ListStyles";
import { ButtonContainer } from "../../../BaseLayout/common/icons/ButtonContainer";
import { StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from "../../../BaseLayout/BaseLayout.style";

interface SoilListPresentationProps {
    soils: Soil[];
    onDeleteClick: (soilId: string | undefined) => void;
    onEditClick: (soilId: string | undefined, soilName: string) => void;
    isDeleteModalVisible: boolean;
    isEditModalVisible: boolean;
    currentSoilName: string;
    originalSoilName: string;
    setCurrentSoilName: (soilName: string) => void;
    handleDeleteConfirm: () => void;
    handleDeleteCancel: () => void;
    handleEditConfirm: () => void;
    handleEditCancel: () => void;
}

const SoilListPresentation: React.FC<SoilListPresentationProps> = ({
    soils,
    onDeleteClick,
    onEditClick,
    isDeleteModalVisible,
    isEditModalVisible,
    currentSoilName,
    originalSoilName,
    setCurrentSoilName,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleEditConfirm,
    handleEditCancel,
}) => {
    return (
        <ListContainer>
            <ListHeader>Soil List</ListHeader>
            <List>
                {Array.isArray(soils) && soils.length > 0 ? (
                    soils.map((soil) => (
                        <ListItem key={soil.id}>
                            {soil.name}
                            <ButtonContainer>
                                <EditIcon onClick={() => onEditClick(soil.id, soil.name)} />
                                <DeleteIcon onClick={() => onDeleteClick(soil.id)} />
                            </ButtonContainer>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>No soils available</ListItem>
                )}
            </List>

            {/* Edit Modal */}
            <ModalOverlay show={isEditModalVisible} confirmation={false}>
                <StyledModalContainer confirmation={false}>
                    <ModalContent>
                        <p>Current Soil Name: {originalSoilName}</p>
                        <input type="text" placeholder="Enter new soil name" value={currentSoilName} onChange={(e) => setCurrentSoilName(e.target.value)} />
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
                        <p>Are you sure you want to delete this soil?</p>
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

export default SoilListPresentation;
