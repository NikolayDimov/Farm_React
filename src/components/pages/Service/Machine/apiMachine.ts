import authHeader from "../../../../services/authHeader";
import { Machine } from "./Machine.static";

const BASE_URL = "http://localhost:3000";

export const apiMachine = {
    fetchMachines: async () => {
        try {
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/machine`, {
                method: "GET",
                headers,
            });

            if (!response.ok) {
                console.error(`Failed to fetch machines. Status: ${response.status}`);
                throw new Error(`Failed to fetch machines. Status: ${response.status}`);
            }
            const machineData = await response.json();
            return machineData;
        } catch (error) {
            console.error("Error in fetching fields", error);
            throw error;
        }
    },

    createMachine: async (newMachine: Machine) => {
        try {
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/machine`, {
                method: "POST",
                headers,
                credentials: "include",
                body: JSON.stringify(newMachine),
            });

            return response;
        } catch (error) {
            console.error("Error creating a new field:", error);
            throw error;
        }
    },
};
