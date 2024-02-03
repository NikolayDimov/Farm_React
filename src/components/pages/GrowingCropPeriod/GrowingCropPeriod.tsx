import React from "react";
import { GrowingCropPeriod } from "./GrowingCropPeriod.static";
import useGrowingCropPeriod from "./GrowingCropPeriod.logic";
import UserRoleHOC from "../UserRoleHOC";
import GrowingCropPeriodList from "./GrowingCropPeriodList/GrowingCropPeriodList";

const GrowingCropPeriod: React.FC = () => {
    const { createdValues, fields, crops, growingCropPeriods, createGrowingCropPeriod, changeHandler, errorMessage, loading, findFieldName, findCropName } = useGrowingCropPeriod();

    return (
        <>
            <UserRoleHOC>
                <h3>Add a New GrowingCropPeriod</h3>
                <form onSubmit={createGrowingCropPeriod}>
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
            <GrowingCropPeriodList growingCropPeriods={growingCropPeriods} findFieldName={findFieldName} findCropName={findCropName} />
        </>
    );
};

export default GrowingCropPeriod;
