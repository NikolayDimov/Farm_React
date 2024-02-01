import React, { useState } from "react";
import styled from "styled-components";
import Layout from "./common/Layout";
import MachineComponent from "../pages/Machine/Machine";
import servicePageImage from "../../assets/nivaSand.jpg";
import FieldComponent from "../pages/Field/Field";
import ProcessingComponent from "../pages/Processing/Processing";
import CropLogic from "../pages/Crop/CropLogic";
import SoilLogic from "../pages/Soil/SoilLogic";
import ProcessingTypeLogic from "../pages/ProcessingType/ProcessingTypeLogic";
//import { MapContainer } from './ServicePage.style';

const BackgroundImage = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${servicePageImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    z-index: -1;
`;

const Container = styled.div`
    width: 90%;
    max-width: 1200px;
    margin: 20px auto;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const MapWrapper = styled.div`
    width: 100%;
    height: 400px;
    margin-bottom: 20px;
`;

const ServicePage: React.FC = () => {
    const [outlinedCoordinates, setOutlinedCoordinates] = useState<number[][]>([]);

    const handleSelectLocation = (coordinates: number[][]) => {
        setOutlinedCoordinates(coordinates);
    };

    return (
        <Layout>
            <BackgroundImage />
            {/* <MapWrapper>
        <MapContainer onSelectLocation={handleSelectLocation} outlinedCoordinates={outlinedCoordinates} />
      </MapWrapper> */}
            <Container>
                <FieldComponent coordinates={outlinedCoordinates} />
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
                <MachineComponent />
            </Container>
            <Container>
                <ProcessingComponent />
            </Container>
        </Layout>
    );
};

export default ServicePage;
