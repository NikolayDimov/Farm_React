import React, { useState } from "react";
import Layout from "../common/Layout.tsx";
import { BackgroundImage, BottomButtonsContainer, Container, Content, PageContainer, Sidebar, SidebarButton, TopButtonsContainer } from "./BaseLayout.style";
import Crop from "../pages/Crop/Crop.tsx";
import Soil from "../pages/Soil/Soil.tsx";
import ProcessingType from "../pages/ProcessingType/ProcessingType.tsx";
import Machine from "../pages/Machine/Machine.tsx";
import Field from "../pages/Field/Field.tsx";
import Processing from "../pages/Processing/Processing.tsx";
import Farm from "../pages/Farm/Farm.tsx";
import ReportPage from "../pages/Reports/Report.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import Contacts from "../pages/Home/HomePages/Contact.tsx";

const ServicePage: React.FC = () => {
    const [selectedComponent, setSelectedComponent] = useState<string | null>("Field");
    const { user } = useAuth();
    const { isLoggedIn, logout } = useAuth();
    const handleLogout = async () => {
        await logout();
    };

    const renderComponent = (componentName: string) => {
        setSelectedComponent(componentName);
    };

    return (
        <Layout>
            <PageContainer>
                <Sidebar>
                    <TopButtonsContainer>
                        <SidebarButton onClick={() => renderComponent("Farm")}>Farm</SidebarButton>
                        <SidebarButton onClick={() => renderComponent("Field")}>Field</SidebarButton>
                        <SidebarButton onClick={() => renderComponent("Soil")}>Soil</SidebarButton>
                        <SidebarButton onClick={() => renderComponent("Crop")}>Crop</SidebarButton>
                        <SidebarButton onClick={() => renderComponent("Processing Type")}>Processing Type</SidebarButton>
                        <SidebarButton onClick={() => renderComponent("Machine")}>Machine</SidebarButton>
                        <SidebarButton onClick={() => renderComponent("Processing")}>Processing</SidebarButton>
                        <SidebarButton onClick={() => renderComponent("Reports")}>Reports</SidebarButton>
                    </TopButtonsContainer>
                    <BottomButtonsContainer>
                        <SidebarButton onClick={() => renderComponent("Contacts")}>Contacts</SidebarButton>
                        <SidebarButton onClick={handleLogout}>Logout</SidebarButton>
                    </BottomButtonsContainer>
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
                    {selectedComponent === "Contacts" && (
                        <Container>
                            <BackgroundImage />
                            <Contacts />
                        </Container>
                    )}
                </Content>
            </PageContainer>
        </Layout>
    );
};

export default ServicePage;
