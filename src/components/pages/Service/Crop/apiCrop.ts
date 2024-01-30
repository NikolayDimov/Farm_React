import authHeader from "../../../../services/authHeader";

const BASE_URL = "http://localhost:3000";

export const apiCrop = {
    fetchCrops: async () => {
        try {
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/crop`, {
                method: "GET",
                headers,
            });
            const cropData = await response.json();
            return cropData;
        } catch (error) {
            console.error("Error in fetching crops", error);
            throw error;
        }
    },

    createCrop: async (cropName: string) => {
        try {
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/crop`, {
                method: "POST",
                headers,
                credentials: "include",
                body: JSON.stringify({ name: cropName }),
            });

            return response;
        } catch (error) {
            console.error("Error creating a new crop:", error);
            throw error;
        }
    },
};
