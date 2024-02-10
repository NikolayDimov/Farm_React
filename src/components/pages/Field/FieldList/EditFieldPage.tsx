// import React, { useEffect, useState } from "react";
// import { LoadScript, GoogleMap, DrawingManager, Polygon } from "@react-google-maps/api";
// import { useLocation, useParams } from "react-router-dom";
// import { apiField } from "../../../../services/apiField";
// import { GOOGLE_MAPS_API_KEY, UpdateField } from "../Field.static";
// import { Field as FieldProp } from "../Field.static";
// import { Soil as SoilProp } from "../../Soil/Soil.static";

// const EditFieldPage: React.FC = () => {
//     // const fieldId = window.location.pathname.split("/")[2];
//     const location = useLocation();
//     const { state } = location;

//     const soils: SoilProp[] = (state && state.soils) || [];
//     const findSoilName: (soilId: string) => string = (state && state.findSoilName) || ((soilId: string) => "");

//     const { fieldId } = useParams<{ fieldId: string }>();
//     const [mapLoaded, setMapLoaded] = useState(false);
//     const [mapCenter, setMapCenter] = useState({ lat: 46, lng: 15 });
//     const [mapZoom, setMapZoom] = useState(5);
//     const [field, setField] = useState<FieldProp>();
//     const [isEditModalVisible, setIsEditModalVisible] = useState(false);
//     const [editedFieldData, setEditedFieldData] = useState<UpdateField | null>(null);

//     const [selectedFieldIdForEdit, setSelectedFieldIdForEdit] = useState<string | null>(null);
//     const [currentFieldName, setCurrentFieldName] = useState<string>("");
//     const [originalFieldName, setOriginalFieldName] = useState<string>("");
//     const [selectedSoilId, setSelectedSoilId] = useState<string>("");
//     const [newCoordinates, setNewCoordinates] = useState<number[][][]>([]);

//     const [loading, setLoading] = useState(false);

//     const handleLoadMap = () => {
//         setMapLoaded(true);
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await apiField.getFieldDetails(fieldId);
//                 if (response.ok) {
//                     const fieldData = await response.json();
//                     setField(fieldData.data);
//                 } else {
//                     console.error(`Failed to fetch field details for ID: ${fieldId}`);
//                 }
//             } catch (error) {
//                 console.error("Error fetching field details:", error);
//             }
//         };

//         fetchData();
//     }, [fieldId]);

//     const handlePolygonComplete = (polygon: google.maps.Polygon) => {
//         const coordinates = polygon
//             .getPath()
//             .getArray()
//             .map(({ lat, lng }: google.maps.LatLng) => [lat(), lng()]);
//         console.log("Coordinates:", coordinates);
//         setNewCoordinates([coordinates]);
//     };

//     const onEditConfirm = async () => {
//         console.log("Entering onEditConfirm");
//         try {
//             console.log("Before onEditField");
//             console.log("selectedFieldIdForEdit:", selectedFieldIdForEdit);

//             // Ensure that newCoordinates is an array and not empty
//             if (selectedFieldIdForEdit && newCoordinates.length > 0) {
//                 console.log("Calling onEditField");
//                 await onEditField(selectedFieldIdForEdit, currentFieldName, selectedSoilId, newCoordinates);
//             }

//             console.log("After onEditField");
//             setSelectedFieldIdForEdit(null);
//             setCurrentFieldName("");
//             setSelectedSoilId("");
//         } catch (error) {
//             console.error("Error handling edit confirmation:", error);
//         }
//     };

//     const onEditField = async (fieldId: string, currentFieldName: string, selectedSoilId: string, newCoordinates: number[][][]) => {
//         console.log("onEditField called");

//         try {
//             setLoading(true);

//             console.log("Edit Field Data:", {
//                 fieldId,
//                 currentFieldName,
//                 selectedSoilId,
//                 newCoordinates,
//             });

//             const updatedFieldData: UpdateField = {
//                 name: currentFieldName,
//                 soilId: selectedSoilId,
//                 boundary: {
//                     type: "Polygon",
//                     coordinates: newCoordinates,
//                 },
//             };

//             console.log("Updated Field Data:", updatedFieldData);

//             const response = await apiField.editField(fieldId, updatedFieldData);
//             console.log("Response from Server:", response);

//             if (response.ok) {
//             } else {
//                 const responseBody = await response.json();
//                 console.error(`Failed to edit field with ID: ${fieldId}`, responseBody);
//             }
//         } catch (error) {
//             console.error("Error editing field:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <h1>Edit Field - {field?.name}</h1>
//             <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} onLoad={handleLoadMap} libraries={["drawing"]}>
//                 {mapLoaded && (
//                     <GoogleMap center={mapCenter} zoom={mapZoom} mapContainerStyle={{ height: "500px", width: "100%" }}>
//                         <DrawingManager
//                             options={{
//                                 drawingControl: true,
//                                 drawingControlOptions: {
//                                     position: window.google.maps.ControlPosition.TOP_CENTER,
//                                     drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
//                                 },
//                                 polygonOptions: {
//                                     editable: true,
//                                 },
//                             }}
//                             onPolygonComplete={handlePolygonComplete}
//                         />
//                         {field?.boundary?.coordinates.map((coordinates: any, index: number) => (
//                             <Polygon key={index} paths={coordinates.map((coord: number[]) => ({ lat: coord[0], lng: coord[1] }))} editable={true} />
//                         ))}
//                     </GoogleMap>
//                 )}
//             </LoadScript>

//             <p>Current Field Name: {originalFieldName}</p>
//             <p>Current Field Soil: {findSoilName(selectedSoilId)}</p>
//             <input type="text" placeholder="Enter new machine brand" value={currentFieldName} onChange={(e) => setCurrentFieldName(e.target.value)} />
//             <div>
//                 <label>Select Soil:</label>
//                 <select value={selectedSoilId} onChange={(e) => setSelectedSoilId(e.target.value)}>
//                     <option value="" disabled>
//                         Select Soil
//                     </option>
//                     {soils.map((soil) => (
//                         <option key={soil.id} value={soil.id}>
//                             {soil.name}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             <button onClick={onEditConfirm} disabled={loading}>
//                 Confirm Edit
//             </button>
//         </div>
//     );
// };

// export default EditFieldPage;
