import React from "react";
import EditIcon from "../../../BaseLayout/common/icons/EditIcon";
import DeleteIcon from "../../../BaseLayout/common/icons/DeleteIcon";
import { ListContainer, ListHeader, List, ListItem } from "../../../BaseLayout/common/ListStyles";
import { ButtonContainer } from "../../../BaseLayout/common/icons/ButtonContainer";
import { StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from "../../../BaseLayout/BaseLayout.style";
import UserRoleHOC from "../../UserRoleHOC";
import useSoilList from "./SoilList.logic";
import { Soil as SoilProp } from "../Soil.static";
import useFilter from "../../../../utils/search";
import SearchBar from "../../../BaseLayout/common/searchBar/searchBar";

interface SoilListProps {
    soils: SoilProp[];
    fetchSoils: () => Promise<void>;
}

const SoilList: React.FC<SoilListProps> = ({ soils, fetchSoils }) => {
    const {
        onDeleteClick,
        onEditClick,
        isDeleteModalVisible,
        isEditModalVisible,
        currentSoilName,
        setCurrentSoilName,
        originalSoilName,
        handleDeleteConfirm,
        handleDeleteCancel,
        handleEditConfirm,
        handleEditCancel,
    } = useSoilList({ fetchSoils });

    const { filteredItems, setSearchQuery } = useFilter<SoilProp>({ items: soils });

    return (
        <ListContainer>
            <ListHeader>Soil List</ListHeader>
            <SearchBar placeholder="Search by soil name" onSearch={setSearchQuery} />
            <List>
                {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
                    filteredItems.map((soil) => (
                        <ListItem key={soil.id}>
                            {soil.name}
                            <UserRoleHOC>
                                <ButtonContainer>
                                    <EditIcon onClick={() => onEditClick(soil.id || "", soil.name)} />
                                    <DeleteIcon onClick={() => onDeleteClick(soil.id || "")} />
                                </ButtonContainer>
                            </UserRoleHOC>
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

export default SoilList;
