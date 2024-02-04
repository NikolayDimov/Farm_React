import React, { useState, useEffect } from "react";
import { apiProcessingType } from "../../../services/apiProcessingType";
import { ProcessingType as ProcessingTypeProp } from "./ProcessingType.static";

const useProcessingType = () => {
    const [processingTypes, setProcessingTypes] = useState<ProcessingTypeProp[]>([]);
    const [processingTypeName, setProcessingTypeName] = useState("");

    const fetchProcessingTypes = async () => {
        try {
            const processingsTypeData = await apiProcessingType.fetchProcessingTypes();
            // new field to be last in the list
            setProcessingTypes((prevProcessingTypes) => {
                const newProcessingTypes = processingsTypeData.data.filter(
                    (newProcessingType: ProcessingTypeProp) => !prevProcessingTypes.some((prevProcessingType: ProcessingTypeProp) => prevProcessingType.id === newProcessingType.id)
                );
                return [...prevProcessingTypes, ...newProcessingTypes];
            });

            // setProcessingTypes(processingsTypeData.data);
        } catch (error) {
            console.error("Error in fetching processingTypes", error);
        }
    };

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

    useEffect(() => {
        fetchProcessingTypes();
    }, []);

    return { processingTypes, createProcessingType, changeHandler, processingTypeName, fetchProcessingTypes };
};

export default useProcessingType;
