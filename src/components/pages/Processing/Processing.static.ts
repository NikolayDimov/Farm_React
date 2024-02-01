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

export interface EditProcessingProps {
    processingId: string;
    currentProcessingDate: string;
    onEditProcessing: (processingId: string, newProcessingDate: string, newProcessingTypeId: string, newMachineId: string) => void;
    onCloseModal: () => void;
}
