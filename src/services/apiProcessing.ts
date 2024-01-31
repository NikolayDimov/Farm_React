import authHeader from "./authHeader";
import { Processing } from "../components/pages/Processing/Processing.static";

const BASE_URL = "http://localhost:3000";

export const apiProcessing = {
    fetchProcessings: async () => {
        try {
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/processing`, {
                method: "GET",
                headers,
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
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/processing`, {
                method: "POST",
                headers,
                credentials: "include",
                body: JSON.stringify(newProcessing),
            });

            console.log("Processing Creation Response:", response);

            return response;
        } catch (error) {
            console.error("Error creating a new processing:", error);
            throw error;
        }
    },

    deleteProcessing: async (processingId: string) => {
        try {
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/processing/${processingId}`, {
                method: "DELETE",
                headers,
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
