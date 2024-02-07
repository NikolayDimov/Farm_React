import { BASE_URL } from "../static/baseUrl";
import { apiEndpoints } from "../static/apiEndpoints";
import { getUser } from "./authHeaders";
import { Farm } from "../components/pages/Farm/Farm.static";

const farm = apiEndpoints.farm;
const user = getUser();

export const apiFarm = {
    fetchFarms: async () => {
        if (!user && !user.access_token) {
            throw new Error("User not authenticated");
        }
        const response = await fetch(`${BASE_URL}/${farm}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
        });

        const farmData = await response.json();
        return farmData;
    },

    getFarmDetails: async (farmId: string) => {
        const response = await fetch(`${BASE_URL}/${farm}/${farmId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
        });

        return response;
    },

    createFarm: async (newFarm: Farm) => {
        const response = await fetch(`${BASE_URL}/${farm}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(newFarm),
        });

        return response;
    },

    editFarm: async (farmId: string, newFarmName: string) => {
        const response = await fetch(`${BASE_URL}/${farm}/${farmId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ name: newFarmName }),
        });

        return response;
    },

    deleteFarm: async (farmId: string) => {
        const response = await fetch(`${BASE_URL}/${farm}/${farmId}`, {
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
