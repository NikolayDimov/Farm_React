import { useState } from "react";

export interface FormErrors {
    newMachineBrand: string;
    newMachineModel: string;
    newMachineRegNumber: string;
}

export function useFormErrorMachineBrand() {
    const [formErrors, setFormErrors] = useState<FormErrors>({
        newMachineBrand: "",
        newMachineModel: "",
        newMachineRegNumber: "",
    });

    function validateMachineBrand(newMachineBrand: string): boolean {
        let isMachineBrandValid = true;

        if (newMachineBrand === "") {
            setFormErrors((errors) => ({ ...errors, newMachineBrand: "Brand is required" }));
            isMachineBrandValid = false;
        } else if (!newMachineBrand.match(/^[A-Za-z0-9\s\-]+$/)) {
            setFormErrors((errors) => ({ ...errors, newMachineBrand: "Must contain only letters and numbers" }));
            isMachineBrandValid = false;
        } else if (newMachineBrand.length < 3) {
            setFormErrors((errors) => ({ ...errors, newMachineBrand: "Must be at least 3 characters long" }));
            isMachineBrandValid = false;
        } else {
            setFormErrors((errors) => ({ ...errors, newMachineBrand: "" }));
        }
        return isMachineBrandValid;
    }

    return {
        formErrors,
        validateMachineBrand,
    };
}

export function useFormErrorMachineModel() {
    const [formErrors, setFormErrors] = useState<FormErrors>({
        newMachineBrand: "",
        newMachineModel: "",
        newMachineRegNumber: "",
    });

    function validateMachineModel(newMachineModel: string): boolean {
        let isMachineModelValid = true;

        if (newMachineModel === "") {
            setFormErrors((errors) => ({ ...errors, newMachineModel: "Model is required" }));
            isMachineModelValid = false;
        } else if (!newMachineModel.match(/^[A-Za-z0-9\s\-]+$/)) {
            setFormErrors((errors) => ({ ...errors, newMachineModel: "Must contain only letters and numbers" }));
            isMachineModelValid = false;
        } else if (newMachineModel.length < 3) {
            setFormErrors((errors) => ({ ...errors, newMachineModel: "Must be at least 3 characters long" }));
            isMachineModelValid = false;
        } else {
            setFormErrors((errors) => ({ ...errors, newMachineModel: "" }));
        }
        return isMachineModelValid;
    }

    return {
        formErrors,
        validateMachineModel,
    };
}

export function useFormErrorMachineRegNumber() {
    const [formErrors, setFormErrors] = useState<FormErrors>({
        newMachineBrand: "",
        newMachineModel: "",
        newMachineRegNumber: "",
    });

    function validateMachineRegNumber(newMachineRegNumber: string): boolean {
        let isMachineRegNumberValid = true;

        if (newMachineRegNumber === "") {
            setFormErrors((errors) => ({ ...errors, newMachineRegNumber: "Register Number is required" }));
            isMachineRegNumberValid = false;
        } else if (!newMachineRegNumber.match(/^[A-Za-z0-9\s\-]+$/)) {
            setFormErrors((errors) => ({ ...errors, newMachineRegNumber: "Must contain only letters and numbers" }));
            isMachineRegNumberValid = false;
        } else if (newMachineRegNumber.length < 3) {
            setFormErrors((errors) => ({ ...errors, newMachineRegNumber: "Must be at least 3 characters long" }));
            isMachineRegNumberValid = false;
        } else {
            setFormErrors((errors) => ({ ...errors, newMachineRegNumber: "" }));
        }
        return isMachineRegNumberValid;
    }

    return {
        formErrors,
        validateMachineRegNumber,
    };
}
