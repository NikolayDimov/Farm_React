import { BASE_URL } from "../static/baseUrl";
import { apiEndpoints } from "../static/apiEndpoints";
import { getUser } from "./authHeaders";

const soil = apiEndpoints.soil;
const user = getUser();

export const apiSoil = {
    fetchSoils: async () => {
        const response = await fetch(`${BASE_URL}/${soil}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
        });

        const soilData = await response.json();
        return soilData;
    },

    getSoilDetails: async (soilId: string) => {
        const response = await fetch(`${BASE_URL}/${soil}/${soilId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
        });

        return response;
    },

    createSoil: async (soilName: string) => {
        const response = await fetch(`${BASE_URL}/${soil}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ name: soilName }),
        });

        return response;
    },

    editSoil: async (soilId: string, newSoilName: string) => {
        const response = await fetch(`${BASE_URL}/${soil}/${soilId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ name: newSoilName }),
        });

        return response;
    },

    deleteSoil: async (soilId: string) => {
        const response = await fetch(`${BASE_URL}/${soil}/${soilId}`, {
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
