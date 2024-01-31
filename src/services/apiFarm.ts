// apiFarm.ts
import authHeader from "./authHeader";
import { Farm } from "../components/pages/Farm/Farm.static";
const BASE_URL = "http://localhost:3000";

export const apiFarm = {
    fetchFarms: async () => {
        try {
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/farm`, {
                method: "GET",
                headers,
            });
            const farmData = await response.json();
            return farmData;
        } catch (error) {
            console.error("Error in fetching farms", error);
            throw error;
        }
    },

    createFarm: async (newFarm: Farm) => {
        try {
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/farm`, {
                method: "POST",
                headers,
                credentials: "include",
                body: JSON.stringify(newFarm),
            });

            return response;
        } catch (error) {
            console.error("Error creating a new farm:", error);
            throw error;
        }
    },
};
