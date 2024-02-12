import React, { useEffect, useRef, useState } from "react";
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
import SearchBar from "../../../common/SearchBar/SearchBar";
import useModal from "../../../common/ModalList/useModal";
import Modal from "../../../common/ModalList/Modal";
import { LoadScript, GoogleMap, DrawingManager, Polygon } from "@react-google-maps/api";

const libraries: ("drawing" | "geometry")[] = ["drawing"];

interface FieldListProps {
    fields: FieldProp[];
    soils: SoilProp[];
    fetchFields: () => Promise<void>;
    findFarmName: (farmId: string) => string;
    findSoilName: (soilId: string) => string;
    displayFieldOnGoogleMap: (fieldBoundary: number[][][]) => void;
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
        onUnmountHandler,
        setUpdatedCoordinates,
    } = useFieldList({ fetchFields });

    const polygonRef = useRef<google.maps.Polygon | null>(null);

    const onPolygonComplete = async (polygon: google.maps.Polygon, destroy = false) => {
        // Set the polygon instance in the ref
        polygonRef.current = polygon;

        // Call onUnmountHandler to get the updated coordinates after a delay
        setTimeout(() => {
            const updatedCoordsArray = onUnmountHandler(polygon);

            // Ensure you are updating the correct field's coordinates
            setUpdatedCoordinates((prevCoordinates) => {
                // If prevCoordinates is undefined, initialize it with an empty array
                const existingCoordinates = prevCoordinates || [];

                // Logic to associate updatedCoords with the specific field
                const combinedCoordinates = [...existingCoordinates, ...updatedCoordsArray];

                // Clear polygonRef after processing
                polygonRef.current = null;

                // Call onUnmountHandler only if destroy is true
                if (destroy) {
                    polygon.setMap(null);
                }

                return combinedCoordinates;
            });
        }, 16000);
    };

    useEffect(() => {
        return () => {
            // Reset or clear any necessary state when the component unmounts
            console.log("Cleanup function executed");
            polygonRef.current = null;
            setUpdatedCoordinates(undefined); // Clear the coordinates state
        };
    }, []);

    const { filteredItems, setSearchQuery } = useFilter<FieldProp>({ items: fields });

    const { isVisible: isDeleteModalVisible, showModal: showDeleteModal, hideModal: hideDeleteModal } = useModal();
    const { isVisible: isEditModalVisible, showModal: showEditModal, hideModal: hideEditModal } = useModal();
    const { isVisible: isDetailsModalVisible, showModal: showDetailsModal, hideModal: hideDetailsModal } = useModal();

    const [mapVisibility, setMapVisibility] = useState(false);
    const [mapCenter, setMapCenter] = useState({ lat: 46, lng: 15 });

    const [mapLoaded, setMapLoaded] = useState(false);
    const [mapZoom, setMapZoom] = useState(5);
    const [selectedField, setSelectedField] = useState<FieldProp | null>(null);

    // const polygonRef = useRef<google.maps.Polygon | null>(null);

    const handleShowFieldOnMap = (fieldMapCoordinates: number[][][]) => {
        console.log("Field Coordinates:", fieldMapCoordinates);
        if (fieldMapCoordinates.length > 0) {
            setMapVisibility(true);

            const bounds = new window.google.maps.LatLngBounds();

            fieldMapCoordinates.forEach((coordinateSet) => {
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
                            <strong>Name:</strong> {field.name}
                            <strong>Farm:</strong> {findFarmName(field.farmId)}
                            <strong>Soil:</strong> {findSoilName(field.soilId)}
                            <ButtonContainer>
                                <button
                                    onClick={() => {
                                        if (field.boundary && field.boundary.type === "Polygon" && Array.isArray(field.boundary.coordinates)) {
                                            const coordinates: number[][][] = (field.boundary?.coordinates || []).map((set) => set.map(([lat, lng]: number[]) => [lat, lng]));
                                            // console.log("Field Coordinates:", field.boundary?.coordinates);
                                            const convertedCoordinates: number[][][] = coordinates;
                                            // console.log(convertedCoordinates);
                                            displayFieldOnGoogleMap(coordinates);
                                            handleShowFieldOnMap(convertedCoordinates);
                                        } else {
                                            console.warn("Field boundary coordinates not available or not in the expected format.");
                                        }
                                    }}
                                >
                                    Show Field
                                </button>
                                <UserRoleHOC>
                                    <DetailsIcon
                                        onClick={() => {
                                            onDetailsClick(field.id || "");
                                            showDetailsModal();
                                        }}
                                    />
                                    <EditIcon
                                        onClick={() => {
                                            onEditClick(field.id || "", field);
                                            setSelectedField(field);
                                            showEditModal();
                                            handleShowFieldOnMap(field.boundary?.coordinates);
                                            // console.log("Old Coordinates:", field.boundary?.coordinates);
                                        }}
                                    />
                                    <DeleteIcon
                                        onClick={() => {
                                            onDeleteClick(field.id || "");
                                            showDeleteModal();
                                        }}
                                    />
                                </UserRoleHOC>
                            </ButtonContainer>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>No fields available</ListItem>
                )}
            </List>

            <Modal isVisible={isEditModalVisible} hideModal={hideEditModal} onConfirm={() => onEditConfirm()} showConfirmButton={true}>
                <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries} onLoad={() => setMapLoaded(true)}>
                    {mapLoaded && isEditModalVisible && (
                        <GoogleMap center={mapCenter} zoom={14} mapContainerStyle={{ height: "500px", width: "800px" }}>
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
                                    // Set the polygon instance in the ref
                                    polygonRef.current = polygon;
                                    // Call onPolygonComplete function
                                    onPolygonComplete(polygon);
                                }}
                            />
                            {selectedField?.boundary.coordinates.map((coordinates, index) => (
                                <Polygon
                                    key={index}
                                    onUnmount={(polygon) => onUnmountHandler(polygon)}
                                    //onUnmount={(polygon) => onUnmountHandler(polygon, true)}
                                    // onUnmount={(e) => {
                                    //     console.log(
                                    //         "onUnmount",
                                    //         e
                                    //             .getPaths()
                                    //             .getArray()
                                    //             .map((c) => c.getArray().map((x) => x.toJSON()))
                                    //     );

                                    //     onUnmountHandler(e);
                                    // }}
                                    paths={coordinates.map((coord) => ({ lat: coord[0], lng: coord[1] }))}
                                    editable={true}
                                />
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
