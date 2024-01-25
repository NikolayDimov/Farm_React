import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface MapContainerProps {
  onSelectLocation: (coordinates: number[][]) => void;
}

const StyledMapContainer = styled.div`
  height: 400px;
  width: 100%;
`;

const MapContainer: React.FC<MapContainerProps> = ({ onSelectLocation }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [isOutlining, setIsOutlining] = useState(false);

  const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

  const loadGoogleMapsScript = () => {
    const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!googleApiKey) {
      console.error('Google Maps API key is not defined.');
      return;
    }

    if (!document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]')) {
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
        const coordinates: number[][] = event.overlay
          .getPath()
          .getArray()
          .map((latLng: google.maps.LatLng) => [latLng.lat(), latLng.lng()]);
        onSelectLocation(coordinates);
        setIsOutlining(false);
      }
    });

    map.addListener('click', (event: google.maps.MouseEvent) => {
      if (isOutlining) {
        const coordinates: number[] = [event.latLng.lat(), event.latLng.lng()];
        onSelectLocation([coordinates]);
        dropPinOnMap(map, coordinates);
      }
    });
  };

  useEffect(() => {
    if (!isNode) {
      loadGoogleMapsScript();
    }
  }, [isNode]);

  const startOutlining = () => {
    setIsOutlining(true);
  };

  const dropPinOnMap = (map: google.maps.Map, coordinates: number[]) => {
    new window.google.maps.Marker({
      position: { lat: coordinates[0], lng: coordinates[1] },
      map: map,
    });
  };

  return <StyledMapContainer ref={mapContainerRef} />;
};

export default MapContainer;
