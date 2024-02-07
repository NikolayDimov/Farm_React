import React, { useEffect, useState } from "react";
import { apiFarmWithMostMachines, apiFieldCountPerFarmAndCrop, apiMostCommonSoilPerFarm, apiProcessingReport } from "../../../services/apiReports";
import FarmsWithMostMachinesReport from "./FarmsWithMostMachines";
import { FarmsWithMostMachinesReportListProps, FieldCountPerFarmAndCropProps, MostCommonSoilPerFarmProps, ProcessingReportProps } from "./Report.static.ts";
import Layout from "../../common/Layout.tsx";
import FieldCountPerFarmAndCrop from "./FieldCountPerFarmAndCrop";
import MostCommonSoilPerFarm from "./MostCommonSoilPerfarm";
import ProcessingReport from "./ProcessingReport.tsx";

const ReportPage: React.FC = () => {
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

    return (
        <Layout>
            <FarmsWithMostMachinesReport farmsWithMostMachines={farmsWithMostMachines} />
            <FieldCountPerFarmAndCrop fieldCountPerFarmAndCrop={fieldCountPerFarmAndCrop} />
            <MostCommonSoilPerFarm mostCommonSoilPerFarm={mostCommonSoilPerFarm} />
            <ProcessingReport processingReport={processingReport} />
        </Layout>
    );
};

export default ReportPage;
