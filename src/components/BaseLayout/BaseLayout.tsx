import { routes } from "../../static/routes";
import Sidebar from "../common/Sidebar/Sidebar";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
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
import useModal from "../common/ModalList/useModal";
import useSoilList from "../pages/Soil/SoilList/SoilList.logic";

interface UseSoilListProps {
    fetchSoils: () => Promise<void>;
}

// interface UseProcessingTypeListProps {
//     fetchProcessingTypes: () => Promise<void>;
// }

const BaseLayout = ({
    fetchSoils = () => Promise.resolve(),
    fetchProcessingTypes,
}: {
    children?: React.ReactNode;
    fetchSoils?: () => Promise<void>;
    fetchProcessingTypes?: () => Promise<void>;
}) => {
    const location = useLocation();
    const background = location.state as { background?: Location };

    const { isVisible: isDeleteModalVisible, hideModal: hideDeleteModal } = useModal();
    const { isVisible: isEditModalVisible, hideModal: hideEditModal } = useModal();
    const { isVisible: isDetailsModalVisible, hideModal: hideDetailsModal } = useModal();

    const soilListProps: UseSoilListProps = { fetchSoils };
    const { setCurrentSoilName, originalSoilName, onDeleteConfirm, onEditSoilConfirm, soilDetails } = useSoilList(soilListProps);

    // const processingTypeListProps: UseProcessingTypeListProps = { fetchProcessingTypes };
    // const { currentProcessingTypeName, setCurrentProcessingTypeName, onEditConfirm } = useProcessingTypeList(processingTypeListProps);

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
                            <Route
                                path=":id/details"
                                element={
                                    <DetailsSoilModal
                                        isVisible={isDetailsModalVisible}
                                        hideModal={hideDetailsModal}
                                        soilDetails={soilDetails}
                                    />
                                }
                            />
                            <Route
                                path=":id/edit"
                                element={
                                    <EditSoilModal
                                        isVisible={isEditModalVisible}
                                        hideModal={hideEditModal}
                                        currentSoilName={originalSoilName}
                                        onConfirm={onEditSoilConfirm}
                                        setCurrentSoilName={setCurrentSoilName}
                                    />
                                }
                            />
                            <Route
                                path=":id/delete"
                                element={
                                    <DeleteModal
                                        isVisible={isDeleteModalVisible}
                                        hideModal={hideDeleteModal}
                                        onDeleteConfirm={onDeleteConfirm}
                                    />
                                }
                            />
                        </Route>

                        <Route path={routes.processingType} element={<ProcessingType />} />
                        {/* <Route path={routes.processingType} element={<ProcessingType />}>
                            <Route path={routes.updateProcessingType} element={<EditProcessingTypeModal />} />
                        </Route> */}

                        <Route path={routes.machine} element={<Machine />} />
                        <Route path={routes.processing} element={<Processing />} />
                        <Route path={routes.reports} element={<Report />} />
                        <Route path={routes.contacts} element={<Contact />} />
                        <Route path={routes.notFound} element={<NotFound />} />
                    </Routes>

                    {/* {background?.background && (
                        <Routes>
                            <Route path={`${routes.processingType}/${routes.updateProcessingType}`} element={<EditProcessingTypeModal />} />
                        </Routes>
                    )} */}
                </MainContainer>
            </Container>
        </PageWrapper>
    );
};

export default BaseLayout;
