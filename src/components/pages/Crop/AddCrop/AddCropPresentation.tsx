import React, { FormEvent } from "react";
import UserRoleHOC from "../../UserRoleHOC";

interface AddCropPresentationProps {
    cropName: string;
    loading: boolean;
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    createCrop: (e: FormEvent<HTMLFormElement>) => void;
}

const AddCropPresentation: React.FC<AddCropPresentationProps> = ({ cropName, loading, changeHandler, createCrop }) => {
    return (
        <UserRoleHOC>
            <h3>Add a New Crop</h3>
            <form onSubmit={createCrop}>
                <label>Crop Name:</label>
                <input type="text" value={cropName} onChange={changeHandler} />
                <button type="submit" disabled={loading}>
                    {loading ? "Adding Crop..." : "Add Crop"}
                </button>
            </form>
        </UserRoleHOC>
    );
};

export default AddCropPresentation;
