import { Processing } from "../components/pages/Processing/Processing.static";
import { BASE_URL } from "../static/baseUrl";
import { apiEndpoints } from "../static/apiEndpoints";
import { getUser } from "./authHeaders";

const user = getUser();
const processing = apiEndpoints.processing;

export const apiProcessing = {
    fetchProcessings: async () => {
        try {
            const response = await fetch(`${BASE_URL}/${processing}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                console.error(`Failed to fetch processing. Status: ${response.status}`);
                throw new Error(`Failed to fetch processing. Status: ${response.status}`);
            }
            const processingData = await response.json();
            return processingData;
        } catch (error) {
            console.error("Error in fetching fields", error);
            throw error;
        }
    },

    createProcessing: async (newProcessing: Processing) => {
        try {
            const response = await fetch(`${BASE_URL}/${processing}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(newProcessing),
            });
            if (!response.ok) {
                throw new Error(`Failed to create Processing: ${response.statusText}`);
            }

            // console.log("Processing Creation Response:", response);
            return response;
        } catch (error) {
            console.error("Error creating a new processing:", error);
            throw error;
        }
    },

    editProcessing: async (processingId: string, newProcessingDate: Date, newProcessingTypeId: string, newMachineId: string) => {
        try {
            const response = await fetch(`${BASE_URL}/${processing}/${processingId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ id: processingId, date: newProcessingDate, processingTypeId: newProcessingTypeId, machineId: newMachineId }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error(`Failed to edit processing with ID: ${processingId}`, errorResponse);
                throw new Error("Failed to edit processing");
            }

            return response;
        } catch (error) {
            console.error("Error editing processing:", error);
            throw error;
        }
    },

    deleteProcessing: async (processingId: string) => {
        try {
            const response = await fetch(`${BASE_URL}/${processing}/${processingId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error(`Failed to delete processing with ID: ${processingId}`, errorResponse);
                throw new Error("Failed to delete processing");
            }
            return response;
        } catch (error) {
            console.error("Error deleting processing:", error);
            throw new Error("Failed to delete processing");
        }
    },
};
