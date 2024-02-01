import authHeader from "./authHeader";

const BASE_URL = "http://localhost:3000";

export const apiFarmWithMostMachines = {
    fetchFarmWithMostMachinesReport: async () => {
        try {
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/report/farms-with-most-machines`, {
                method: "GET",
                headers,
            });
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
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/report/field-count-per-farm-and-crop`, {
                method: "GET",
                headers,
            });
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
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/report/most-common-soil-per-farm`, {
                method: "GET",
                headers,
            });
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
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/report/processing-report`, {
                method: "GET",
                headers,
            });
            const processingReportData = await response.json();
            return processingReportData;
        } catch (error) {
            console.error("Error in fetching soils", error);
            throw error;
        }
    },
};
