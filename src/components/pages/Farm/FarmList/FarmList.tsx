import React from "react";
import { ListContainer, ListHeader, List, ListItem } from "../../../common/ListStyles";
import useFarmList from "./FarmList.logic";
import UserRoleHOC from "../../UserRoleHOC";
import EditIcon from "../../../common/icons/EditIcon";
import DeleteIcon from "../../../common/icons/DeleteIcon";
import { ButtonContainer } from "../../../common/icons/ButtonContainer";
import { Farm as FarmProp } from "../Farm.static";
import useFilter from "../../../../utils/search";
import SearchBar from "../../../common/searchBar/searchBar";
import DetailsIcon from "../../../common/icons/DetailsIcon";
import useModal from "../../../common/ModalList/useModal";
import Modal from "../../../common/ModalList/Modal";

interface FarmListProps {
    farms: FarmProp[];
    fetchFarms: () => Promise<void>;
    showFarmLocationOnMap: (coordinates: number[] | undefined) => void;
}

const FarmList: React.FC<FarmListProps> = ({ farms, fetchFarms, showFarmLocationOnMap }) => {
    const { onDeleteClick, onEditClick, onDetailsClick, currentFarmName, originalFarmName, setCurrentFarmName, onDeleteConfirm, onEditConfirm, farmDetails } = useFarmList({
        fetchFarms,
    });

    const { filteredItems, setSearchQuery } = useFilter<FarmProp>({ items: farms });
    const { isVisible: isDeleteModalVisible, showModal: showDeleteModal, hideModal: hideDeleteModal } = useModal();
    const { isVisible: isEditModalVisible, showModal: showEditModal, hideModal: hideEditModal } = useModal();
    const { isVisible: isDetailsModalVisible, showModal: showDetailsModal, hideModal: hideDetailsModal } = useModal();

    return (
        <ListContainer>
            <ListHeader>Farm List</ListHeader>
            <SearchBar placeholder="Search by farm name" onSearch={setSearchQuery} />

            {/* <List>
                {Array.isArray(farms) && farms.length > 0 ? (
                    farms.map((farm) => <FarmCard key={farm.id} farm={farm} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />)
                ) : (
                    <ListItem>No farms available</ListItem>
                )}
            </List> */}

            <List>
                {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
                    filteredItems.map((farm) => (
                        <ListItem key={farm.id}>
                            {farm.name}
                            <UserRoleHOC>
                                <ButtonContainer>
                                    <DetailsIcon
                                        onClick={() => {
                                            onDetailsClick(farm.id || "");
                                            showDetailsModal();
                                        }}
                                    />
                                    <EditIcon
                                        onClick={() => {
                                            onEditClick(farm.id || "", farm.name);
                                            showEditModal();
                                        }}
                                    />
                                    <DeleteIcon
                                        onClick={() => {
                                            onDeleteClick(farm.id || "");
                                            showDeleteModal();
                                        }}
                                    />
                                </ButtonContainer>
                            </UserRoleHOC>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>No farms available</ListItem>
                )}
            </List>

            <Modal isVisible={isEditModalVisible} hideModal={hideEditModal} onConfirm={onEditConfirm} showConfirmButton={true}>
                <p>Current Fram Name: {originalFarmName}</p>
                <input type="text" placeholder="Enter new farm name" value={currentFarmName} onChange={(e) => setCurrentFarmName(e.target.value)} />
            </Modal>
            <Modal isVisible={isDeleteModalVisible} hideModal={hideDeleteModal} onConfirm={onDeleteConfirm} showConfirmButton={true}>
                <p>Are you sure you want to delete this farm?</p>
            </Modal>
            <Modal isVisible={isDetailsModalVisible} hideModal={hideDetailsModal} showConfirmButton={false}>
                <p>Farm Details:</p>
                {farmDetails && (
                    <div>
                        <p>Farm Name: {farmDetails.name}</p>
                        <p>Location: {farmDetails.location.coordinates}</p>
                    </div>
                )}
            </Modal>
        </ListContainer>
    );
};

export default FarmList;
