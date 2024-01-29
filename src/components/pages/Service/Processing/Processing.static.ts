export interface Processing {
    id?: string;
    date: Date;
    growingCropPeriodId: string;
    growingCropPeriod?: GrowingCropPeriod;
    processingTypeId: string;
    processingType?: ProcessingType;
    machineId: string;
    machine?: Machine;
}

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

export interface Soil {
    id?: string;
    name: string;
}

export interface Crop {
    id: string;
    name: string;
}

export interface ProcessingType {
    id?: string;
    name: string;
}

export interface Machine {
    id?: string;
    brand: string;
    model: string;
    registerNumber: string;
    farmId: string;
    farm?: Farm;
}

export interface Farm {
    id?: string;
    name: string;
    location: {
        type: string;
        coordinates: number[];
    };
}
