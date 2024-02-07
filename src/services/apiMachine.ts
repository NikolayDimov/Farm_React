import { Machine } from "../components/pages/Machine/Machine.static";
import { BASE_URL } from "../static/baseUrl";
import { apiEndpoints } from "../static/apiEndpoints";
import { getUser } from "./authHeaders";

const machine = apiEndpoints.machine;
const user = getUser();

export const apiMachine = {
    fetchMachines: async () => {
        const response = await fetch(`${BASE_URL}/${machine}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
        });

        const machineData = await response.json();
        return machineData;
    },

    getMachineDetails: async (machineId: string) => {
        const response = await fetch(`${BASE_URL}/${machine}/${machineId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
        });

        return response;
    },

    createMachine: async (newMachine: Machine) => {
        const response = await fetch(`${BASE_URL}/${machine}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(newMachine),
        });

        return response;
    },

    editMachine: async (machineId: string, newMachineBrand: string, newMachineModel: string, MachineRegisterNumber: string) => {
        const response = await fetch(`${BASE_URL}/${machine}/${machineId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ brand: newMachineBrand, model: newMachineModel, registerNumber: MachineRegisterNumber }),
        });

        return response;
    },

    transferMachine: async (machineId: string, newFarmId: string) => {
        const response = await fetch(`${BASE_URL}/${machine}/${machineId}/transfer`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ newFarmId }),
        });

        return response;
    },

    deleteMachine: async (machineId: string) => {
        const response = await fetch(`${BASE_URL}/${machine}/${machineId}`, {
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
