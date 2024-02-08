import React, { useEffect, useState } from "react";
import useField from "./Field.logic";
import UserRoleHOC from "../UserRoleHOC";
import FieldList from "./FieldList/FieldList";
import { LoadScript, GoogleMap, DrawingManager, Polygon } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from "./Field.static";
import { FieldCoordinates } from "./Field.static";
import ErrorBoundary from "./FieldList/ErrorBoundary";

const Field: React.FC = () => {
    const { fields, farms, soils, fetchFields, changeHandler, createField, createdValues, errorMessage, findFarmName, findSoilName, loading, handleSelectLocation } = useField();

    const libraries: ("drawing" | "geometry")[] = ["drawing"];

    const [isMapVisible, setMapVisibility] = useState(false);
    const [fieldMapCoordinates, setFieldMapCoordinates] = useState<number[][][]>([]);
    const [mapLoaded, setMapLoaded] = useState(false);

    const [mapCenter, setMapCenter] = useState({ lat: 46, lng: 15 });
    const [mapZoom, setMapZoom] = useState(5);

    useEffect(() => {
        try {
            if (fieldMapCoordinates.length > 0) {
                const bounds = new window.google.maps.LatLngBounds();

                fieldMapCoordinates.forEach((coordinateSet) => {
                    coordinateSet.forEach(([lat, lng]) => {
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
        } catch (error) {
            console.error("Error in useEffect:", error);
        }
    }, [fieldMapCoordinates]);

    return (
        <>
            <div>
                <UserRoleHOC>
                    <h3>Add a New Field</h3>
                    <form onSubmit={createField}>
                        <label>Field name:</label>
                        <input type="text" name="newFieldName" value={createdValues.newFieldName} onChange={changeHandler} />
                        <label>Farm:</label>
                        <select name="newFarmId" value={createdValues.newFarmId} onChange={changeHandler}>
                            <option value="">Select Farm</option>
                            {farms.map((farm) => (
                                <option key={farm.id} value={farm.id}>
                                    {farm.name}
                                </option>
                            ))}
                        </select>
                        <label>Soil:</label>
                        <select name="newSoilId" value={createdValues.newSoilId} onChange={changeHandler}>
                            <option value="">Select Soil</option>
                            {soils.map((soil) => (
                                <option key={soil.id} value={soil.id}>
                                    {soil.name}
                                </option>
                            ))}
                        </select>
                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                        <button type="submit" disabled={loading}>
                            {loading ? "Creating Field..." : "Create Field"}
                        </button>
                    </form>
                </UserRoleHOC>

                <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries} onLoad={() => setMapLoaded(true)}>
                    {mapLoaded && (
                        <GoogleMap center={mapCenter} zoom={mapZoom} mapContainerStyle={{ height: "500px", width: "100%" }}>
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
                                    try {
                                        const coordinates = polygon
                                            .getPath()
                                            .getArray()
                                            .map(({ lat, lng }: google.maps.LatLng) => [lat(), lng()]);
                                        handleSelectLocation([coordinates]);
                                    } catch (error) {
                                        console.error("Error in onPolygonComplete:", error);
                                    }
                                }}
                            />
                            {fieldMapCoordinates.map((coordinates, index) => (
                                <Polygon key={index} paths={coordinates.map((coord) => ({ lat: coord[0], lng: coord[1] }))} editable={true} />
                            ))}
                        </GoogleMap>
                    )}
                </LoadScript>
            </div>

            <ErrorBoundary>
                <FieldList
                    fields={fields}
                    soils={soils}
                    findFarmName={findFarmName}
                    findSoilName={findSoilName}
                    fetchFields={fetchFields}
                    displayFieldOnGoogleMap={(fieldBoundary: FieldCoordinates) => {
                        console.log("Newly outlined coordinates:", fieldBoundary);

                        const coordinates = fieldBoundary.coordinates;

                        if (Array.isArray(coordinates) && coordinates.length > 0 && Array.isArray(coordinates[0])) {
                            const convertedCoordinates = coordinates.map((coordinateSet) => coordinateSet.map(([lat, lng]) => [lat, lng]));

                            console.log("Converted Coordinates:", convertedCoordinates);

                            setFieldMapCoordinates(convertedCoordinates);
                            setMapVisibility(true);
                        } else {
                            console.error("Invalid coordinates format:", coordinates);
                        }
                    }}
                />
            </ErrorBoundary>
        </>
    );
};

export default Field;
