import { Farm } from "../Farm/Farm.static";
import { Soil } from "../Soil/Soil.static";

export interface Field {
    id?: string;
    name: string;
    boundary: { type: string; coordinates: number[][][] };
    farmId: string;
    farm?: Farm;
    soilId: string;
    soil?: Soil;
}

export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

export interface FieldCoordinates {
    coordinates: number[][][];
}
