import React, { FormEvent, useEffect, useState } from "react";
import { GrowingCropPeriod as GCPProp } from "./GrowingCropPeriod.static";
import { Field } from "../Field/Field.static";
import { Crop } from "../Crop/Crop.static";
import { apiField } from "../../../services/apiField";
import { apiCrop } from "../../../services/apiCrop";
import { apiGrowingCropPeriod } from "../../../services/apiGrowingCropPeriod";

const useGrowingCropPeriod = () => {
    const [growingCropPeriods, setGrowingCropPeriods] = useState<GCPProp[]>([]);
    const [createdValues, setCreatedValues] = useState({
        newFieldId: "",
        newCropId: "",
    });

    const [fields, setFields] = useState<Field[]>([]);
    const [crops, setCrops] = useState<Crop[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const findFieldName = (fieldId: string): string => {
        const field = fields.find((field) => field.id === fieldId);
        return field ? field.name : "Unknown field";
    };

    const findCropName = (cropId: string): string => {
        const crop = crops.find((crop) => crop.id === cropId);
        return crop ? crop.name : "Unknown crop";
    };

    const fetchFields = async () => {
        try {
            const fieldsData = await apiField.fetchFields();
            setFields(fieldsData.data);
        } catch (error) {
            console.error("Error fetching fields:", error);
        }
    };

    const fetchCrops = async () => {
        try {
            const cropsData = await apiCrop.fetchCrops();
            setCrops(cropsData.data);
        } catch (error) {
            console.error("Error fetching crops:", error);
        }
    };

    const fetchGCPs = async () => {
        try {
            const gcpData = await apiGrowingCropPeriod.fetchGCP();
            const fieldsData = await apiField.fetchFields();
            const cropsData = await apiCrop.fetchCrops();

            setGrowingCropPeriods(gcpData.data);
            setFields(fieldsData.data);
            setCrops(cropsData.data);

            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setCreatedValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    const createGrowingCropPeriod = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!createdValues.newFieldId || !createdValues.newCropId) {
                setErrorMessage("Field and Crop are required.");
                return;
            }

            setLoading(true);

            const newGrowingCropPeriodData: GCPProp = {
                fieldId: createdValues.newFieldId,
                cropId: createdValues.newCropId,
            };

            const response = await apiGrowingCropPeriod.createGrowingCropPeriod(newGrowingCropPeriodData);

            if (response.ok) {
                const newGrowingCropPeriodId: GCPProp = {
                    fieldId: createdValues.newFieldId,
                    cropId: createdValues.newCropId,
                };

                setGrowingCropPeriods((prevGrowingCropPeriods) => [...prevGrowingCropPeriods, newGrowingCropPeriodId]);

                setCreatedValues({
                    newFieldId: "",
                    newCropId: "",
                });
                setErrorMessage("");
            } else {
                console.error("Failed to create a new gcp in the database");
                const responseText = await response.text();
                console.error("Response text:", responseText);
            }
        } catch (error) {
            console.error("Failed to create a new gcp in the database:", error);
            setErrorMessage("Failed to create a new gcp in the database");
        } finally {
            setLoading(false);
        }

        useEffect(() => {
            fetchFields();
            fetchCrops();
            fetchGCPs();
        }, []);
    };

    return {
        createdValues,
        fields,
        crops,
        growingCropPeriods,
        createGrowingCropPeriod,
        changeHandler,
        errorMessage,
        loading,
        fetchGCPs,
        fetchFields,
        fetchCrops,
        findFieldName,
        findCropName,
    };
};

export default useGrowingCropPeriod;
