// import React, { useEffect, useRef, useState } from "react";
// import { LoadScript, GoogleMap, DrawingManager, Polygon } from "@react-google-maps/api";
// import { GOOGLE_MAPS_API_KEY } from "../../pages/Field/Field.static";
// import styled from "styled-components";

// // Define your modal styles
// const GoogleMapModalOverlay = styled.div`
//     /* Your overlay styles */
// `;

// const GoogleMapModalContainer = styled.div`
//     /* Your modal container styles */
// `;

// const GoogleMapModalContent = styled.div`
//     /* Your modal content styles */
// `;

// const GoogleMapModalActions = styled.div`
//     /* Your modal actions styles */
// `;

// const GoogleMapModalButton = styled.button`
//     /* Your button styles */
// `;

// interface GoogleMapModalProps {
//     isVisible: boolean;
//     hideModal: () => void;
//     onSaveAndUnmountMap: () => void;
//     mapLoaded: boolean;
//     setMapLoaded: React.Dispatch<React.SetStateAction<boolean>>;
//     mapCenter: { lat: number; lng: number };
//     selectedFieldCoordinates: number[][][];
//     onPolygonComplete: (polygon: google.maps.Polygon) => void;
//     onUnmountHandler: (e: google.maps.Polygon) => void;
// }

// const GoogleMapModal: React.FC<GoogleMapModalProps> = ({
//     isVisible,
//     hideModal,
//     onSaveAndUnmountMap,
//     mapLoaded,
//     setMapLoaded,
//     mapCenter,
//     selectedFieldCoordinates,
//     onPolygonComplete,
//     onUnmountHandler,
// }) => {
//     const [isMapVisible, setIsMapVisible] = useState(true);
//     const polygonRef = useRef<google.maps.Polygon | null>(null);

//     const saveFieldAndUnmountMap = () => {
//         if (polygonRef.current) {
//             const updatedCoordinates = extractCoordinatesFromPolygon(polygonRef.current);
//             onSaveAndUnmountMap();
//             setMapLoaded(false);
//             polygonRef.current.setMap(null);
//             setIsMapVisible(true);
//         } else {
//             console.error("Polygon reference not available.");
//         }
//     };

//     const extractCoordinatesFromPolygon = (polygon: google.maps.Polygon): [number, number][][] => {
//         const paths = polygon.getPaths().getArray();
//         return paths.map((path) => path.getArray().map((latLng) => [latLng.lat(), latLng.lng()]));
//     };

//     return (
//         <GoogleMapModalOverlay style={{ display: isVisible ? "block" : "none" }}>
//             <GoogleMapModalContainer>
//                 <GoogleMapModalContent>
//                     <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["drawing"]} onLoad={() => setMapLoaded(true)}>
//                         {mapLoaded && (
//                             <GoogleMap center={mapCenter} zoom={15} mapContainerStyle={{ height: "500px", width: "400px" }}>
//                                 <DrawingManager
//                                     options={{
//                                         drawingControl: true,
//                                         drawingControlOptions: {
//                                             position: window.google.maps.ControlPosition.TOP_CENTER,
//                                             drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
//                                         },
//                                         polygonOptions: {
//                                             editable: true,
//                                         },
//                                     }}
//                                     onPolygonComplete={(polygon: google.maps.Polygon) => {
//                                         polygonRef.current = polygon;
//                                         onPolygonComplete(polygon);
//                                     }}
//                                 />
//                                 {selectedFieldCoordinates.map((coordinates, index) => (
//                                     <Polygon
//                                         key={index}
//                                         onUnmount={(e) => onUnmountHandler(e)}
//                                         paths={coordinates.map((coord) => ({ lat: coord[0], lng: coord[1] }))}
//                                         editable={true}
//                                     />
//                                 ))}
//                             </GoogleMap>
//                         )}
//                     </LoadScript>
//                 </GoogleMapModalContent>
//                 <GoogleMapModalActions>
//                     <GoogleMapModalButton
//                         onClick={() => {
//                             saveFieldAndUnmountMap();
//                             setIsMapVisible(false);
//                         }}
//                     >
//                         Save Field and Unmount Map
//                     </GoogleMapModalButton>
//                     <GoogleMapModalButton onClick={hideModal}>Unmount Google Map Modal</GoogleMapModalButton>
//                 </GoogleMapModalActions>
//             </GoogleMapModalContainer>
//         </GoogleMapModalOverlay>
//     );
// };

// export default GoogleMapModal;
