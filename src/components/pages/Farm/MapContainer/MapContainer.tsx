import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface MapContainerProps {
    coordinates?: number[];
    onSelectLocation: (coordinates: number[]) => void;
}

const StyledMapContainer = styled.div`
    height: 500px;
    width: 100%;
`;

const MapContainer: React.FC<MapContainerProps> = ({ coordinates, onSelectLocation }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const [isNode, setIsNode] = useState<boolean>(false);

    useEffect(() => {
        setIsNode(typeof process !== "undefined" && process.versions != null && process.versions.node != null);
    }, []);

    useEffect(() => {
        if (!isNode) {
            const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

            if (!googleApiKey) {
                console.error("Google Maps API key is not defined.");
                return;
            }

            // Check if the Google Maps script has already been added to the DOM
            if (!document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]')) {
                const script = document.createElement("script");
                script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}`;
                script.async = true;
                script.defer = true;

                script.onload = () => {
                    if (!mapContainerRef.current) {
                        console.error("Map container element not found.");
                        return;
                    }

                    const map = new window.google.maps.Map(mapContainerRef.current, {
                        center: { lat: 46, lng: 15 },
                        zoom: 5,
                    });

                    map.addListener("click", (event) => {
                        const coordinates: number[] = [event.latLng.lat(), event.latLng.lng()];
                        console.log("Selected coordinates:", coordinates);
                        onSelectLocation(coordinates);
                        dropPinOnMap(map, coordinates);
                    });
                };

                script.onerror = (error) => {
                    console.error("Error loading Google Maps script:", error);
                };

                document.head.appendChild(script);
            }
        }
    }, [isNode, onSelectLocation]);

    const dropPinOnMap = (googleMap: google.maps.Map, coordinates: number[]) => {
        new google.maps.Marker({
            position: { lat: coordinates[0], lng: coordinates[1] },
            map: googleMap,
        });
    };

    useEffect(() => {
        if (!isNode && coordinates && coordinates.length === 2) {
            // Center the map on the selected farm's coordinates
            const map = new window.google.maps.Map(mapContainerRef.current!, {
                center: { lat: coordinates[0], lng: coordinates[1] },
                zoom: 15, // Adjust the zoom level as needed
            });

            // Add a marker at the selected farm's location
            new google.maps.Marker({
                position: { lat: coordinates[0], lng: coordinates[1] },
                map: map,
            });
        }
    }, [isNode, coordinates]);

    return <StyledMapContainer ref={mapContainerRef} />;
};

export default MapContainer;

// MapContainer.tsx
// import React, { useEffect, useRef } from "react";
// import styled from "styled-components";

// interface MapContainerProps {
//     coordinates?: number[];
//     onSelectLocation: (coordinates: number[]) => void;
// }

// const StyledMapContainer = styled.div`
//     height: 500px;
//     width: 100%;
// `;

// const MapContainer: React.FC<MapContainerProps> = ({ onSelectLocation }) => {
//     const mapContainerRef = useRef<HTMLDivElement | null>(null);

//     useEffect(() => {
//     const isNode = typeof process !== "undefined" && process.versions != null && process.versions.node != null;

//     if (!isNode) {
//         const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

//         if (!googleApiKey) {
//             console.error("Google Maps API key is not defined.");
//             return;
//         }

//         // Check if the Google Maps script has already been added to the DOM
//         if (!document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]')) {
//             const script = document.createElement("script");
//             script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}`;
//             script.async = true;
//             script.defer = true;

//             script.onload = () => {
//                 if (!mapContainerRef.current) {
//                     console.error("Map container element not found.");
//                     return;
//                 }

//                 const map = new window.google.maps.Map(mapContainerRef.current, {
//                     center: { lat: 46, lng: 15 },
//                     zoom: 5,
//                 });

//                 map.addListener("click", (event) => {
//                     const coordinates: number[] = [event.latLng.lat(), event.latLng.lng()];
//                     console.log("Selected coordinates:", coordinates);
//                     onSelectLocation(coordinates);
//                     dropPinOnMap(map, coordinates);
//                 });
//             };

//             script.onerror = (error) => {
//                 console.error("Error loading Google Maps script:", error);
//             };

//             document.head.appendChild(script);
//         }
//     }
//     }, [onSelectLocation]);

//     const dropPinOnMap = (googleMap: google.maps.Map, coordinates: number[]) => {
//         new google.maps.Marker({
//             position: { lat: coordinates[0], lng: coordinates[1] },
//             map: googleMap,
//         });
//     };

//     return <StyledMapContainer ref={mapContainerRef} />;
// };

// export default MapContainer;
