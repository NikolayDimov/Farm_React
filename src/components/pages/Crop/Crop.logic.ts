import React, { useState, useEffect } from "react";
import { apiCrop } from "../../../services/apiCrop";
import { Crop as CropProp } from "./Crop.static";

const useCrop = () => {
    const [crops, setCrops] = useState<CropProp[]>([]);
    const [cropName, setCropName] = useState("");

    const fetchCrops = async () => {
        try {
            const cropData = await apiCrop.fetchCrops();
            setCrops(cropData.data);
        } catch (error) {
            console.error("Error in fetching crops", error);
        }
    };

    useEffect(() => {
        fetchCrops();
    }, []);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCropName(e.target.value);
    };

    const createCrop = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!cropName) {
                console.error("Crop name cannot be empty");
                return;
            }

            const response = await apiCrop.createCrop(cropName);

            if (response.ok) {
                setCropName("");
                fetchCrops();
            } else {
                console.error("Failed to create a new Crop in the database");
            }
        } catch (error) {
            console.error("Error creating a new Crop:", error);
        }
    };

    return { crops, createCrop, changeHandler, cropName, fetchCrops };
};

export default useCrop;
