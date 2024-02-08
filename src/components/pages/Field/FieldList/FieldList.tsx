import React, { useEffect, useState } from "react";
import { Field as FieldProp } from "../Field.static";
import { Soil as SoilProp } from "../../Soil/Soil.static";
import EditIcon from "../../../common/icons/EditIcon";
import DeleteIcon from "../../../common/icons/DeleteIcon";
import { ListContainer, ListHeader, List, ListItem } from "../../../common/ListStyles";
import { ButtonContainer } from "../../../common/icons/ButtonContainer";
import UserRoleHOC from "../../UserRoleHOC";
import useFieldList from "../FieldList/FieldList.logic";
import useFilter from "../../../../utils/search";
import SearchBar from "../../../common/searchBar/searchBar";
import DetailsIcon from "../../../common/icons/DetailsIcon";
import useModal from "../../../common/ModalList/useModal";
import Modal from "../../../common/ModalList/Modal";
import { FieldCoordinates } from "../Field.static";

interface FieldListProps {
    fields: FieldProp[];
    soils: SoilProp[];
    fetchFields: () => Promise<void>;
    findFarmName: (farmId: string) => string;
    findSoilName: (soilId: string) => string;
    displayFieldOnGoogleMap: (fieldBoundary: FieldCoordinates) => void;
}

interface FieldListProps {
    // ...
    displayFieldOnGoogleMap: (fieldBoundary: FieldCoordinates) => void;
}

const FieldList: React.FC<FieldListProps> = ({ fields, soils, fetchFields, findFarmName, findSoilName, displayFieldOnGoogleMap }) => {
    const {
        onDeleteClick,
        onEditClick,
        onDetailsClick,
        originalFieldName,
        currentFieldName,
        selectedSoilId,
        onEditConfirm,
        onDeleteConfirm,
        setCurrentFieldName,
        setSelectedSoilId,
        fieldDetails,
    } = useFieldList({ fetchFields });

    const { filteredItems, setSearchQuery } = useFilter<FieldProp>({ items: fields });
    const { isVisible: isDeleteModalVisible, showModal: showDeleteModal, hideModal: hideDeleteModal } = useModal();
    const { isVisible: isEditModalVisible, showModal: showEditModal, hideModal: hideEditModal } = useModal();
    const { isVisible: isDetailsModalVisible, showModal: showDetailsModal, hideModal: hideDetailsModal } = useModal();

    const [mapVisibility, setMapVisibility] = useState(false);
    const [mapCenter, setMapCenter] = useState({ lat: 46, lng: 15 });

    const handleShowFieldOnMap = (fieldMapCoordinates: FieldCoordinates) => {
        // Check if there are coordinates to show
        if (fieldMapCoordinates.coordinates.length > 0) {
            // Set the map visibility and coordinates
            setMapVisibility(true);

            // Set the map center based on the field's coordinates
            const bounds = new window.google.maps.LatLngBounds();

            fieldMapCoordinates.coordinates.forEach((coordinateSet) => {
                coordinateSet.forEach((coordinate) => {
                    const [lat, lng] = coordinate;
                    bounds.extend(new window.google.maps.LatLng(lat, lng));
                });
            });

            const center = bounds.getCenter();

            setMapCenter({
                lat: center.lat(),
                lng: center.lng(),
            });
        } else {
            console.warn("No field coordinates available to show on the map.");
        }
    };

    return (
        <ListContainer>
            <ListHeader>Field List</ListHeader>
            <SearchBar placeholder="Search by field name" onSearch={setSearchQuery} />
            <List>
                {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
                    filteredItems.map((field) => (
                        <ListItem key={field.id}>
                            <strong>Name:</strong> {field.name} |&nbsp;
                            <strong>Farm:</strong> {findFarmName(field.farmId)} |&nbsp;
                            <strong>Soil:</strong> {findSoilName(field.soilId)}
                            <UserRoleHOC>
                                <ButtonContainer>
                                    <button
                                        onClick={() => {
                                            if (field.boundary && field.boundary.type === "Polygon" && Array.isArray(field.boundary.coordinates)) {
                                                const coordinates: number[][][] = (field.boundary?.coordinates || []).map((set) => set.map(([lat, lng]: number[]) => [lat, lng]));
                                                console.log("Field Coordinates:", field.boundary?.coordinates);

                                                const convertedCoordinates: FieldCoordinates = {
                                                    coordinates,
                                                };

                                                console.log(convertedCoordinates);
                                                displayFieldOnGoogleMap(convertedCoordinates);
                                                handleShowFieldOnMap(convertedCoordinates);
                                            } else {
                                                console.warn("Field boundary coordinates not available or not in the expected format.");
                                            }
                                        }}
                                    >
                                        Show Field
                                    </button>

                                    <DetailsIcon
                                        onClick={() => {
                                            onDetailsClick(field.id || "");
                                            showDetailsModal();
                                        }}
                                    />
                                    <EditIcon
                                        onClick={() => {
                                            onEditClick(field.id || "", field.name, field.soilId);
                                            showEditModal();
                                        }}
                                    />
                                    <DeleteIcon
                                        onClick={() => {
                                            onDeleteClick(field.id || "");
                                            showDeleteModal();
                                        }}
                                    />
                                </ButtonContainer>
                            </UserRoleHOC>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>No fields available</ListItem>
                )}
            </List>

            <Modal isVisible={isEditModalVisible} hideModal={hideEditModal} onConfirm={onEditConfirm} showConfirmButton={true}>
                <p>Current Field Name: {originalFieldName}</p>
                <p>Current Field Soil: {findSoilName(selectedSoilId)}</p>
                <input type="text" placeholder="Enter new machine brand" value={currentFieldName} onChange={(e) => setCurrentFieldName(e.target.value)} />
                <div>
                    <label>Select Soil:</label>
                    <select value={selectedSoilId} onChange={(e) => setSelectedSoilId(e.target.value)}>
                        <option value="" disabled>
                            Select Soil
                        </option>
                        {soils.map((soil) => (
                            <option key={soil.id} value={soil.id}>
                                {soil.name}
                            </option>
                        ))}
                    </select>
                </div>
            </Modal>
            <Modal isVisible={isDeleteModalVisible} hideModal={hideDeleteModal} onConfirm={onDeleteConfirm} showConfirmButton={true}>
                <p>Are you sure you want to delete this field?</p>
            </Modal>
            <Modal isVisible={isDetailsModalVisible} hideModal={hideDetailsModal} showConfirmButton={false}>
                <p>Field Details:</p>
                {fieldDetails && (
                    <div>
                        <p>Field name: {fieldDetails.name}</p>
                        <p>Farm: {findFarmName(fieldDetails.farmId)}</p>
                        <p>Soil: {findSoilName(fieldDetails.soilId)}</p>
                    </div>
                )}
            </Modal>
        </ListContainer>
    );
};

export default FieldList;
