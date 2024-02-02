import React, { useState, useEffect } from "react";
import { apiProcessingType } from "../../../services/apiProcessingType";
import { ProcessingType as ProcessingTypeProp } from "./ProcessingType.static";

const useProcessingType = () => {
    const [processingTypes, setProcessingTypes] = useState<ProcessingTypeProp[]>([]);
    const [processingTypeName, setProcessingTypeName] = useState("");

    const fetchProcessingTypes = async () => {
        try {
            const processingTypeData = await apiProcessingType.fetchProcessingTypes();
            setProcessingTypes(processingTypeData.data);
        } catch (error) {
            console.error("Error in fetching processingTypes", error);
        }
    };

    useEffect(() => {
        fetchProcessingTypes();
    }, []);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProcessingTypeName(e.target.value);
    };

    const createProcessingType = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!processingTypeName) {
                console.error("ProcessingType name cannot be empty");
                return;
            }

            const response = await apiProcessingType.createProcessingType(processingTypeName);

            if (response.ok) {
                setProcessingTypeName("");
                fetchProcessingTypes();
            } else {
                console.error("Failed to create a new ProcessingType in the database");
            }
        } catch (error) {
            console.error("Error creating a new ProcessingType:", error);
        }
    };

    return { processingTypes, createProcessingType, changeHandler, processingTypeName, fetchProcessingTypes };
};

export default useProcessingType;
