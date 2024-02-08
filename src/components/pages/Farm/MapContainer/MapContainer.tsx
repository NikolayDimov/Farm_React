import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface MapContainerProps {
    coordinates?: number[];
    onSelectLocation: (coordinates: number[]) => void;
    onShowFarmClick: () => void; // Added onShowFarmClick prop
    selectedFarmCoordinates?: number[];
}

const StyledMapContainer = styled.div`
    height: 500px;
    width: 100%;
`;

const MapContainer: React.FC<MapContainerProps> = ({ coordinates, onSelectLocation, onShowFarmClick, selectedFarmCoordinates }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const [isNode, setIsNode] = useState<boolean>(false);
    const marker = useRef<google.maps.Marker | null>(null);
    const map = useRef<google.maps.Map | null>(null);

    const showFarmOnMap = () => {
        if (coordinates && coordinates.length === 2 && map.current) {
            dropPinOnMap(coordinates);
        }
    };

    useEffect(() => {
        setIsNode(typeof process !== "undefined" && process.versions != null && process.versions.node != null);
    }, []);

    useEffect(() => {
        const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

        if (!googleApiKey) {
            console.error("Google Maps API key is not defined.");
            return;
        }

        const existingScript = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]');

        if (!existingScript) {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
            script.async = true;
            script.defer = true;

            script.onload = () => {
                if (!mapContainerRef.current) {
                    console.error("Map container element not found.");
                    return;
                }

                const newMap = new window.google.maps.Map(mapContainerRef.current, {
                    center: { lat: 46, lng: 15 },
                    zoom: 5,
                });

                newMap.addListener("click", (event) => {
                    const clickedCoordinates: number[] = [event.latLng.lat(), event.latLng.lng()];
                    console.log("Selected coordinates:", clickedCoordinates);
                    onSelectLocation(clickedCoordinates);
                    dropPinOnMap(clickedCoordinates);
                });

                map.current = newMap;
            };

            script.onerror = (error) => {
                console.error("Error loading Google Maps script:", error);
            };

            document.head.appendChild(script);
        }
    }, [onSelectLocation]);

    const dropPinOnMap = (coordinates: number[]) => {
        // Check if a marker already exists, if yes, remove it
        if (marker.current) {
            marker.current.setMap(null);
        }

        // Add a new marker at the selected farm's location
        const newMarker = new window.google.maps.Marker({
            position: { lat: coordinates[0], lng: coordinates[1] },
            map: map.current,
            animation: window.google.maps.Animation.DROP,
        });

        marker.current = newMarker;
    };

    useEffect(() => {
        if (coordinates && coordinates.length === 2 && map.current) {
            dropPinOnMap(coordinates);
        }
    }, [coordinates, map]);

    useEffect(() => {
        if (selectedFarmCoordinates && selectedFarmCoordinates.length === 2 && map.current) {
            dropPinOnMap(selectedFarmCoordinates);
        }
    }, [selectedFarmCoordinates, map]);

    return (
        <StyledMapContainer ref={mapContainerRef}>
            <button onClick={showFarmOnMap}>Show Farm</button>
            <button onClick={onShowFarmClick}>Show Farm (new)</button>
        </StyledMapContainer>
    );
};

export default MapContainer;
