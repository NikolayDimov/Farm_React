import React, { useState, useEffect } from "react";
import { apiSoil } from "../../../services/apiSoil";
import { Soil as SoilProp } from "./Soil.static";
import { useFormError } from "../../common/validations/useFormError";

const useSoil = () => {
    const [soils, setSoils] = useState<SoilProp[]>([]);
    const [soilName, setSoilName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { formErrors, validateName } = useFormError();

    const handleSoilNameBlur = () => {
        validateName(soilName);
    };

    const fetchSoils = async () => {
        try {
            const soilData = await apiSoil.fetchSoils();
            setSoils(soilData.data);
        } catch (error) {
            console.error("Error in fetching soils", error);
        }
    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSoilName(e.target.value);
    };

    const createSoil = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const isCropValid = validateName(soilName);

            if (!isCropValid || !soilName) {
                console.log(`crop: ${soilName}`);
            } else {
                // formErrors.name = "";

                const response = await apiSoil.createSoil(soilName);

                if (response.ok) {
                    setSoilName("");
                    fetchSoils();
                } else {
                    const responseData = await response.json();
                    console.error(responseData);
                }
            }
        } catch (error: any) {
            const errorMessage = error.message || "An unexpected error occurred.";
            // setError(errorMessage);
            // const errorMessage = error instanceof Error ? error.message : "non";

            console.log("errorMessage", errorMessage);
            setError(errorMessage);
        }
    };

    useEffect(() => {
        fetchSoils();
    }, []);

    return { soils, createSoil, changeHandler, soilName, fetchSoils, error, formErrors, handleSoilNameBlur };
};

export default useSoil;
