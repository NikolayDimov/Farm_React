import React, { useState, useEffect } from "react";
import { apiSoil } from "../../../services/apiSoil";
import { Soil as SoilProp } from "./Soil.static";
import { useFormError } from "../../common/Validations/useFormError";

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
            const soilsData = await apiSoil.fetchSoils();
            // setSoils(soilsData.data);
            setSoils([...soilsData.data.reverse()]);
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

            if (isCropValid || soilName) {
                const response = await apiSoil.createSoil(soilName);

                if (response.ok) {
                    setSoilName("");
                    fetchSoils();
                } else {
                    const responseData = await response.json();
                    const errorMsg = responseData.error.message;
                    setError(errorMsg);
                }
            }
        } catch (error: any) {
            console.log("errorMessage", error);
        }
    };

    useEffect(() => {
        fetchSoils();
    }, []);

    return { soils, createSoil, changeHandler, soilName, fetchSoils, error, formErrors, handleSoilNameBlur };
};

export default useSoil;
