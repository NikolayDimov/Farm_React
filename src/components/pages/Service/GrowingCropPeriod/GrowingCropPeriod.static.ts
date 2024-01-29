export interface GrowingCropPeriod {
    id?: string;
    fieldId: string;
    field?: Field;
    cropId: string;
    crop?: Crop;
}

export interface Field {
    id: string;
    name: string;
}

export interface Crop {
    id: string;
    name: string;
}
