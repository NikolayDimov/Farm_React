import React from "react";
import EditIcon from "../../../common/icons/EditIcon";
import DeleteIcon from "../../../common/icons/DeleteIcon";
import { ListContainer, ListHeader, List, ListItem } from "../../../common/ListStyles";
import { ButtonContainer } from "../../../common/icons/ButtonContainer";
import UserRoleHOC from "../../UserRoleHOC";
import useProcessingTypeList from "./ProcessingTypeList.logic";
import { ProcessingType as ProcessingTypeProp } from "../ProcessingType.static";
import useFilter from "../../../../utils/search";
import SearchBar from "../../../common/searchBar/searchBar";
import DetailsIcon from "../../../common/icons/DetailsIcon";
import useModal from "../../../common/ModalList/useModal";
import Modal from "../../../common/ModalList/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../../../static/routes";

interface ProcessingTypeListProps {
    processingTypes: ProcessingTypeProp[];
    fetchProcessingTypes: () => Promise<void>;
}

const ProcessingTypeList: React.FC<ProcessingTypeListProps> = ({ processingTypes, fetchProcessingTypes }) => {
    const {
        onDeleteClick,
        onEditClick,
        onDetailsClick,
        currentProcessingTypeName,
        setCurrentProcessingTypeName,
        originalProcessingTypeName,
        onDeleteConfirm,
        onEditConfirm,
        processingTypeDetails,
    } = useProcessingTypeList({ fetchProcessingTypes });

    const { filteredItems, setSearchQuery } = useFilter<ProcessingTypeProp>({ items: processingTypes });
    const { isVisible: isDeleteModalVisible, showModal: showDeleteModal, hideModal: hideDeleteModal } = useModal();
    const { isVisible: isEditModalVisible, showModal: showEditModal, hideModal: hideEditModal } = useModal();
    const { isVisible: isDetailsModalVisible, showModal: showDetailsModal, hideModal: hideDetailsModal } = useModal();

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <ListContainer>
            <ListHeader>ProcessingType List</ListHeader>
            <SearchBar placeholder="Search by processing type name" onSearch={setSearchQuery} />
            <List>
                {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
                    filteredItems.map((processingType) => (
                        <ListItem key={processingType.id}>
                            {processingType.name}
                            <ButtonContainer>
                                <DetailsIcon
                                    onClick={() => {
                                        onDetailsClick(processingType.id || "");
                                        showDetailsModal();
                                    }}
                                />
                                <UserRoleHOC>
                                    <EditIcon
                                        onClick={() => {
                                            onEditClick(processingType.id || "", processingType.name);
                                            showEditModal();
                                            // navigate(routes.updateProcessingType.replace(":PTId", `${processingType.id}`), {
                                            //     state: { background: location, processingType: processingType },
                                            // });
                                        }}
                                    />
                                    <DeleteIcon
                                        onClick={() => {
                                            onDeleteClick(processingType.id || "");
                                            showDeleteModal();
                                        }}
                                    />
                                </UserRoleHOC>
                            </ButtonContainer>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>No processingTypes available</ListItem>
                )}
            </List>

            <Modal isVisible={isEditModalVisible} hideModal={hideEditModal} onConfirm={onEditConfirm} showConfirmButton={true}>
                <p>Current Processing Type Name: {originalProcessingTypeName}</p>
                <input type="text" placeholder="Enter new crop name" value={currentProcessingTypeName} onChange={(e) => setCurrentProcessingTypeName(e.target.value)} />
            </Modal>
            <Modal isVisible={isDeleteModalVisible} hideModal={hideDeleteModal} onConfirm={onDeleteConfirm} showConfirmButton={true}>
                <p>Are you sure you want to delete this processing type?</p>
            </Modal>
            <Modal isVisible={isDetailsModalVisible} hideModal={hideDetailsModal} showConfirmButton={false}>
                <p>Processing Type Details:</p>
                {processingTypeDetails && (
                    <div>
                        <p>Processing Type Name: {processingTypeDetails.name}</p>
                    </div>
                )}
            </Modal>
        </ListContainer>
    );
};

export default ProcessingTypeList;
