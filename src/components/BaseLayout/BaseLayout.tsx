import { routes } from "../../static/routes";
import Sidebar from "../common/Sidebar/Sidebar";
import { Outlet, Route, Routes } from "react-router-dom";
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
import DetailsSoilModal from "../pages/Soil/SoilList/SoilListModal/DetailsModal";
import EditSoilModal from "../pages/Soil/SoilList/SoilListModal/EditModal";
import DeleteModal from "../pages/Soil/SoilList/SoilListModal/DeleteModal";

const SoilDetailsRoute = () => {
    return (
        <>
            <Route path="/details" element={<DetailsSoilModal />} />
            <Route path="/edit/:id" element={<EditSoilModal />} />
            <Route path="/delete" element={<DeleteModal />} />
        </>
    );
};

const BaseLayout = () => {
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

                        <Route path={routes.soil} element={<Soil />}>
                            <Route path=":id/*" element={<SoilDetailsRoute />} />
                            <Route index element={<Outlet />} />
                        </Route>

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

export default BaseLayout;
