import authHeader from "../../../../services/authHeader";

const BASE_URL = "http://localhost:3000";

export const apiProcessingType = {
    fetchProcessingTypes: async () => {
        try {
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/processingType`, {
                method: "GET",
                headers,
            });
            const processingTypeData = await response.json();
            return processingTypeData;
        } catch (error) {
            console.error("Error in fetching ProcessingType", error);
            throw error;
        }
    },

    createProcessingType: async (processingTypeName: string) => {
        try {
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/processingType`, {
                method: "POST",
                headers,
                credentials: "include",
                body: JSON.stringify({ name: processingTypeName }),
            });

            return response;
        } catch (error) {
            console.error("Error creating a new crop:", error);
            throw error;
        }
    },
};
