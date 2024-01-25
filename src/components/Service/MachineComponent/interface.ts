export interface Machine {
    id?: string;
    brand: string;
    model: string;
    registerNumber: string;
    farmId: string;
    farm?: Farm;
}

export interface Farm {
    id: string;
    name: string;
}
