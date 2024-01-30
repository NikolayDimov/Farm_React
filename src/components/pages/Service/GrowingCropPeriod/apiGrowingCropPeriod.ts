import authHeader from "../../../../services/authHeader";
import { GrowingCropPeriod } from "./GrowingCropPeriod.static";

const BASE_URL = "http://localhost:3000";

export const apiGrowingCropPeriod = {
    fetchCrops: async () => {
        try {
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/growingCropPeriod`, {
                method: "GET",
                headers,
            });
            const growingCropPeriodData = await response.json();
            return growingCropPeriodData;
        } catch (error) {
            console.error("Error in fetching growingCropPeriod", error);
            throw error;
        }
    },

    createGrowingCropPeriod: async (newGrowingCropPeriodData: GrowingCropPeriod) => {
        try {
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/growingCropPeriod`, {
                method: "POST",
                headers,
                credentials: "include",
                body: JSON.stringify(newGrowingCropPeriodData),
            });

            return response;
        } catch (error) {
            console.error("Error creating a new growingCropPeriod:", error);
            throw error;
        }
    },
};
