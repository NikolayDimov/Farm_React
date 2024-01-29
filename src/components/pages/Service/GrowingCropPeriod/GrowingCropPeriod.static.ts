// GrowingCropPeriod.interface.ts
export interface GrowingCropPeriod {
    id?: string;
    fieldId: string;
    field?: Field;
    cropId: string;
    crop?: Crop;
}

export interface Field {
    id?: string;
    name: string;
    boundary: { type: string; coordinates: number[][][] };
    farmId: string;
    farm?: Farm;
    soilId: string;
    soil?: Soil;
}

export interface Crop {
    id: string;
    name: string;
}

export interface Soil {
    id?: string;
    name: string;
}

export interface Farm {
    id?: string;
    name: string;
    location: {
        type: string;
        coordinates: number[];
    };
}
