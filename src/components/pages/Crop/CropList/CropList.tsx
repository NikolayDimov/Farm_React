// import React from "react";
// import EditIcon from "../../../common/icons/EditIcon";
// import DeleteIcon from "../../../common/icons/DeleteIcon";
// import DetailsIcon from "../../../common/icons/DetailsIcon";
// import { ListContainer, ListHeader, List, ListItem } from "../../../common/ListStyles";
// import { ButtonContainer } from "../../../common/icons/ButtonContainer";
// import UserRoleHOC from "../../UserRoleHOC";
// import useCropList from "../CropList/CropList.logic";
// import { Crop as CropProp } from "../Crop.static";
// import useFilter from "../../../../utils/search";
// import SearchBar from "../../../common/SearchBar/SearchBar";
// import useModal from "../../../common/ModalList/useModal";
// import Modal from "../../../common/ModalList/Modal";
// import { Link } from "react-router-dom";

// interface CropListProps {
//     crops: CropProp[];
//     fetchCrops: () => Promise<void>;
// }

// const CropList: React.FC<CropListProps> = ({ crops, fetchCrops }) => {
//     const { onDeleteClick, onEditClick, onDetailsClick, currentCropName, setCurrentCropName, originalCropName, onDeleteConfirm, onEditConfirm, cropDetails } = useCropList({
//         fetchCrops,
//     });

//     const { filteredItems, setSearchQuery } = useFilter<CropProp>({ items: crops });
//     const { isVisible: isDeleteModalVisible, showModal: showDeleteModal, hideModal: hideDeleteModal } = useModal();
//     const { isVisible: isEditModalVisible, showModal: showEditModal, hideModal: hideEditModal } = useModal({});
//     const { isVisible: isDetailsModalVisible, showModal: showDetailsModal, hideModal: hideDetailsModal } = useModal();

//     return (
//         <ListContainer>
//             <ListHeader>Crop List</ListHeader>
//             <SearchBar placeholder="Search by crop name" onSearch={setSearchQuery} />
//             <List>
//                 {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
//                     filteredItems.map((crop) => (
//                         <ListItem key={crop.id}>
//                             {crop.name}
//                             <ButtonContainer>
//                                 <DetailsIcon
//                                     onClick={() => {
//                                         onDetailsClick(crop.id || "");
//                                         showDetailsModal();
//                                     }}
//                                 />
//                                 <UserRoleHOC>
//                                     <EditIcon
//                                         onClick={() => {
//                                             onEditClick(crop.id || "", crop.name);
//                                             showEditModal();
//                                         }}
//                                     />
//                                     <DeleteIcon
//                                         onClick={() => {
//                                             onDeleteClick(crop.id || "");
//                                             showDeleteModal();
//                                         }}
//                                     />
//                                 </UserRoleHOC>
//                             </ButtonContainer>
//                         </ListItem>
//                     ))
//                 ) : (
//                     <ListItem>No crops available</ListItem>
//                 )}
//             </List>

//             <Modal isVisible={isEditModalVisible} hideModal={hideEditModal} onConfirm={onEditConfirm} showConfirmButton={true}>
//                 <p>Current Crop Name: {originalCropName}</p>
//                 <input type="text" placeholder="Enter new crop name" value={currentCropName} onChange={(e) => setCurrentCropName(e.target.value)} />
//             </Modal>
//             <Modal isVisible={isDeleteModalVisible} hideModal={hideDeleteModal} onConfirm={onDeleteConfirm} showConfirmButton={true}>
//                 <p>Are you sure you want to delete this crop?</p>
//             </Modal>
//             <Modal isVisible={isDetailsModalVisible} hideModal={hideDetailsModal} showConfirmButton={false}>
//                 <p>Crop Details:</p>
//                 {cropDetails && (
//                     <div>
//                         <p>Crop Name: {cropDetails.name}</p>
//                     </div>
//                 )}
//             </Modal>
//         </ListContainer>
//     );
// };

// export default CropList;

import React, { useEffect } from "react";
import EditIcon from "../../../common/icons/EditIcon";
import DeleteIcon from "../../../common/icons/DeleteIcon";
import DetailsIcon from "../../../common/icons/DetailsIcon";
import { ListContainer, ListHeader, List, ListItem } from "../../../common/ListStyles";
import { ButtonContainer } from "../../../common/icons/ButtonContainer";
import UserRoleHOC from "../../UserRoleHOC";
import useCropList from "../CropList/CropList.logic";
import { Crop as CropProp } from "../Crop.static";
import useFilter from "../../../../utils/search";
import SearchBar from "../../../common/SearchBar/SearchBar";
import useModal from "../../../common/ModalList/useModal";
import Modal from "../../../common/ModalList/Modal";
import { Navigate, useLocation } from "react-router-dom";

interface CropListProps {
    crops: CropProp[];
    fetchCrops: () => Promise<void>;
}

const CropList: React.FC<CropListProps> = ({ crops, fetchCrops }) => {
    const { onDeleteClick, onEditClick, onDetailsClick, currentCropName, setCurrentCropName, originalCropName, onDeleteConfirm, onEditConfirm, cropDetails } = useCropList({
        fetchCrops,
    });

    const { filteredItems, setSearchQuery } = useFilter<CropProp>({ items: crops });
    const { isVisible: isDeleteModalVisible, showModal: showDeleteModal, hideModal: hideDeleteModal } = useModal();
    const { isVisible: isEditModalVisible, showModal: showEditModal, hideModal: hideEditModal } = useModal({});
    const { isVisible: isDetailsModalVisible, showModal: showDetailsModal, hideModal: hideDetailsModal } = useModal();
    const location = useLocation();

    return (
        <ListContainer>
            <ListHeader>Crop List</ListHeader>
            <SearchBar placeholder="Search by crop name" onSearch={setSearchQuery} />
            <List>
                {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
                    filteredItems.map((crop) => (
                        <ListItem key={crop.id}>
                            {crop.name}
                            <ButtonContainer>
                                <DetailsIcon
                                    onClick={() => {
                                        const cropId = crop.id;
                                        const currentPathname = location.pathname;
                                        const newUrl = `${currentPathname}/${cropId}`;
                                        window.history.pushState(null, "", newUrl);
                                        onDetailsClick(crop.id || "");
                                        showDetailsModal();
                                    }}
                                />

                                <UserRoleHOC>
                                    <EditIcon
                                        onClick={() => {
                                            const cropId = crop.id;
                                            const currentPathname = location.pathname;
                                            const newUrl = `${currentPathname}/${cropId}`;
                                            window.history.pushState(null, "", newUrl);
                                            onEditClick(crop.id || "", crop.name);
                                            showEditModal();
                                        }}
                                    />
                                    <DeleteIcon
                                        onClick={() => {
                                            const cropId = crop.id;
                                            const currentPathname = location.pathname;
                                            const newUrl = `${currentPathname}/${cropId}`;
                                            window.history.pushState(null, "", newUrl);
                                            onDeleteClick(crop.id || "");
                                            showDeleteModal();
                                        }}
                                    />
                                </UserRoleHOC>
                            </ButtonContainer>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>No crops available</ListItem>
                )}
            </List>

            <Modal isVisible={isEditModalVisible} hideModal={hideEditModal} onConfirm={onEditConfirm} showConfirmButton={true}>
                <p>Current Crop Name: {originalCropName}</p>
                <input type="text" placeholder="Enter new crop name" value={currentCropName} onChange={(e) => setCurrentCropName(e.target.value)} />
            </Modal>
            <Modal isVisible={isDeleteModalVisible} hideModal={hideDeleteModal} onConfirm={onDeleteConfirm} showConfirmButton={true}>
                <p>Are you sure you want to delete this crop?</p>
            </Modal>
            <Modal isVisible={isDetailsModalVisible} hideModal={hideDetailsModal} showConfirmButton={false}>
                <p>Crop Details:</p>
                {cropDetails && (
                    <div>
                        <p>Crop Name: {cropDetails.name}</p>
                    </div>
                )}
            </Modal>
        </ListContainer>
    );
};

export default CropList;
