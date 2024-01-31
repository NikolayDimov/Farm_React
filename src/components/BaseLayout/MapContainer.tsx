
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

interface MapContainerProps {
  onSelectLocation: (coordinates: number[][][]) => void;
  outlinedCoordinates: number[][][];
}

const StyledMapContainer = styled.div`
  height: 400px;
  width: 100%;
`;

const MapContainer: React.FC<MapContainerProps> = ({ onSelectLocation, outlinedCoordinates }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

      if (!googleApiKey) {
        console.error('Google Maps API key is not defined.');
        return;
      }

      if (!window.google || !window.google.maps) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=drawing`;
        script.async = true;
        script.defer = true;

        script.onload = initializeMap;
        script.onerror = (error) => {
          console.error('Error loading Google Maps script:', error);
        };

        document.head.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (!mapContainerRef.current) {
        console.error('Map container element not found.');
        return;
      }

      const map = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat: 0, lng: 0 },
        zoom: 2,
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

      window.google.maps.event.addListener(drawingManager, 'overlaycomplete', (event) => {
        if (event.type === 'polygon' && event.overlay.getPath) {
          const coordinates: number[][][] = event.overlay
            .getPath()
            .getArray()
            .map((latLng: google.maps.LatLng) => [latLng.lat(), latLng.lng()]);
          onSelectLocation(coordinates);
        }
      });
    };

    loadGoogleMapsScript();


  }, []);

  return <StyledMapContainer ref={mapContainerRef} />;
};

export default MapContainer;
