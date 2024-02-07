import React, { useState, useEffect } from "react";
import { apiProcessingType } from "../../../services/apiProcessingType";
import { ProcessingType as ProcessingTypeProp } from "./ProcessingType.static";
import { useFormError } from "../../common/validations/useFormError";

const useProcessingType = () => {
    const [processingTypes, setProcessingTypes] = useState<ProcessingTypeProp[]>([]);
    const [processingTypeName, setProcessingTypeName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { formErrors, validateName } = useFormError();

    const handleProcessingTypeNameBlur = () => {
        validateName(processingTypeName);
    };

    const fetchProcessingTypes = async () => {
        try {
            const processingsTypeData = await apiProcessingType.fetchProcessingTypes();
            // new processingType to be last in the list
            // setProcessingTypes((prevProcessingTypes) => {
            //     const newProcessingTypes = processingsTypeData.data.filter(
            //         (newProcessingType: ProcessingTypeProp) => !prevProcessingTypes.some((prevProcessingType: ProcessingTypeProp) => prevProcessingType.id === newProcessingType.id)
            //     );
            //     return [...prevProcessingTypes, ...newProcessingTypes];
            // });

            setProcessingTypes(processingsTypeData.data);
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
            const isCropValid = validateName(processingTypeName);

            if (isCropValid || processingTypeName) {
                const response = await apiProcessingType.createProcessingType(processingTypeName);

                if (response.ok) {
                    setProcessingTypeName("");
                    fetchProcessingTypes();
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
        fetchProcessingTypes();
    }, []);

    return { processingTypes, createProcessingType, changeHandler, processingTypeName, fetchProcessingTypes, error, formErrors, handleProcessingTypeNameBlur };
};

export default useProcessingType;
