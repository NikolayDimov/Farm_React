import React, { useState, FormEvent } from "react";
import AddProcessingTypePresentation from "./AddProcessingTypePresentation";
import { apiProcessingType } from "../../../../services/apiProcessingType";

interface AddProcessingTypeLogicProps {
    fetchProcessingTypes: () => void;
}

const AddProcessingTypeLogic: React.FC<AddProcessingTypeLogicProps> = ({ fetchProcessingTypes }) => {
    const [processingTypeName, setProcessingTypeName] = useState("");
    const [loading, setLoading] = useState(false);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProcessingTypeName(e.target.value);
    };

    async function createProcessingType(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await apiProcessingType.createProcessingType(processingTypeName);

            if (response.ok) {
                setProcessingTypeName("");
                fetchProcessingTypes();
            } else {
                console.error("Failed to create a new ProcessingType in the database");
            }
        } catch (error) {
            console.error("Error creating a new ProcessingType:", error);
        } finally {
            setLoading(false);
        }
    }

    return <AddProcessingTypePresentation processingTypeName={processingTypeName} loading={loading} changeHandler={changeHandler} createProcessingType={createProcessingType} />;
};

export default AddProcessingTypeLogic;
