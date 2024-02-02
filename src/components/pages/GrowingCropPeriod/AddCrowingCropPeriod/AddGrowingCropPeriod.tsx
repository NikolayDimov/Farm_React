import React from "react";
import { Field } from "../../Field/Field.static";
import { Crop } from "../../Crop/Crop.static";
import UserRoleHOC from "../../UserRoleHOC";

interface AddGrowingCropPeriodPresentationProps {
    createdValues: {
        newFieldId: string;
        newCropId: string;
    };
    fields: Field[];
    crops: Crop[];
    errorMessage: string;
    loading: boolean;
    changeHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleAddGrowingCropPeriod: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AddGrowingCropPeriodPresentation: React.FC<AddGrowingCropPeriodPresentationProps> = ({
    createdValues,
    fields,
    crops,
    errorMessage,
    loading,
    changeHandler,
    handleAddGrowingCropPeriod,
}) => {
    return (
        <UserRoleHOC>
            <h3>Add a New GrowingCropPeriod</h3>
            <form onSubmit={handleAddGrowingCropPeriod}>
                <label>Field:</label>
                <select name="newFieldId" value={createdValues.newFieldId} onChange={changeHandler}>
                    <option value="">Select Field</option>
                    {fields.map((field) => (
                        <option key={field.id} value={field.id}>
                            {field.name}
                        </option>
                    ))}
                </select>
                <label>Crop:</label>
                <select name="newCropId" value={createdValues.newCropId} onChange={changeHandler}>
                    <option value="">Select Soil</option>
                    {crops.map((crop) => (
                        <option key={crop.id} value={crop.id}>
                            {crop.name}
                        </option>
                    ))}
                </select>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "Creating GrowingCropPeriod..." : "Create GrowingCropPeriod"}
                </button>
            </form>
        </UserRoleHOC>
    );
};

export default AddGrowingCropPeriodPresentation;
