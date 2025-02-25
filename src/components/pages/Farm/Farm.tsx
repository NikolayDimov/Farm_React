import React, { useCallback, useState } from "react";
import MapContainer from "./MapContainer/MapContainer";
import useFarm from "./Farm.logic";
import FarmList from "./FarmList/FarmList";
import UserRoleHOC from "../UserRoleHOC";
import InputField from "../../common/InputFiled/InputField";
import { Instructions } from "../../common/InputFiled/InputField.styles";

const Farm: React.FC = () => {
    const { farms, createFarm, changeHandler, farmName, setNewFarmCoordinates, fetchFarms, error, formErrors, handleFarmNameBlur } = useFarm();
    const [selectedFarmCoordinates, setSelectedFarmCoordinates] = useState<number[]>([]);
    const [isPinDropped, setIsPinDropped] = useState<boolean>(false);

    const showFarmLocationOnMap = useCallback((coordinates: number[]) => {
        console.log("Show Farm Location on Map:", coordinates);
        setSelectedFarmCoordinates(coordinates);
    }, []);

    const handleShowFarmClick = useCallback(() => {
        console.log("Show Farm clicked on the map!");
    }, []);

    const handlePinDrop = (coordinates: number[]) => {
        setNewFarmCoordinates(coordinates);
        setIsPinDropped(true);
    };

    return (
        <>
            <UserRoleHOC>
                <h3>Add a New Farm</h3>
                <Instructions>Please drop a pin on the map, enter the farm name, and then click "Add Farm".</Instructions>
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
                        disabled={!isPinDropped}
                    />
                </form>
            </UserRoleHOC>
            <MapContainer
                onSelectLocation={handlePinDrop}
                onShowFarmClick={handleShowFarmClick}
                selectedFarmCoordinates={selectedFarmCoordinates}
            />
            <FarmList farms={farms} fetchFarms={fetchFarms} showFarmLocationOnMap={showFarmLocationOnMap} />
        </>
    );
};

export default Farm;