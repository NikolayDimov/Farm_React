import authHeader from "./authHeader";

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

    editSoil: async (soilId: string, newSoilName: string) => {
        try {
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/soil/${soilId}`, {
                method: "PATCH",
                headers,
                credentials: "include",
                body: JSON.stringify({ name: newSoilName }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error(`Failed to edit soil with ID: ${soilId}`, errorResponse);
                throw new Error("Failed to edit soil");
            }

            return response;
        } catch (error) {
            console.error("Error editing soil:", error);
            throw error;
        }
    },

    deleteSoil: async (soilId: string) => {
        try {
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/soil/${soilId}`, {
                method: "DELETE",
                headers,
                credentials: "include",
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error(`Failed to delete soil with ID: ${soilId}`, errorResponse);
                throw new Error("Failed to delete soil");
            }

            return response;
        } catch (error) {
            console.error("Error deleting soil:", error);
            throw new Error("Failed to delete soil");
        }
    },
};
