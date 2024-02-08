import React, { useState } from "react";
import { Field as FieldProp, GOOGLE_MAPS_API_KEY } from "../Field.static";
import { Soil as SoilProp } from "../../Soil/Soil.static";
import EditIcon from "../../../common/icons/EditIcon";
import DeleteIcon from "../../../common/icons/DeleteIcon";
import DetailsIcon from "../../../common/icons/DetailsIcon";
import { ListContainer, ListHeader, List, ListItem } from "../../../common/ListStyles";
import { ButtonContainer } from "../../../common/icons/ButtonContainer";
import UserRoleHOC from "../../UserRoleHOC";
import useFieldList from "../FieldList/FieldList.logic";
import useFilter from "../../../../utils/search";
import SearchBar from "../../../common/searchBar/searchBar";
import useModal from "../../../common/ModalList/useModal";
import Modal from "../../../common/ModalList/Modal";
import { FieldCoordinates } from "../Field.static";
import { LoadScript, GoogleMap, DrawingManager, Polygon } from "@react-google-maps/api";
const libraries: ("drawing" | "geometry")[] = ["drawing"];

interface FieldListProps {
    fields: FieldProp[];
    soils: SoilProp[];
    fetchFields: () => Promise<void>;
    findFarmName: (farmId: string) => string;
    findSoilName: (soilId: string) => string;
    displayFieldOnGoogleMap: (fieldBoundary: FieldCoordinates) => void;
}

const FieldList: React.FC<FieldListProps> = ({ fields, soils, fetchFields, findFarmName, findSoilName, displayFieldOnGoogleMap }) => {
    const {
        onDeleteClick,
        onEditClick,
        onDetailsClick,
        currentFieldName,
        originalFieldName,
        selectedSoilId,
        onEditConfirm,
        onDeleteConfirm,
        setCurrentFieldName,
        setSelectedSoilId,
        fieldDetails,
        setFieldMapCoordinates,
    } = useFieldList({ fetchFields });

    const { filteredItems, setSearchQuery } = useFilter<FieldProp>({ items: fields });

    const { isVisible: isDeleteModalVisible, showModal: showDeleteModal, hideModal: hideDeleteModal } = useModal();
    const { isVisible: isEditModalVisible, showModal: showEditModal, hideModal: hideEditModal } = useModal();
    const { isVisible: isDetailsModalVisible, showModal: showDetailsModal, hideModal: hideDetailsModal } = useModal();

    const [mapVisibility, setMapVisibility] = useState(false);
    const [mapCenter, setMapCenter] = useState({ lat: 46, lng: 15 });

    const [mapLoaded, setMapLoaded] = useState(false);
    const [mapZoom, setMapZoom] = useState(5);
    const [selectedField, setSelectedField] = useState<FieldProp | null>(null);

    const handleShowFieldOnMap = (fieldMapCoordinates: FieldCoordinates) => {
        if (fieldMapCoordinates.coordinates.length > 0) {
            setMapVisibility(true);

            const bounds = new window.google.maps.LatLngBounds();

            fieldMapCoordinates.coordinates.forEach((coordinateSet) => {
                coordinateSet.forEach((coordinate) => {
                    const [lat, lng] = coordinate;
                    bounds.extend(new window.google.maps.LatLng(lat, lng));
                });
            });

            const center = bounds.getCenter();
            const zoom = 14;

            setMapCenter({
                lat: center.lat(),
                lng: center.lng(),
            });
            setMapZoom(zoom);
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
                                            setSelectedField(field);
                                            onEditClick(field.id || "", field);
                                            showEditModal();
                                            console.log("Field Coordinates:", field.boundary?.coordinates);

                                            // Display field
                                            // if (field.boundary && field.boundary.type === "Polygon" && Array.isArray(field.boundary.coordinates)) {
                                            //     const coordinates: number[][][] = (field.boundary?.coordinates || []).map((set) => set.map(([lat, lng]: number[]) => [lat, lng]));
                                            //     console.log("Field Coordinates:", field.boundary?.coordinates);

                                            //     const convertedCoordinates: FieldCoordinates = {
                                            //         coordinates,
                                            //     };

                                            //     console.log("convertedCoordinates", convertedCoordinates);
                                            //     displayFieldOnGoogleMap(convertedCoordinates);
                                            //     handleShowFieldOnMap(convertedCoordinates);
                                            // } else {
                                            //     console.warn("Field boundary coordinates not available or not in the expected format.");
                                            // }
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

            <Modal isVisible={isEditModalVisible} hideModal={hideEditModal} onConfirm={() => onEditConfirm()} showConfirmButton={true}>
                <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries} onLoad={() => setMapLoaded(true)}>
                    {mapLoaded && (
                        <GoogleMap center={mapCenter} zoom={15} mapContainerStyle={{ height: "500px", width: "400px" }}>
                            <DrawingManager
                                options={{
                                    drawingControl: true,
                                    drawingControlOptions: {
                                        position: window.google.maps.ControlPosition.TOP_CENTER,
                                        drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
                                    },
                                    polygonOptions: {
                                        editable: true,
                                    },
                                }}
                                onPolygonComplete={(polygon: google.maps.Polygon) => {
                                    const coordinates = polygon
                                        .getPath()
                                        .getArray()
                                        .map(({ lat, lng }: google.maps.LatLng) => [lat(), lng()]);
                                    handleShowFieldOnMap({ coordinates: [coordinates] });
                                    console.log("Updated Coordinates:", coordinates);
                                    setFieldMapCoordinates({ coordinates: [coordinates] });
                                }}
                            />
                            {selectedField?.boundary.coordinates.map((coordinates, index) => (
                                <Polygon key={index} paths={coordinates.map((coord) => ({ lat: coord[0], lng: coord[1] }))} editable={true} />
                            ))}
                        </GoogleMap>
                    )}
                </LoadScript>

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
