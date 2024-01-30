import authHeader from "../../../../services/authHeader";

const BASE_URL = "http://localhost:3000";

export const apiSoil = {
    fetchSoils: async () => {
        try {
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/soil`, {
                method: "GET",
                headers,
            });
            const soilData = await response.json();
            return soilData;
        } catch (error) {
            console.error("Error in fetching soils", error);
            throw error;
        }
    },

    createSoil: async (soilName: string) => {
        try {
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/soil`, {
                method: "POST",
                headers,
                credentials: "include",
                body: JSON.stringify({ name: soilName }),
            });

            return response;
        } catch (error) {
            console.error("Error creating a new soil:", error);
            throw error;
        }
    },
};
