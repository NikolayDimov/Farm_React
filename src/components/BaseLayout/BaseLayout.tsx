import React from "react";
import Layout from "../common/Layout.tsx";
import { BackgroundImage, Container } from "./BaseLayout.style";
import Crop from "../pages/Crop/Crop.tsx";
import Soil from "../pages/Soil/Soil.tsx";
import ProcessingType from "../pages/ProcessingType/ProcessingType.tsx";
import Machine from "../pages/Machine/Machine.tsx";
import Field from "../pages/Field/Field.tsx";
import Processing from "../pages/Processing/Processing.tsx";
//import { MapContainer } from './ServicePage.style';

const ServicePage: React.FC = () => {
    return (
        <Layout>
            <BackgroundImage />
            {/* Keep Map here, because later I will change the design */}
            {/* <MapWrapper>
        <MapContainer onSelectLocation={handleSelectLocation} outlinedCoordinates={outlinedCoordinates} />
      </MapWrapper> */}
            <Container>
                <Field />
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
                <Machine />
            </Container>
            <Container>
                <Processing />
            </Container>
        </Layout>
    );
};

export default ServicePage;
