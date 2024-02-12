import { routes } from "../../static/routes";
import Sidebar from "../common/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Farm from "../pages/Farm/Farm";
import Field from "../pages/Field/Field";
import Crop from "../pages/Crop/Crop";
import ProcessingType from "../pages/ProcessingType/ProcessingType";
import Soil from "../pages/Soil/Soil";
import Machine from "../pages/Machine/Machine";
import Processing from "../pages/Processing/Processing";
import Report from "../pages/Reports/Report";
import NotFound from "../pages/NotFound/NotFound";
import { Container, MainContainer, PageWrapper, SidebarWrapper } from "./BaseLayout.style";
import Contact from "../pages/Home/HomePages/Contact";

const PageLayout = () => {
    return (
        <PageWrapper>
            <SidebarWrapper>
                <Sidebar />
            </SidebarWrapper>
            <Container>
                <MainContainer>
                    <Routes>
                        <Route path={routes.farm} element={<Farm />} />
                        <Route path={routes.field} element={<Field />} />
                        <Route path={routes.crop} element={<Crop />} />
                        <Route path={routes.soil} element={<Soil />} />
                        <Route path={routes.processingType} element={<ProcessingType />} />
                        <Route path={routes.machine} element={<Machine />} />
                        <Route path={routes.processing} element={<Processing />} />
                        <Route path={routes.reports} element={<Report />} />
                        <Route path={routes.contacts} element={<Contact />} />
                        <Route path={routes.notFound} element={<NotFound />} />
                    </Routes>
                </MainContainer>
            </Container>
        </PageWrapper>
    );
};

export default PageLayout;
