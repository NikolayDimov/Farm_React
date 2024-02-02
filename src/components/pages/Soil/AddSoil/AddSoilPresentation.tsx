import React, { FormEvent } from "react";
import { useAuth } from "../../../../context/AuthContext";

interface AddSoilPresentationProps {
    soilName: string;
    loading: boolean;
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    createSoil: (e: FormEvent<HTMLFormElement>) => void;
}

const AddSoilPresentation: React.FC<AddSoilPresentationProps> = ({ soilName, loading, changeHandler, createSoil }) => {
    const { user } = useAuth();
    const canUserViewForm = user?.role === "OPERATOR" || user?.role === "OWNER";

    if (!canUserViewForm) {
        return null;
    }

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
