import React, { useState } from "react";
import Layout from "./common/Layout";
import CropLogic from "../pages/Crop/CropLogic";
import SoilLogic from "../pages/Soil/SoilLogic";
import ProcessingTypeLogic from "../pages/ProcessingType/ProcessingTypeLogic";
import MachineLogic from "../pages/Machine/MachineLogic";
import ProcessingLogic from "../pages/Processing/ProcessingLogic";
import FieldLogic from "../pages/Field/FieldLogic";
import { BackgroundImage, Container } from "./BaseLayout.style";
//import { MapContainer } from './ServicePage.style';

const ServicePage: React.FC = () => {
    const [outlinedCoordinates, setOutlinedCoordinates] = useState<number[][]>([]);

    // TODO - will need for the design latar
    const handleSelectLocation = (coordinates: number[][]) => {
        setOutlinedCoordinates(coordinates);
    };

    return (
        <Layout>
            <BackgroundImage />
            {/* Keep Map here, because later I will change the design */}
            {/* <MapWrapper>
        <MapContainer onSelectLocation={handleSelectLocation} outlinedCoordinates={outlinedCoordinates} />
      </MapWrapper> */}
            <Container>
                <FieldLogic coordinates={outlinedCoordinates} />
            </Container>
            <Container>
                <SoilLogic />
            </Container>
            <Container>
                <CropLogic />
            </Container>
            <Container>
                <ProcessingTypeLogic />
            </Container>
            <Container>
                <MachineLogic />
            </Container>
            <Container>
                <ProcessingLogic />
            </Container>
        </Layout>
    );
};

export default ServicePage;
