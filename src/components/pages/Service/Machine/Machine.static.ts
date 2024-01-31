import { Farm } from "../../Profile/Farm/Farm.static";

export interface Machine {
    id?: string;
    brand: string;
    model: string;
    registerNumber: string;
    farmId: string;
    farm?: Farm;
}
