// Drop pin google maps

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface MapContainerProps {
  onSelectLocation: (coordinates: number[]) => void;
}

const StyledMapContainer = styled.div`
  height: 400px;
  width: 100%;
`;

const MapContainer: React.FC<MapContainerProps> = ({ onSelectLocation }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
  
    if (!isNode) {
      const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
      if (!googleApiKey) {
        console.error('Google Maps API key is not defined.');
        return;
      }
  
      // Check if the Google Maps script has already been added to the DOM
      if (!document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]')) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}`;
        script.async = true;
        script.defer = true;
  
        script.onload = () => {
          if (!mapContainerRef.current) {
            console.error('Map container element not found.');
            return;
          }
  
          const map = new window.google.maps.Map(mapContainerRef.current, {
            center: { lat: 0, lng: 0 },
            zoom: 2,
          });
  
          map.addListener('click', (event) => {
            const coordinates = [event.latLng.lat(), event.latLng.lng()];
            onSelectLocation(coordinates);
            dropPinOnMap(map, coordinates);
          });
        };
  
        script.onerror = (error) => {
          console.error('Error loading Google Maps script:', error);
        };
  
        document.head.appendChild(script);
      }
    }
  }, [onSelectLocation]);
  

  const dropPinOnMap = (map: google.maps.Map, coordinates: number[]) => {
    new window.google.maps.Marker({
      position: { lat: coordinates[0], lng: coordinates[1] },
      map: map,
    });
  };

  return <StyledMapContainer ref={mapContainerRef} />;
};

export default MapContainer;











// import React, { useEffect } from 'react';
// import styled from 'styled-components';

// interface MapContainerProps {
//   onSelectLocation: (coordinates: number[]) => void;
// }

// const StyledMapContainer = styled.div`
//   height: 400px;
//   width: 100%;
// `;

// const MapContainer: React.FC<MapContainerProps> = ({ onSelectLocation }) => {
//   useEffect(() => {
//     // Check if running in Node.js (server-side rendering)
//     const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

//     if (!isNode) {
//       // Running in a browser
//       const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

//       if (!googleApiKey) {
//         console.error('Google Maps API key is not defined.');
//         return;
//       }

//       const script = document.createElement('script');
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}`;
//       script.async = true;
//       script.defer = true;

//       script.onload = () => {
//         const mapElement = document.getElementById('map');

//         if (!mapElement) {
//           console.error('Map container element not found.');
//           return;
//         }

//         const map = new window.google.maps.Map(mapElement, {
//           center: { lat: 0, lng: 0 },
//           zoom: 2,
//         });

//         map.addListener('click', (event) => {
//           const coordinates = [event.latLng.lat(), event.latLng.lng()];
//           onSelectLocation(coordinates);
//         });
//       };

//       script.onerror = (error) => {
//         console.error('Error loading Google Maps script:', error);
//       };

//       document.head.appendChild(script);
//     }
//   }, [onSelectLocation]);

//   return <StyledMapContainer id="map" />;
// };

// export default MapContainer;