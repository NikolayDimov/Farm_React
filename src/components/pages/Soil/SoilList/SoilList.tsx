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
import { useNavigate } from "react-router-dom";
import DetailsSoilModal from "./SoilListModal/DetailsModal";
import EditSoilModal from "./SoilListModal/EditModal";
import DeleteSoilModal from "./SoilListModal/DeleteModal";

interface SoilListProps {
    soils: SoilProp[];
    fetchSoils: () => Promise<void>;
}

const SoilList: React.FC<SoilListProps> = ({ soils, fetchSoils }) => {
    const { onDeleteClick, onEditClick, onDetailsClick, setCurrentSoilName, originalSoilName, onDeleteConfirm, onEditSoilConfirm, soilDetails } = useSoilList({
        fetchSoils,
    });

    const { filteredItems, setSearchQuery } = useFilter<SoilProp>({ items: soils });
    const { isVisible: isDeleteModalVisible, showModal: showDeleteModal, hideModal: hideDeleteModal } = useModal();
    const { isVisible: isEditModalVisible, showModal: showEditModal, hideModal: hideEditModal } = useModal();
    const { isVisible: isDetailsModalVisible, showModal: showDetailsModal, hideModal: hideDetailsModal } = useModal();
    const navigate = useNavigate();

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
                                        navigate(`/soil/${soil.id}/details`);
                                    }}
                                />
                                <UserRoleHOC>
                                    <EditIcon
                                        onClick={() => {
                                            onEditClick(soil.id || "", soil.name);
                                            showEditModal();
                                            navigate(`/soil/${soil.id}/edit`);
                                        }}
                                    />
                                    <DeleteIcon
                                        onClick={() => {
                                            onDeleteClick(soil.id || "");
                                            showDeleteModal();
                                            navigate(`/soil/${soil.id}/delete`);
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

            {isDeleteModalVisible && <DeleteSoilModal isVisible={isDeleteModalVisible} hideModal={hideDeleteModal} onDeleteConfirm={onDeleteConfirm} />}

            {isEditModalVisible && originalSoilName !== undefined && (
                <EditSoilModal
                    isVisible={isEditModalVisible}
                    hideModal={hideEditModal}
                    currentSoilName={originalSoilName}
                    onConfirm={onEditSoilConfirm}
                    setCurrentSoilName={setCurrentSoilName}
                />
            )}

            {isDetailsModalVisible && soilDetails !== undefined && <DetailsSoilModal isVisible={isDetailsModalVisible} hideModal={hideDetailsModal} soilDetails={soilDetails} />}
        </ListContainer>
    );
};

export default SoilList;
