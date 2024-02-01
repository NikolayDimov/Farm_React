import React, { FormEvent } from "react";

interface AddProcessingTypePresentationProps {
    processingTypeName: string;
    loading: boolean;
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    createProcessingType: (e: FormEvent<HTMLFormElement>) => void;
}

const AddProcessingTypePresentation: React.FC<AddProcessingTypePresentationProps> = ({ processingTypeName, loading, changeHandler, createProcessingType }) => {
    return (
        <div>
            <h3>Add a New Processing Type</h3>
            <form onSubmit={createProcessingType}>
                <label>Processing Type Name:</label>
                <input type="text" value={processingTypeName} onChange={changeHandler} />
                <button type="submit" disabled={loading}>
                    {loading ? "Adding ProcessingType..." : "Add ProcessingType"}
                </button>
            </form>
        </div>
    );
};

export default AddProcessingTypePresentation;
