import React from "react";
import SoilList from "./SoilList/SoilList";
import useSoil from "./Soil.logic";
import UserRoleHOC from "../UserRoleHOC";

const Soil: React.FC = () => {
    const { soils, createSoil, changeHandler, soilName, fetchSoils } = useSoil();

    return (
        <>
            <UserRoleHOC>
                <h3>Add a New Soil</h3>
                <form onSubmit={createSoil}>
                    <label>Soil Name:</label>
                    <input type="text" value={soilName} onChange={changeHandler} />
                    <button type="submit">Add Soil</button>
                </form>
            </UserRoleHOC>

            <SoilList soils={soils} fetchSoils={fetchSoils} />
        </>
    );
};

export default Soil;
