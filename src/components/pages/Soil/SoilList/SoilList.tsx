import React from "react";
import EditIcon from "../../../common/icons/EditIcon";
import DeleteIcon from "../../../common/icons/DeleteIcon";
import { ListContainer, ListHeader, List, ListItem } from "../../../common/ListStyles";
import { ButtonContainer } from "../../../common/icons/ButtonContainer";
import UserRoleHOC from "../../UserRoleHOC";
import useSoilList from "./SoilList.logic";
import { Soil as SoilProp } from "../Soil.static";
import useFilter from "../../../../utils/search";
import SearchBar from "../../../common/searchBar/searchBar";
import DetailsIcon from "../../../common/icons/DetailsIcon";
import useModal from "../../../common/ModalList/useModal";
import Modal from "../../../common/ModalList/Modal";

interface SoilListProps {
    soils: SoilProp[];
    fetchSoils: () => Promise<void>;
}

const SoilList: React.FC<SoilListProps> = ({ soils, fetchSoils }) => {
    const { onDeleteClick, onEditClick, onDetailsClick, currentSoilName, setCurrentSoilName, originalSoilName, onDeleteConfirm, onEditConfirm, soilDetails } = useSoilList({
        fetchSoils,
    });

    const { filteredItems, setSearchQuery } = useFilter<SoilProp>({ items: soils });
    const { isVisible: isDeleteModalVisible, showModal: showDeleteModal, hideModal: hideDeleteModal } = useModal();
    const { isVisible: isEditModalVisible, showModal: showEditModal, hideModal: hideEditModal } = useModal();
    const { isVisible: isDetailsModalVisible, showModal: showDetailsModal, hideModal: hideDetailsModal } = useModal();

    return (
        <ListContainer>
            <ListHeader>Soil List</ListHeader>
            <SearchBar placeholder="Search by soil name" onSearch={setSearchQuery} />
            <List>
                {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
                    filteredItems.map((soil) => (
                        <ListItem key={soil.id}>
                            {soil.name}
                            <ButtonContainer>
                                <DetailsIcon
                                    onClick={() => {
                                        onDetailsClick(soil.id || "");
                                        showDetailsModal();
                                    }}
                                />
                                <UserRoleHOC>
                                    <EditIcon
                                        onClick={() => {
                                            onEditClick(soil.id || "", soil.name);
                                            showEditModal();
                                        }}
                                    />
                                    <DeleteIcon
                                        onClick={() => {
                                            onDeleteClick(soil.id || "");
                                            showDeleteModal();
                                        }}
                                    />
                                </UserRoleHOC>
                            </ButtonContainer>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>No soils available</ListItem>
                )}
            </List>

            <Modal isVisible={isEditModalVisible} hideModal={hideEditModal} onConfirm={onEditConfirm} showConfirmButton={true}>
                <p>Current Crop Name: {originalSoilName}</p>
                <input type="text" placeholder="Enter new crop name" value={currentSoilName} onChange={(e) => setCurrentSoilName(e.target.value)} />
            </Modal>
            <Modal isVisible={isDeleteModalVisible} hideModal={hideDeleteModal} onConfirm={onDeleteConfirm} showConfirmButton={true}>
                <p>Are you sure you want to delete this crop?</p>
            </Modal>
            <Modal isVisible={isDetailsModalVisible} hideModal={hideDetailsModal} showConfirmButton={false}>
                <p>Crop Details:</p>
                {soilDetails && (
                    <div>
                        <p>Crop Name: {soilDetails.name}</p>
                    </div>
                )}
            </Modal>
        </ListContainer>
    );
};

export default SoilList;
