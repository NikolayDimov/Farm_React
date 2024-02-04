import { BASE_URL } from "../static/baseUrl";
import { apiEndpoints } from "../static/apiEndpoints";
import { getUser } from "./authHeaders";

const processingType = apiEndpoints.processingType;
const user = getUser();

export const apiProcessingType = {
    fetchProcessingTypes: async () => {
        try {
            const response = await fetch(`${BASE_URL}/${processingType}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch processingType");
            }
            const processingTypeData = await response.json();
            return processingTypeData;
        } catch (error) {
            console.error("Error in fetching ProcessingType", error);
            throw error;
        }
    },

    createProcessingType: async (processingTypeName: string) => {
        try {
            const response = await fetch(`${BASE_URL}/${processingType}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ name: processingTypeName }),
            });

            if (!response.ok) {
                throw new Error(`Failed to create ProcessingType: ${response.statusText}`);
            }

            return response;
        } catch (error) {
            console.error("Error creating a new crop:", error);
            throw error;
        }
    },

    editProcessingType: async (processingTypeId: string, newProcessingTypeName: string) => {
        try {
            const response = await fetch(`${BASE_URL}/${processingType}/${processingTypeId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ name: newProcessingTypeName }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error(`Failed to edit processingType with ID: ${processingTypeId}`, errorResponse);
                throw new Error("Failed to edit processingType");
            }

            return response;
        } catch (error) {
            console.error("Error editing processingType:", error);
            throw error;
        }
    },

    deleteProcessingType: async (processingTypeId: string) => {
        try {
            const response = await fetch(`${BASE_URL}/${processingType}/${processingTypeId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error(`Failed to delete ProcessingType with ID: ${processingTypeId}`, errorResponse);
                throw new Error("Failed to delete ProcessingType");
            }
            return response;
        } catch (error) {
            console.error("Error deleting ProcessingType:", error);
            throw new Error("Failed to delete ProcessingType");
        }
    },
};
