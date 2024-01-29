export interface GrowingCropPeriod {
    id?: string;
    field_id: string;
    field?: Field;
    crop_id: string;
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
