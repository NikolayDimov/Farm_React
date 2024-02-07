import { BASE_URL } from "../static/baseUrl";
import { apiEndpoints } from "../static/apiEndpoints";
import { getUser } from "./authHeaders";

const processingType = apiEndpoints.processingType;
const user = getUser();

export const apiProcessingType = {
    fetchProcessingTypes: async () => {
        const response = await fetch(`${BASE_URL}/${processingType}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
        });

        const processingTypeData = await response.json();
        return processingTypeData;
    },

    getProcessingTypeDetails: async (processingTypeId: string) => {
        const response = await fetch(`${BASE_URL}/${processingType}/${processingTypeId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
        });

        return response;
    },

    createProcessingType: async (processingTypeName: string) => {
        const response = await fetch(`${BASE_URL}/${processingType}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ name: processingTypeName }),
        });

        return response;
    },

    editProcessingType: async (processingTypeId: string, newProcessingTypeName: string) => {
        const response = await fetch(`${BASE_URL}/${processingType}/${processingTypeId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ name: newProcessingTypeName }),
        });

        return response;
    },

    deleteProcessingType: async (processingTypeId: string) => {
        const response = await fetch(`${BASE_URL}/${processingType}/${processingTypeId}`, {
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
