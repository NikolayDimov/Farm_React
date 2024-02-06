import React, { useState } from "react";
import Layout from "../common/Layout.tsx";
import { BackgroundImage, Container, Content, PageContainer, Sidebar, SidebarButton } from "./BaseLayout.style";
import Crop from "../pages/Crop/Crop.tsx";
import Soil from "../pages/Soil/Soil.tsx";
import ProcessingType from "../pages/ProcessingType/ProcessingType.tsx";
import Machine from "../pages/Machine/Machine.tsx";
import Field from "../pages/Field/Field.tsx";
import Processing from "../pages/Processing/Processing.tsx";
import Farm from "../pages/Farm/Farm.tsx";
import ReportPage from "../pages/Reports/Report.tsx";

const ServicePage: React.FC = () => {
    const [selectedComponent, setSelectedComponent] = useState<string | null>("Field");

    const renderComponent = (componentName: string) => {
        setSelectedComponent(componentName);
    };

    return (
        <Layout>
            <PageContainer>
                <Sidebar>
                    <SidebarButton onClick={() => renderComponent("Farm")}>Farm</SidebarButton>
                    <SidebarButton onClick={() => renderComponent("Field")}>Field</SidebarButton>
                    <SidebarButton onClick={() => renderComponent("Soil")}>Soil</SidebarButton>
                    <SidebarButton onClick={() => renderComponent("Crop")}>Crop</SidebarButton>
                    <SidebarButton onClick={() => renderComponent("Processing Type")}>Processing Type</SidebarButton>
                    <SidebarButton onClick={() => renderComponent("Machine")}>Machine</SidebarButton>
                    <SidebarButton onClick={() => renderComponent("Processing")}>Processing</SidebarButton>
                    <SidebarButton onClick={() => renderComponent("Reports")}>Reports</SidebarButton>
                </Sidebar>

                <Content>
                    {selectedComponent === "Farm" && (
                        <Container>
                            <BackgroundImage />
                            <Farm />
                        </Container>
                    )}
                    {selectedComponent === "Field" && (
                        <Container>
                            <BackgroundImage />
                            <Field />
                        </Container>
                    )}
                    {selectedComponent === "Soil" && (
                        <Container>
                            <BackgroundImage />
                            <Soil />
                        </Container>
                    )}
                    {selectedComponent === "Crop" && (
                        <Container>
                            <BackgroundImage />
                            <Crop />
                        </Container>
                    )}
                    {selectedComponent === "Processing Type" && (
                        <Container>
                            <BackgroundImage />
                            <ProcessingType />
                        </Container>
                    )}
                    {selectedComponent === "Machine" && (
                        <Container>
                            <BackgroundImage />
                            <Machine />
                        </Container>
                    )}
                    {selectedComponent === "Processing" && (
                        <Container>
                            <BackgroundImage />
                            <Processing />
                        </Container>
                    )}
                    {selectedComponent === "Reports" && (
                        <Container>
                            <BackgroundImage />
                            <ReportPage />
                        </Container>
                    )}
                </Content>
            </PageContainer>
        </Layout>
    );
};

export default ServicePage;
