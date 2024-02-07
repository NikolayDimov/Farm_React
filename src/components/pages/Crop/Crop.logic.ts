import React, { useState, useEffect } from "react";
import { apiCrop } from "../../../services/apiCrop";
import { Crop as CropProp } from "./Crop.static";
import { useFormError } from "../../common/validations/useFormError";

const useCrop = () => {
    const [crops, setCrops] = useState<CropProp[]>([]);
    const [cropName, setCropName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { formErrors, validateName } = useFormError();

    const handleCropNameBlur = () => {
        validateName(cropName);
    };

    const fetchCrops = async () => {
        try {
            const cropData = await apiCrop.fetchCrops();
            setCrops(cropData.data);
        } catch (error) {
            console.error("Error in fetching crops", error);
        }
    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCropName(e.target.value);
    };

    const createCrop = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const isCropValid = validateName(cropName);

            if (isCropValid || cropName) {
                const response = await apiCrop.createCrop(cropName);

                if (response.ok) {
                    setCropName("");
                    fetchCrops();
                } else {
                    const responseData = await response.json();
                    const errorMsg = responseData.error.message;
                    setError(errorMsg);
                }
            }
        } catch (error) {
            console.log("errorMessage", error);
        }
    };

    useEffect(() => {
        fetchCrops();
    }, []);

    return { crops, createCrop, changeHandler, cropName, fetchCrops, error, formErrors, handleCropNameBlur };
};

export default useCrop;
