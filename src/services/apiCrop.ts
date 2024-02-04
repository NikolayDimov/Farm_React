import { BASE_URL } from "../static/baseUrl";
import { apiEndpoints } from "../static/apiEndpoints";
import { getUser } from "./authHeaders";

const crop = apiEndpoints.crop;
const user = getUser();

export const apiCrop = {
    fetchCrops: async () => {
        try {
            const response = await fetch(`${BASE_URL}/${crop}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch crops");
            }

            const cropData = await response.json();
            return cropData;
        } catch (error) {
            console.error("Error in fetching crops", error);
            throw error;
        }
    },

    getCropDetails: async (cropId: string) => {
        try {
            const response = await fetch(`${BASE_URL}/${crop}/${cropId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch crop details for ID: ${cropId}`);
            }

            return response;
        } catch (error) {
            console.error(`Error in fetching crop details for ID: ${cropId}`, error);
            throw error;
        }
    },

    createCrop: async (cropName: string) => {
        try {
            const response = await fetch(`${BASE_URL}/${crop}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ name: cropName }),
            });

            if (!response.ok) {
                throw new Error(`Failed to create Crop: ${response.statusText}`);
            }

            return response;
        } catch (error) {
            console.error("Error creating a new crop:", error);
            throw error;
        }
    },

    editCrop: async (cropId: string, newCropName: string) => {
        try {
            const response = await fetch(`${BASE_URL}/${crop}/${cropId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ name: newCropName }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error(`Failed to edit crop with ID: ${cropId}`, errorResponse);
                throw new Error("Failed to edit crop");
            }

            return response;
        } catch (error) {
            console.error("Error editing crop:", error);
            throw error;
        }
    },

    deleteCrop: async (cropId: string) => {
        try {
            const response = await fetch(`${BASE_URL}/${crop}/${cropId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error(`Failed to delete crop with ID: ${cropId}`, errorResponse);
                throw new Error("Failed to delete crop");
            }
            return response;
        } catch (error) {
            console.error("Error deleting crop:", error);
            throw new Error("Failed to delete crop");
        }
    },
};
