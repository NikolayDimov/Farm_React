import React from "react";
import CropList from "./CropList/CropList";
import useCrop from "./Crop.logic";
import UserRoleHOC from "../UserRoleHOC";
import InputField from "../../common/InputFiled/InputField";

const Crop: React.FC = () => {
    const { crops, createCrop, changeHandler, cropName, fetchCrops, error, formErrors, handleCropNameBlur } = useCrop();

    return (
        <>
            <UserRoleHOC>
                <h3>Add a New Crop</h3>
                <form onSubmit={createCrop}>
                    <InputField
                        label="Crop Name"
                        type="text"
                        id="cropName"
                        name="cropName"
                        value={cropName}
                        onChange={changeHandler}
                        onBlur={handleCropNameBlur}
                        error={error || formErrors.name}
                        buttonText="Add Crop"
                    />
                </form>
            </UserRoleHOC>

            <CropList crops={crops} fetchCrops={fetchCrops} />
        </>
    );
};

export default Crop;
