import MapContainer from "./MapContainer/MapContainer";
import Layout from "../../common/Layout";
import useFarm from "./Farm.logic";
import FarmList from "./FarmList/FarmList";
import UserRoleHOC from "../UserRoleHOC";
import InputField from "../../common/InputFiled/InputField";
import { useState } from "react";

const Farm: React.FC = () => {
    const { farms, createFarm, changeHandler, farmName, setNewFarmCoordinates, fetchFarms, error, formErrors, handleFarmNameBlur } = useFarm();
    const [selectedFarmCoordinates, setSelectedFarmCoordinates] = useState<number[]>([]);

    const showFarmLocationOnMap = (coordinates: number[]) => {
        console.log("Show Farm Location on Map:", coordinates);
        setSelectedFarmCoordinates(coordinates);
    };

    const handleShowFarmClick = () => {
        console.log("Show Farm clicked on the map!");
    };

    return (
        <Layout>
            <UserRoleHOC>
                <h3>Add a New Farm</h3>
                <form onSubmit={createFarm}>
                    <InputField
                        label="Farm Name"
                        type="text"
                        id="farmName"
                        name="farmName"
                        value={farmName}
                        onChange={changeHandler}
                        onBlur={handleFarmNameBlur}
                        error={error || formErrors.name}
                        buttonText="Add Farm"
                    />
                </form>
            </UserRoleHOC>
            <MapContainer
                onSelectLocation={(coordinates: number[]) => setNewFarmCoordinates(coordinates)}
                onShowFarmClick={handleShowFarmClick}
                selectedFarmCoordinates={selectedFarmCoordinates}
            />
            <FarmList farms={farms} fetchFarms={fetchFarms} showFarmLocationOnMap={showFarmLocationOnMap} />
        </Layout>
    );
};

export default Farm;
