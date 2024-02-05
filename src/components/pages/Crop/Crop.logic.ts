import React, { useState, useEffect } from "react";
import { apiCrop } from "../../../services/apiCrop";
import { Crop as CropProp } from "./Crop.static";
import { useCropFormError } from "./CropErrorHadnler";

const useCrop = () => {
    const [crops, setCrops] = useState<CropProp[]>([]);
    const [cropName, setCropName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { formErrors, validateCropName } = useCropFormError();

    const handleCropNameBlur = () => {
        validateCropName(cropName);
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
            const isCropValid = validateCropName(cropName);

            if (!isCropValid || !cropName) {
                console.log(`crop: ${cropName}`);
            } else {
                // formErrors.name = "";

                const response = await apiCrop.createCrop(cropName);

                if (response.ok) {
                    setCropName("");
                    fetchCrops();
                } else {
                    const responseData = await response.json();
                    setError(responseData.error?.message || "Failed to create a new Crop");
                    // const responseData = await response.json();
                    // const errorMessage = responseData.error?.message || "Failed to create a new Crop";
                    // throw new Error(errorMessage);
                }
            }
        } catch (error: any) {
            console.error("Unexpected error:", error);
        }
    };

    console.log("fromerr", error);

    useEffect(() => {
        fetchCrops();
    }, []);

    return { crops, createCrop, changeHandler, cropName, fetchCrops, error, formErrors, handleCropNameBlur };
};

export default useCrop;
