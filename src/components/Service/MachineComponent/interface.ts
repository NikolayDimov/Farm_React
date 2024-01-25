export interface Machine {
    id?: string;
    brand: string;
    model: string;
    registerNumber: string;
    farmId: string;
    farm?: Farm;
}

// export interface MachineListReport extends Machine {
//     name: string;
// }

export interface Farm {
    id: string;
    name: string;
}
