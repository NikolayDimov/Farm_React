import { Processing } from "../components/pages/Processing/Processing.static";
import { BASE_URL } from "../static/baseUrl";
import { apiEndpoints } from "../static/apiEndpoints";
import { getUser } from "./authHeaders";

const processing = apiEndpoints.processing;
const user = getUser();

export const apiProcessing = {
    fetchProcessings: async () => {
        const response = await fetch(`${BASE_URL}/${processing}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
        });

        const processingData = await response.json();
        return processingData;
    },

    getProcessingDetails: async (processingId: string) => {
        const response = await fetch(`${BASE_URL}/${processing}/${processingId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
        });

        return response;
    },

    createProcessing: async (newProcessing: Processing) => {
        const response = await fetch(`${BASE_URL}/${processing}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(newProcessing),
        });

        return response;
    },

    editProcessing: async (processingId: string, newProcessingDate: Date, newProcessingTypeId: string, newMachineId: string) => {
        const response = await fetch(`${BASE_URL}/${processing}/${processingId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ id: processingId, date: newProcessingDate, processingTypeId: newProcessingTypeId, machineId: newMachineId }),
        });

        return response;
    },

    deleteProcessing: async (processingId: string) => {
        const response = await fetch(`${BASE_URL}/${processing}/${processingId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        return response;
    },
};
