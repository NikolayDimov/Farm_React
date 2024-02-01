import React, { FormEvent } from "react";

interface AddSoilPresentationProps {
    soilName: string;
    loading: boolean;
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    createSoil: (e: FormEvent<HTMLFormElement>) => void;
}

const AddSoilPresentation: React.FC<AddSoilPresentationProps> = ({ soilName, loading, changeHandler, createSoil }) => {
    return (
        <div>
            <h3>Add a New Soil</h3>
            <form onSubmit={createSoil}>
                <label>Soil Name:</label>
                <input type="text" value={soilName} onChange={changeHandler} />
                <button type="submit" disabled={loading}>
                    {loading ? "Adding Soil..." : "Add Soil"}
                </button>
            </form>
        </div>
    );
};

export default AddSoilPresentation;
