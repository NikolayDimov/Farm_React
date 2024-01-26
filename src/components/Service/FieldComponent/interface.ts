export interface Field {
    id?: string;
    name: string;
    boundary: { type: string; coordinates: number[][][] };
    farmId: string;
    soilId: string;
    farm?: Farm;
    soil?: Soil;
}

export interface Soil {
    id: string;
    name: string;
}

export interface Farm {
    id: string;
    name: string;
}
