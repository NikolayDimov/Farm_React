import authHeader from "./authHeader";
import { Machine } from "../components/pages/Machine/Machine.static";

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

    editMachine: async (machineId: string, newMachineBrand: string, newMachineModel: string, MachineRegisterNumber: string, newFarmId: string) => {
        try {
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/machine/${machineId}`, {
                method: "PATCH",
                headers,
                credentials: "include",
                body: JSON.stringify({ brand: newMachineBrand, model: newMachineModel, registerNumber: MachineRegisterNumber, newFarmId }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error(`Failed to edit machine with ID: ${machineId}`, errorResponse);
                throw new Error("Failed to edit machine");
            }

            return response;
        } catch (error) {
            console.error("Error editing machine:", error);
            throw error;
        }
    },

    transferMachine: async (machineId: string, newFarmId: string) => {
        try {
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/machine/${machineId}/transfer`, {
                method: "PATCH",
                headers,
                credentials: "include",
                body: JSON.stringify({ newFarmId }),
            });

            if (!response.ok) {
                console.error(`Failed to transfer machine with ID ${machineId}. Status: ${response.status}`);
                throw new Error(`Failed to transfer machine with ID ${machineId}. Status: ${response.status}`);
            }

            const updatedMachine = await response.json();
            return updatedMachine;
        } catch (error) {
            console.error("Error transferring machine:", error);
            throw error;
        }
    },

    deleteMachine: async (machineId: string) => {
        try {
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/machine/${machineId}`, {
                method: "DELETE",
                headers,
                credentials: "include",
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error(`Failed to delete machine with ID: ${machineId}`, errorResponse);
                throw new Error("Failed to delete machine");
            }
            return response;
        } catch (error) {
            console.error("Error deleting machine:", error);
            throw new Error("Failed to delete machine");
        }
    },
};
