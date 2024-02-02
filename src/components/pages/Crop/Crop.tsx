import React from "react";
import CropList from "./CropList/CropList";
import useCrop from "./Crop.logic";
import UserRoleHOC from "../UserRoleHOC";

const Crop: React.FC = () => {
    const { crops, createCrop, changeHandler, cropName, fetchCrops } = useCrop();

    return (
        <>
            <UserRoleHOC>
                <h3>Add a New Crop</h3>
                <form onSubmit={createCrop}>
                    <label>Crop Name:</label>
                    <input type="text" value={cropName} onChange={changeHandler} />
                    <button type="submit">Add Crop</button>
                </form>
            </UserRoleHOC>

            <CropList crops={crops} fetchCrops={fetchCrops} />
        </>
    );
};

export default Crop;
