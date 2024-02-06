import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { GoogleMap, LoadScript, DrawingManager } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from "../Field.static";

interface MapContainerProps {
    onSelectLocation: (coordinates: number[][][]) => void;
    initialCoordinates?: number[][][];
    isMapVisible: boolean;
}

const StyledMapContainer = styled.div`
    height: 500px;
    width: 100%;
`;

// const drawingManagerOptions = {
//     drawingControl: true,
//     drawingControlOptions: {
//         position: window.google.maps.ControlPosition.TOP_CENTER,
//         drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
//     },
//     polygonOptions: {
//         editable: true,
//     },
// };

const MapContainer: React.FC<MapContainerProps> = ({ onSelectLocation, initialCoordinates, isMapVisible }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const [userDrawnCoordinates, setUserDrawnCoordinates] = useState<number[][][]>(initialCoordinates || []);

    const onLoad = (map: google.maps.Map) => {
        const drawingManager = new window.google.maps.drawing.DrawingManager({
            drawingControl: true,
            drawingControlOptions: {
                position: window.google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
            },
            polygonOptions: {
                editable: true,
            },
        });

        drawingManager.setMap(map);

        setUserDrawnCoordinates(initialCoordinates || []);

        window.google.maps.event.addListener(drawingManager, "overlaycomplete", (event: google.maps.drawing.OverlayCompleteEvent) => {
            if (event.type === "polygon" && event.overlay instanceof google.maps.Polygon && event.overlay.getPath) {
                const coordinates: number[][][] = event.overlay
                    .getPath()
                    .getArray()
                    .map((latLng: google.maps.LatLng) => [[latLng.lat(), latLng.lng()]]);
                console.log("Drawing complete. Coordinates:", coordinates);
                onSelectLocation(coordinates);
            }
        });
    };

    return (
        <StyledMapContainer>
            <LoadScript
                googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                libraries={["drawing"]}
                onError={(error) => console.error("LoadScript error:", error)}
                onLoad={() => console.log("LoadScript loaded successfully")}
            >
                <GoogleMap center={{ lat: 46, lng: 15 }} zoom={5} mapContainerStyle={{ height: "100%", width: "100%" }} onLoad={onLoad} />
            </LoadScript>
        </StyledMapContainer>
    );
};

export default MapContainer;
