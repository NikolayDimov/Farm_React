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
        try {
            const response = await fetch(`${BASE_URL}/${farmsWithMostMachines}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch farmsWithMostMachines");
            }

            const farmWithMostMachineData = await response.json();
            return farmWithMostMachineData;
        } catch (error) {
            console.error("Error in fetching soils", error);
            throw error;
        }
    },
};

export const apiFieldCountPerFarmAndCrop = {
    fetchFieldCountPerFarmAndCropReport: async () => {
        try {
            const response = await fetch(`${BASE_URL}/report/${fieldCountPerFarmAndCrop}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch fieldCountPerFarmAndCrop");
            }
            const fieldCountPerFarmAndCropData = await response.json();
            return fieldCountPerFarmAndCropData;
        } catch (error) {
            console.error("Error in fetching soils", error);
            throw error;
        }
    },
};

export const apiMostCommonSoilPerFarm = {
    fetchMostCommonSoilPerFarmReport: async () => {
        try {
            const response = await fetch(`${BASE_URL}/report/${mostCommonSoilPerFarm}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch mostCommonSoilPerFarmData");
            }
            const mostCommonSoilPerFarmData = await response.json();
            return mostCommonSoilPerFarmData;
        } catch (error) {
            console.error("Error in fetching soils", error);
            throw error;
        }
    },
};

export const apiProcessingReport = {
    fetchProcessingReport: async () => {
        try {
            const response = await fetch(`${BASE_URL}/report/${processingReport}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch processingReport");
            }
            const processingReportData = await response.json();
            return processingReportData;
        } catch (error) {
            console.error("Error in fetching soils", error);
            throw error;
        }
    },
};
