import React, { useState } from "react";
import EditIcon from "../../../BaseLayout/common/icons/EditIcon";
import DeleteIcon from "../../../BaseLayout/common/icons/DeleteIcon";
import DetailsIcon from "../../../BaseLayout/common/icons/DetailsIcon";
import { ListContainer, ListHeader, List, ListItem } from "../../../BaseLayout/common/ListStyles";
import { ButtonContainer } from "../../../BaseLayout/common/icons/ButtonContainer";
import { StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from "../../../BaseLayout/BaseLayout.style";
import UserRoleHOC from "../../UserRoleHOC";
import useCropList from "../CropList/CropList.logic";
import { Crop as CropProp } from "../Crop.static";
import useFilter from "../../../../utils/search";
import SearchBar from "../../../BaseLayout/common/searchBar/searchBar";

interface CropListProps {
    crops: CropProp[];
    fetchCrops: () => Promise<void>;
}

const CropList: React.FC<CropListProps> = ({ crops, fetchCrops }) => {
    const {
        onDeleteClick,
        onEditClick,
        onDetailsClick,
        isDeleteModalVisible,
        isEditModalVisible,
        isDetailsModalVisible,
        currentCropName,
        setCurrentCropName,
        originalCropName,
        handleDeleteConfirm,
        handleDeleteCancel,
        handleEditConfirm,
        handleEditCancel,
        handleDetailsCancel,
        cropDetails,
    } = useCropList({ fetchCrops });

    const { filteredItems, setSearchQuery } = useFilter<CropProp>({ items: crops });

    return (
        <ListContainer>
            <ListHeader>Crop List</ListHeader>
            <SearchBar placeholder="Search by crop name" onSearch={setSearchQuery} />
            <List>
                {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
                    filteredItems.map((crop) => (
                        <ListItem key={crop.id}>
                            {crop.name}
                            <UserRoleHOC>
                                <ButtonContainer>
                                    <DetailsIcon onClick={() => onDetailsClick(crop.id || "")} />
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

            {/* Details Modal */}
            <ModalOverlay show={isDetailsModalVisible} confirmation={false}>
                <StyledModalContainer confirmation={false}>
                    <ModalContent>
                        <p>Crop Details: {originalCropName}</p>
                        {cropDetails && (
                            <div>
                                <p>ID: {cropDetails.id}</p>
                                <p>Created At: {cropDetails.created_at}</p>
                                <p>Deleted At: {cropDetails.deleted_at}</p>
                            </div>
                        )}
                    </ModalContent>
                    <ModalActions>
                        <ModalButton onClick={handleDetailsCancel}>Close</ModalButton>
                    </ModalActions>
                </StyledModalContainer>
            </ModalOverlay>
        </ListContainer>
    );
};

export default CropList;
