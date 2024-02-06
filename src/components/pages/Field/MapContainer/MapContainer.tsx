import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

interface MapContainerProps {
    onSelectLocation: (coordinates: number[][][]) => void;
    initialCoordinates?: number[][][];
    isMapVisible: boolean;
}

const StyledMapContainer = styled.div`
    height: 500px;
    width: 100%;
`;

const MapContainer: React.FC<MapContainerProps> = ({ onSelectLocation, initialCoordinates, isMapVisible }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const [userDrawnCoordinates, setUserDrawnCoordinates] = useState<number[][][]>(initialCoordinates || []);
    // const [userDrawnCoordinates, setUserDrawnCoordinates] = useState<number[][][]>([
    //     [
    //         [42.175, 24.655],
    //         [42.179, 24.662],
    //         [42.175, 24.67],
    //         [42.174, 24.666],
    //         [42.172, 24.663],
    //         [42.173, 24.66],
    //     ],
    // ]);

    useEffect(() => {
        const loadGoogleMapsScript = () => {
            const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

            if (!googleApiKey) {
                console.error("Google Maps API key is not defined.");
                return;
            }

            if (window.google && window.google.maps) {
                console.log("Google Maps API already loaded.");
                initializeMap();
                return;
            }

            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=drawing`;
            script.async = true;
            script.defer = true;

            script.onload = () => {
                console.log("Google Maps script loaded successfully");
                // Check if the drawing library is available before initializing the map
                if (window.google && window.google.maps && window.google.maps.drawing) {
                    initializeMap();
                } else {
                    console.error("Google Maps drawing library is not available.");
                }
            };

            script.onerror = (error) => {
                console.error("Error loading Google Maps script:", error);
            };

            document.head.appendChild(script);
        };

        const initializeMap = () => {
            if (!mapContainerRef.current) {
                console.error("Map container element not found.");
                return;
            }

            const map = new window.google.maps.Map(mapContainerRef.current, {
                center: { lat: 46, lng: 15 },
                zoom: 5,
            });

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

            window.google.maps.event.addListener(drawingManager, "overlaycomplete", (event) => {
                if (event.type === "polygon" && event.overlay.getPath) {
                    const coordinates: number[][][] = event.overlay
                        .getPath()
                        .getArray()
                        .map((latLng: google.maps.LatLng) => [latLng.lat(), latLng.lng()]);
                    console.log("Drawing complete. Coordinates:", coordinates);
                    onSelectLocation(coordinates);
                }
            });
        };

        loadGoogleMapsScript();
    }, [initialCoordinates]);

    useEffect(() => {
        console.log("MapContainer useEffect called");
        console.log("Selected coordinates:", userDrawnCoordinates);
    }, [userDrawnCoordinates]);

    return <StyledMapContainer ref={mapContainerRef} />;
};

export default MapContainer;
