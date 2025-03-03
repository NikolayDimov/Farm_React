import React, { useEffect, useRef, useCallback, memo } from "react";
import styled from "styled-components";

interface MapContainerProps {
    coordinates?: number[];
    onSelectLocation: (coordinates: number[]) => void;
    onShowFarmClick: () => void;
    selectedFarmCoordinates?: number[];
}

const StyledMapContainer = styled.div`
    height: 500px;
    width: 90%;
    margin: 0 auto;
    border-radius: 10px;
`;

const MapContainer: React.FC<MapContainerProps> = ({ coordinates, onSelectLocation, onShowFarmClick, selectedFarmCoordinates }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const markerRef = useRef<any | null>(null);
    const mapRef = useRef<google.maps.Map | null>(null);

    const showFarmOnMap = useCallback(() => {
        if (coordinates && coordinates.length === 2 && mapRef.current) {
            dropPinOnMap(coordinates);
        }
    }, [coordinates]);

    useEffect(() => {
        const initMap = () => {
            if (!mapContainerRef.current) {
                console.error("Map container element not found.");
                return;
            }

            const mapOptions: google.maps.MapOptions = {
                center: { lat: 46, lng: 15 },
                zoom: 5,
                mapId: import.meta.env.VITE_GOOGLE_MAPS_MAP_ID
            };

            const newMap = new google.maps.Map(mapContainerRef.current, mapOptions);

            newMap.addListener("click", (event: google.maps.MapMouseEvent) => {
                if (event.latLng) {
                    const clickedCoordinates: number[] = [event.latLng.lat(), event.latLng.lng()];
                    console.log("Selected coordinates:", clickedCoordinates);
                    onSelectLocation(clickedCoordinates);
                    dropPinOnMap(clickedCoordinates);
                } else {
                    console.log("No coordinates available for this click event.");
                }
            });

            mapRef.current = newMap;
        };

        if (window.google && window.google.maps) {
            initMap();
        } else {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places&map_ids=${import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}`;
            script.async = true;
            script.defer = true;
            script.onload = initMap;
            script.onerror = (error) => {
                console.error("Error loading Google Maps script:", error);
            };

            document.head.appendChild(script);
        }
    }, [onSelectLocation]);

    const dropPinOnMap = useCallback(async (coordinates: number[]) => {
        if (!mapRef.current) {
            console.error("Map is not initialized.");
            return;
        }

        if (markerRef.current) {
            markerRef.current.map = null;
        }

        const { AdvancedMarkerElement }: any = await google.maps.importLibrary("marker");

        const newMarker = new AdvancedMarkerElement({
            position: { lat: coordinates[0], lng: coordinates[1] },
            map: mapRef.current,
        });

        markerRef.current = newMarker;

        // Set the map center to the coordinates of the pin
        mapRef.current?.setCenter({ lat: coordinates[0], lng: coordinates[1] });
        mapRef.current?.setZoom(10);
        console.log("Pin dropped at coordinates:", coordinates);
    }, []);

    useEffect(() => {
        if (coordinates && coordinates.length === 2 && mapRef.current) {
            dropPinOnMap(coordinates);
        }
    }, [coordinates, dropPinOnMap]);

    useEffect(() => {
        if (selectedFarmCoordinates && selectedFarmCoordinates.length === 2 && mapRef.current) {
            dropPinOnMap(selectedFarmCoordinates);
        }
    }, [selectedFarmCoordinates, dropPinOnMap]);

    return (
        <StyledMapContainer ref={mapContainerRef}>
            <button onClick={showFarmOnMap}>Show Farm</button>
            <button onClick={onShowFarmClick}>Show Farm (new)</button>
        </StyledMapContainer>
    );
};

const areEqual = (prevProps: MapContainerProps, nextProps: MapContainerProps) => {
    return prevProps.selectedFarmCoordinates === nextProps.selectedFarmCoordinates;
};

export default memo(MapContainer, areEqual);