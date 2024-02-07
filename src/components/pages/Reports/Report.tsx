import React, { useEffect, useState } from "react";
import { apiFarmWithMostMachines, apiFieldCountPerFarmAndCrop, apiMostCommonSoilPerFarm, apiProcessingReport } from "../../../services/apiReports";
import { FarmsWithMostMachinesReportListProps, FieldCountPerFarmAndCropProps, MostCommonSoilPerFarmProps, ProcessingReportProps } from "./Report.static.ts";
import Layout from "../../common/Layout.tsx";
import { ButtonContainer, GenerateTableButton } from "./Report.styled.ts";
import TableModal from "./TableModal.tsx";

const ReportPage: React.FC = () => {
    const [isFarmsTableOpen, setFarmsTableOpen] = useState(false);
    const [isFieldCountTableOpen, setFieldCountTableOpen] = useState(false);
    const [isSoilTableOpen, setSoilTableOpen] = useState(false);
    const [isProcessingReportTableOpen, setProcessingReportTableOpen] = useState(false);

    // State for table data
    const [farmsWithMostMachines, setFarmsWithMostMachines] = useState<FarmsWithMostMachinesReportListProps[]>([]);
    const [fieldCountPerFarmAndCrop, setFieldCountPerFarmAndCrop] = useState<FieldCountPerFarmAndCropProps[]>([]);
    const [mostCommonSoilPerFarm, setMostCommonSoilPerFarm] = useState<MostCommonSoilPerFarmProps[]>([]);
    const [processingReport, setProcessingReport] = useState<ProcessingReportProps[]>([]);

    useEffect(() => {
        const fetchFarmsWithMostMachines = async () => {
            try {
                const data = await apiFarmWithMostMachines.fetchFarmWithMostMachinesReport();
                setFarmsWithMostMachines(data);
            } catch (error) {
                console.error("Error fetching farms with most machines report:", error);
            }
        };

        fetchFarmsWithMostMachines();
    }, []);

    useEffect(() => {
        const fetchFieldCountPerFarmAndCropReport = async () => {
            try {
                const data = await apiFieldCountPerFarmAndCrop.fetchFieldCountPerFarmAndCropReport();
                setFieldCountPerFarmAndCrop(data);
            } catch (error) {
                console.error("Error fetching farms with most machines report:", error);
            }
        };

        fetchFieldCountPerFarmAndCropReport();
    }, []);

    useEffect(() => {
        const fetchMostCommonSoilPerFarmReport = async () => {
            try {
                const data = await apiMostCommonSoilPerFarm.fetchMostCommonSoilPerFarmReport();
                setMostCommonSoilPerFarm(data);
            } catch (error) {
                console.error("Error fetching farms with most machines report:", error);
            }
        };

        fetchMostCommonSoilPerFarmReport();
    }, []);

    useEffect(() => {
        const fetchProcessingReport = async () => {
            try {
                const data = await apiProcessingReport.fetchProcessingReport();
                setProcessingReport(data);
            } catch (error) {
                console.error("Error fetching farms with most machines report:", error);
            }
        };

        fetchProcessingReport();
    }, []);

    // Functions to open/close tables
    const openFarmsTable = () => setFarmsTableOpen(true);
    const closeFarmsTable = () => setFarmsTableOpen(false);

    const openFieldCountTable = () => setFieldCountTableOpen(true);
    const closeFieldCountTable = () => setFieldCountTableOpen(false);

    const openSoilTable = () => setSoilTableOpen(true);
    const closeSoilTable = () => setSoilTableOpen(false);

    const openProcessingReportTable = () => setProcessingReportTableOpen(true);
    const closeProcessingReportTable = () => setProcessingReportTableOpen(false);

    // Render buttons and tables
    return (
        <Layout>
            <ButtonContainer>
                <GenerateTableButton onClick={openFarmsTable}>Generate Farms Table</GenerateTableButton>
                <GenerateTableButton onClick={openFieldCountTable}>Generate Field Count Table</GenerateTableButton>
                <GenerateTableButton onClick={openSoilTable}>Generate Soil Table</GenerateTableButton>
                <GenerateTableButton onClick={openProcessingReportTable}>Generate Processing Report Table</GenerateTableButton>
            </ButtonContainer>

            {/* Render Farm table modal */}
            <TableModal isOpen={isFarmsTableOpen} onRequestClose={closeFarmsTable} data={farmsWithMostMachines} title="Farms Table" />

            {/* Render Field Count table modal */}
            <TableModal isOpen={isFieldCountTableOpen} onRequestClose={closeFieldCountTable} data={fieldCountPerFarmAndCrop} title="Field Count Table" />

            {/* Render Soil table modal */}
            <TableModal isOpen={isSoilTableOpen} onRequestClose={closeSoilTable} data={mostCommonSoilPerFarm} title="Soil Table" />

            {/* Render Processing Report table modal */}
            <TableModal isOpen={isProcessingReportTableOpen} onRequestClose={closeProcessingReportTable} data={processingReport} title="Processing Report Table" />
        </Layout>
    );
};

export default ReportPage;
