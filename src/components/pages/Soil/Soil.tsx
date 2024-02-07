import React from "react";
import SoilList from "./SoilList/SoilList";
import useSoil from "./Soil.logic";
import UserRoleHOC from "../UserRoleHOC";
import InputField from "../../common/InputFiled/InputField";

const Soil: React.FC = () => {
    const { soils, createSoil, changeHandler, soilName, fetchSoils, error, formErrors, handleSoilNameBlur } = useSoil();

    return (
        <>
            <UserRoleHOC>
                <h3>Add a New Soil</h3>
                <form onSubmit={createSoil}>
                    <InputField
                        label="Soil Name"
                        type="text"
                        id="cropName"
                        name="cropName"
                        value={soilName}
                        onChange={changeHandler}
                        onBlur={handleSoilNameBlur}
                        error={error || formErrors.name}
                        buttonText="Add Soil"
                    />
                </form>
            </UserRoleHOC>

            <SoilList soils={soils} fetchSoils={fetchSoils} />
        </>
    );
};

export default Soil;
