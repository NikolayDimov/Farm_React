import { GrowingCropPeriod } from "../GrowingCropPeriod/GrowingCropPeriod.static";
import { Machine } from "../Machine/Machine.static";
import { ProcessingType } from "../ProcessingType/ProcessingType.static";

export interface Processing {
    id?: string;
    date: Date;
    growingCropPeriodId: string;
    growingCropPeriod?: GrowingCropPeriod;
    processingTypeId: string;
    processingType?: ProcessingType;
    machineId: string;
    machine?: Machine;
    cropName?: string;
}
