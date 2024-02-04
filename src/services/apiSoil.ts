import { BASE_URL } from "../static/baseUrl";
import { apiEndpoints } from "../static/apiEndpoints";
import { getUser } from "./authHeaders";

const soil = apiEndpoints.soil;
const user = getUser();

export const apiSoil = {
    fetchSoils: async () => {
        try {
            const response = await fetch(`${BASE_URL}/${soil}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch soils");
            }

            const soilData = await response.json();
            return soilData;
        } catch (error) {
            console.error("Error in fetching soils", error);
            throw error;
        }
    },

    createSoil: async (soilName: string) => {
        try {
            const response = await fetch(`${BASE_URL}/${soil}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ name: soilName }),
            });
            if (!response.ok) {
                throw new Error(`Failed to create Soil: ${response.statusText}`);
            }

            return response;
        } catch (error) {
            console.error("Error creating a new soil:", error);
            throw error;
        }
    },

    editSoil: async (soilId: string, newSoilName: string) => {
        try {
            const response = await fetch(`${BASE_URL}/${soil}/${soilId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
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
            const response = await fetch(`${BASE_URL}/${soil}/${soilId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
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
