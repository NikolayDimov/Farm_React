import React, { useState } from "react";
import Layout from "../../BaseLayout/common/Layout";
import MapContainer from "../Farm/MapContainer";
import AddFarmForm from "../Farm/AddFarmForm";
import FarmList from "../Farm/FarmList";
import { Farm } from "../Farm/Farm.static";
import styled from "styled-components";
import WelcomeUser from "./WelcomeUser";
import AuthHOC from "../AuthHOC";

const StyledMapContainer = styled(MapContainer)`
    height: 600px;
`;

const ProfilePage: React.FC = () => {
    const [selectedLocation, setSelectedLocation] = useState<number[]>([]);
    const [farms, setFarms] = useState<Farm[]>([]);

    const onSelectLocation = (coordinates: number[]) => {
        setSelectedLocation(coordinates);
    };

    const handleFarmAdded = (newFarm: Farm) => {
        setFarms((prevFarms) => [...prevFarms, newFarm]);
    };

    return (
        <Layout>
            <WelcomeUser />
            <StyledMapContainer onSelectLocation={onSelectLocation} />
            {selectedLocation.length > 0 && <p>Selected Location: {JSON.stringify({ type: "Point", coordinates: selectedLocation })}</p>}
            <AddFarmForm onFarmAdded={handleFarmAdded} />
            <FarmList farms={farms} setFarms={setFarms} />
        </Layout>
    );
};

export default ProfilePage;
