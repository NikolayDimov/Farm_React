import { BASE_URL } from "../static/baseUrl";
import { apiEndpoints } from "../static/apiEndpoints";
import { getUser } from "./authHeaders";

const user = getUser();
const farmsWithMostMachines = apiEndpoints.farmsWithMostMachines;
const fieldCountPerFarmAndCrop = apiEndpoints.fieldCountPerFarmAndCrop;
const mostCommonSoilPerFarm = apiEndpoints.mostCommonSoilPerFarm;
const processingReport = apiEndpoints.processingReport;

export const apiFarmWithMostMachines = {
    fetchFarmWithMostMachinesReport: async () => {
        const response = await fetch(`${BASE_URL}/report/${farmsWithMostMachines}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
        });

        const farmWithMostMachineData = await response.json();
        return farmWithMostMachineData;
    },
};

export const apiFieldCountPerFarmAndCrop = {
    fetchFieldCountPerFarmAndCropReport: async () => {
        const response = await fetch(`${BASE_URL}/report/${fieldCountPerFarmAndCrop}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
        });

        const fieldCountPerFarmAndCropData = await response.json();
        return fieldCountPerFarmAndCropData;
    },
};

export const apiMostCommonSoilPerFarm = {
    fetchMostCommonSoilPerFarmReport: async () => {
        const response = await fetch(`${BASE_URL}/report/${mostCommonSoilPerFarm}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
        });

        const mostCommonSoilPerFarmData = await response.json();
        return mostCommonSoilPerFarmData;
    },
};

export const apiProcessingReport = {
    fetchProcessingReport: async () => {
        const response = await fetch(`${BASE_URL}/report/${processingReport}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
        });

        const processingReportData = await response.json();
        return processingReportData;
    },
};
