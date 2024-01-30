import { Farm } from "../../Profile/Farm/Farm.static";
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
