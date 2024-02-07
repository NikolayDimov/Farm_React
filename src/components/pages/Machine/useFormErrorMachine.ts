// useFormErrorMachine.ts

type FormErrorsMachine = {
    brand: string[];
    model: string[];
    regNumber: string[];
};

export const useFormErrorMachine = () => {
    const validateMachineBrand = (brand: string): string[] => {
        const errors: string[] = [];
        if (!brand.trim()) {
            errors.push("Brand cannot be empty");
        }
        return errors;
    };

    const validateMachineModel = (model: string): string[] => {
        const errors: string[] = [];
        if (!model.trim()) {
            errors.push("Model cannot be empty");
        }
        return errors;
    };

    const validateMachineRegNumber = (regNumber: string): string[] => {
        const errors: string[] = [];
        if (!regNumber.trim()) {
            errors.push("Register Number cannot be empty");
        }
        return errors;
    };

    return { validateMachineBrand, validateMachineModel, validateMachineRegNumber };
};
