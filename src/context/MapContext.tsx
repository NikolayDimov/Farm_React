// MapContext.tsx
import React, { createContext, useContext, ReactNode } from "react";

interface Coordinates {
    latitude: number;
    longitude: number;
}

interface MapContextProps {
    onSelectLocation: (coordinates: Coordinates) => void;
}

const MapContext = createContext<MapContextProps | undefined>(undefined);

export const MapProvider: React.FC<{ value?: MapContextProps; children: ReactNode }> = ({ children, value }) => {
    return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

export const useMapContext = () => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error("useMapContext must be used within a MapProvider");
    }
    return context;
};
