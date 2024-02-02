import React, { useState } from "react";
import Layout from "./common/Layout";
import MachineLogic from "../pages/Machine/Machine.logic.tsx";
import ProcessingLogic from "../pages/Processing/Processing.logic.tsx";
import FieldLogic from "../pages/Field/Field.logic.tsx";
import { BackgroundImage, Container } from "./BaseLayout.style";
import Crop from "../pages/Crop/Crop.tsx";
import Soil from "../pages/Soil/Soil.tsx";
import ProcessingType from "../pages/ProcessingType/ProcessingType.tsx";
//import { MapContainer } from './ServicePage.style';

const ServicePage: React.FC = () => {
    const [outlinedCoordinates, setOutlinedCoordinates] = useState<number[][]>([]);

    // TODO - will need for the design later
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
                <Soil />
            </Container>
            <Container>
                <Crop />
            </Container>
            <Container>
                <ProcessingType />
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
