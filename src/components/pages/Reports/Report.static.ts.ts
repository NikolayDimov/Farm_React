export interface FarmsWithMostMachinesReportListProps {
    farmId: string;
    farmname: string;
    machinecount: number;
}

export interface FieldCountPerFarmAndCropProps {
    farmId: string;
    farmname: string;
    cropId: number;
    cropname: string;
    fieldcount: number;
}

export interface MostCommonSoilPerFarmProps {
    farmId: string;
    farmname: string;
    soilId: number;
    soilname: string;
    fieldcount: number;
}

export interface ProcessingReportProps {
    processingdate: string;
    processingtypename: string;
    fieldname: string;
    machinebrand: string;
    machinemodel: string;
    machineregisternumber: string;
    cropname: string;
    soilname: string;
    farmname: string;
}
