import { BASE_URL } from "../static/baseUrl";
import { apiEndpoints } from "../static/apiEndpoints";
import { getUser } from "./authHeaders";

const crop = apiEndpoints.crop;
const user = getUser();

export const apiCrop = {
    fetchCrops: async () => {
        const response = await fetch(`${BASE_URL}/${crop}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
        });

        const cropData = await response.json();
        return cropData;
    },

    getCropDetails: async (cropId: string) => {
        const response = await fetch(`${BASE_URL}/${crop}/${cropId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
        });

        return response;
    },

    createCrop: async (cropName: string) => {
        const response = await fetch(`${BASE_URL}/${crop}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ name: cropName }),
        });

        return response;
    },

    editCrop: async (cropId: string, newCropName: string) => {
        const response = await fetch(`${BASE_URL}/${crop}/${cropId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ name: newCropName }),
        });

        return response;
    },

    deleteCrop: async (cropId: string) => {
        const response = await fetch(`${BASE_URL}/${crop}/${cropId}`, {
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
