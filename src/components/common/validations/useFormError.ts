import { useState } from "react";

export interface FormErrors {
    name: string;
}

export function useFormError() {
    const [formErrors, setFormErrors] = useState<FormErrors>({
        name: "",
    });

    function validateName(name: string): boolean {
        let isNameValid = true;

        if (name === "") {
            setFormErrors((errors) => ({ ...errors, name: "Name is required" }));
            isNameValid = false;
        } else if (!name.match(/^[A-Za-z0-9\s\-]+$/)) {
            setFormErrors((errors) => ({ ...errors, name: "Must contain only letters and numbers" }));
            isNameValid = false;
        } else if (name.length < 3) {
            setFormErrors((errors) => ({ ...errors, name: "Must be at least 3 characters long" }));
            isNameValid = false;
        } else {
            setFormErrors((errors) => ({ ...errors, name: "" }));
        }
        return isNameValid;
    }

    return {
        formErrors,
        validateName,
    };
}
