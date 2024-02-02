import React from "react";
import { ListContainer, ListHeader, List, ListItem } from "../../../BaseLayout/common/ListStyles";
import { StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from "../../../BaseLayout/BaseLayout.style";
// import FarmCard from "./FarmCard/FarmCard";
import useFarmList from "./FarmList.logic";
import UserRoleHOC from "../../UserRoleHOC";
import EditIcon from "../../../BaseLayout/common/icons/EditIcon";
import DeleteIcon from "../../../BaseLayout/common/icons/DeleteIcon";
import { ButtonContainer } from "../../../BaseLayout/common/icons/ButtonContainer";
import { Farm as FarmProp } from "../Farm.static";

interface FarmListProps {
    farms: FarmProp[];
    fetchFarms: () => Promise<void>;
    showFarmLocationOnMap: (coordinates: number[] | undefined) => void;
}

const FarmList: React.FC<FarmListProps> = ({ farms, fetchFarms, showFarmLocationOnMap }) => {
    const {
        onDeleteClick,
        onEditClick,
        isDeleteModalVisible,
        isEditModalVisible,
        currentFarmName,
        originalFarmName,
        setCurrentFarmName,
        handleDeleteConfirm,
        handleDeleteCancel,
        handleEditConfirm,
        handleEditCancel,
    } = useFarmList({ fetchFarms });

    return (
        <ListContainer>
            <ListHeader>Farm List</ListHeader>

            {/* <List>
                {Array.isArray(farms) && farms.length > 0 ? (
                    farms.map((farm) => <FarmCard key={farm.id} farm={farm} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />)
                ) : (
                    <ListItem>No farms available</ListItem>
                )}
            </List> */}

            <List>
                {Array.isArray(farms) && farms.length > 0 ? (
                    farms.map((farm) => (
                        <ListItem key={farm.id}>
                            {farm.name}
                            <UserRoleHOC>
                                <ButtonContainer>
                                    <EditIcon onClick={() => onEditClick(farm.id || "", farm.name)} />
                                    <DeleteIcon onClick={() => onDeleteClick(farm.id || "")} />
                                    <button onClick={() => showFarmLocationOnMap(farm.location?.coordinates)}>Show on Map</button>
                                </ButtonContainer>
                            </UserRoleHOC>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>No farms available</ListItem>
                )}
            </List>

            {/* Edit Modal */}
            <ModalOverlay show={isEditModalVisible} confirmation={false}>
                <StyledModalContainer confirmation={false}>
                    <ModalContent>
                        <p>Current Farm Name: {originalFarmName}</p>
                        <input type="text" placeholder="Enter new farm name" value={currentFarmName} onChange={(e) => setCurrentFarmName(e.target.value)} />
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
                        <p>Are you sure you want to delete this farm?</p>
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

export default FarmList;
