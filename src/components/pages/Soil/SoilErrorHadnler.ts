import { useState } from "react";
import { Soil } from "./Soil.static";

export function useSoilFormError() {
    const [formErrors, setFormErrors] = useState<Soil>({
        name: "",
    });

    function validateSoilName(name: string): boolean {
        let isNameValid = true;

        if (name === "") {
            setFormErrors((errors) => ({ ...errors, name: "Soil name is required" }));
            isNameValid = false;
        } else if (!name.match(/^[A-Za-z0-9\s\-]+$/)) {
            setFormErrors((errors) => ({ ...errors, name: "Soil must contain only letters and numbers" }));
            isNameValid = false;
        } else if (name.length < 3) {
            setFormErrors((errors) => ({ ...errors, name: "Soil name must be at least 3 characters long" }));
            isNameValid = false;
        } else {
            setFormErrors((errors) => ({ ...errors, name: "" }));
        }
        return isNameValid;
    }

    return {
        formErrors,
        validateSoilName,
    };
}
