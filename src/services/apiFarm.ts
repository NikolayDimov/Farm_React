import { BASE_URL } from "../static/baseUrl";
import { apiEndpoints } from "../static/apiEndpoints";
import { getUser } from "./authHeaders";
import { Farm } from "../components/pages/Farm/Farm.static";

const farm = apiEndpoints.farm;
const user = getUser();

export const apiFarm = {
    fetchFarms: async () => {
        try {
            const response = await fetch(`${BASE_URL}/${farm}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch farms");
            }
            const farmData = await response.json();
            return farmData;
        } catch (error) {
            console.error("Error in fetching farms", error);
            throw error;
        }
    },

    createFarm: async (newFarm: Farm) => {
        try {
            const response = await fetch(`${BASE_URL}/${farm}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(newFarm),
            });
            if (!response.ok) {
                throw new Error(`Failed to create Soil: ${response.statusText}`);
            }

            return response;
        } catch (error) {
            console.error("Error creating a new farm:", error);
            throw error;
        }
    },

    editFarm: async (farmId: string, newFarmName: string) => {
        try {
            const response = await fetch(`${BASE_URL}/${farm}/${farmId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ name: newFarmName }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error(`Failed to edit farm with ID: ${farmId}`, errorResponse);
                throw new Error("Failed to edit farm");
            }

            return response;
        } catch (error) {
            console.error("Error editing farm:", error);
            throw error;
        }
    },

    deleteFarm: async (farmId: string) => {
        try {
            const response = await fetch(`${BASE_URL}/${farm}/${farmId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error(`Failed to delete farm with ID: ${farmId}`, errorResponse);
                throw new Error("Failed to delete farm");
            }
            return response;
        } catch (error) {
            console.error("Error deleting farm:", error);
            throw new Error("Failed to delete farm");
        }
    },
};
