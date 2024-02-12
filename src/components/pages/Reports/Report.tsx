import React, { useState, useEffect } from "react";
import Modal, { BottomBar, GenerateTableButton, MinimizedTableButton } from "./ReportModal.tsx";
import { FarmsWithMostMachinesReportListProps, FieldCountPerFarmAndCropProps, MostCommonSoilPerFarmProps, ProcessingReportProps } from "./Report.static.ts";
import { apiFarmWithMostMachines, apiFieldCountPerFarmAndCrop, apiMostCommonSoilPerFarm, apiProcessingReport } from "../../../services/apiReports";
import FarmsWithMostMachinesReport from "./AllReports/FarmsWithMostMachines.tsx";
import FieldCountPerFarmAndCrop from "./AllReports/FieldCountPerFarmAndCrop.tsx";
import MostCommonSoilPerFarm from "./AllReports/MostCommonSoilPerfarm.tsx";
import ProcessingReport from "./AllReports/ProcessingReport.tsx";
import { ButtonContainer } from "../../common/icons/ButtonContainer.tsx";

const ReportPage: React.FC = () => {
    const [openWindows, setOpenWindows] = useState<string[]>([]);
    const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);

    const [farmsWithMostMachines, setFarmsWithMostMachines] = useState<FarmsWithMostMachinesReportListProps[]>([]);
    const [fieldCountPerFarmAndCrop, setFieldCountPerFarmAndCrop] = useState<FieldCountPerFarmAndCropProps[]>([]);
    const [mostCommonSoilPerFarm, setMostCommonSoilPerFarm] = useState<MostCommonSoilPerFarmProps[]>([]);
    const [processingReport, setProcessingReport] = useState<ProcessingReportProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const farmsData = await apiFarmWithMostMachines.fetchFarmWithMostMachinesReport();
                const fieldCountData = await apiFieldCountPerFarmAndCrop.fetchFieldCountPerFarmAndCropReport();
                const soilData = await apiMostCommonSoilPerFarm.fetchMostCommonSoilPerFarmReport();
                const processingData = await apiProcessingReport.fetchProcessingReport();

                setFarmsWithMostMachines(farmsData);
                setFieldCountPerFarmAndCrop(fieldCountData);
                setMostCommonSoilPerFarm(soilData);
                setProcessingReport(processingData);
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };

        fetchData();
    }, []);

    const openModal = (modalName: string) => {
        if (!openWindows.includes(modalName)) {
            if (minimizedWindows.includes(modalName)) {
                maximizeModal(modalName);
            } else {
                setOpenWindows((prevWindows) => [...prevWindows, modalName]);
            }
        }
    };

    const minimizeModal = (modalName: string) => {
        if (!minimizedWindows.includes(modalName)) {
            setOpenWindows((prevWindows) => prevWindows.filter((window) => window !== modalName));
            setMinimizedWindows((prevMinimized) => [...prevMinimized, modalName]);
        }
    };

    const maximizeModal = (modalName: string) => {
        setMinimizedWindows((prevMinimized) => prevMinimized.filter((window) => window !== modalName));
        setOpenWindows((prevWindows) => [...prevWindows, modalName]);
    };

    const closeModal = (modalName: string) => {
        setOpenWindows((prevWindows) => prevWindows.filter((window) => window !== modalName));
        setMinimizedWindows((prevMinimized) => prevMinimized.filter((window) => window !== modalName));
    };

    return (
        <>
            <ButtonContainer>
                <GenerateTableButton onClick={() => openModal("Most Machine")}>Generate Most Machine Table</GenerateTableButton>
                <GenerateTableButton onClick={() => openModal("Field Count Table Per Crop")}>Generate Field Count Table Per Crop table</GenerateTableButton>
                <GenerateTableButton onClick={() => openModal("Soil Table")}>Generate Soil Table</GenerateTableButton>
                <GenerateTableButton onClick={() => openModal("Processing Report Table")}>Generate Processing Report Table</GenerateTableButton>
            </ButtonContainer>

            {openWindows.map((modalName, index) => (
                <div key={`${modalName}-${index}`}>
                    <Modal modalName={modalName} onClose={() => closeModal(modalName)} onMinimize={() => minimizeModal(modalName)}>
                        {modalName === "Most Machine" && <FarmsWithMostMachinesReport farmsWithMostMachines={farmsWithMostMachines} />}
                        {modalName === "Field Count Table Per Crop" && <FieldCountPerFarmAndCrop fieldCountPerFarmAndCrop={fieldCountPerFarmAndCrop} />}
                        {modalName === "Soil Table" && <MostCommonSoilPerFarm mostCommonSoilPerFarm={mostCommonSoilPerFarm} />}
                        {modalName === "Processing Report Table" && <ProcessingReport processingReport={processingReport} />}
                    </Modal>
                </div>
            ))}

            <BottomBar>
                {minimizedWindows.map((modalName, index) => (
                    <MinimizedTableButton key={`minimized-${modalName}-${index}`} onClick={() => openModal(modalName)}>
                        {modalName}
                    </MinimizedTableButton>
                ))}
            </BottomBar>
        </>
    );
};

export default ReportPage;
