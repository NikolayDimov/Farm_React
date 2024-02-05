import { useState } from "react";
import { Crop } from "./Crop.static";

export function useCropFormError() {
    const [formErrors, setFormErrors] = useState<Crop>({
        name: "",
    });

    function validateCropName(name: string): boolean {
        let isNameValid = true;

        if (name === "") {
            setFormErrors((errors) => ({ ...errors, name: "Crop name is required" }));
            isNameValid = false;
        } else if (!name.match(/^[A-Za-z0-9\s\-]+$/)) {
            setFormErrors((errors) => ({ ...errors, name: "Crop must contain only letters and numbers" }));
            isNameValid = false;
        } else if (name.length < 3) {
            setFormErrors((errors) => ({ ...errors, name: "Crop name must be at least 3 characters long" }));
            isNameValid = false;
        } else {
            setFormErrors((errors) => ({ ...errors, name: "" }));
        }
        return isNameValid;
    }

    return {
        formErrors,
        validateCropName,
    };
}
