import { Field } from "../Field/Field.static";
import { Crop } from "../Crop/Crop.static";

// GrowingCropPeriod.interface.ts
export interface GrowingCropPeriod {
    id?: string;
    fieldId: string;
    field?: Field;
    cropId: string;
    crop?: Crop;
}
