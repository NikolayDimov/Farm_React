import authHeader from "./authHeader";
import { GrowingCropPeriod } from "../components/pages/GrowingCropPeriod/GrowingCropPeriod.static";

const BASE_URL = "http://localhost:3000";

export const apiGrowingCropPeriod = {
    fetchGCP: async () => {
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

            return response; // This should now return a Promise<Response>
        } catch (error) {
            console.error("Error creating a new growingCropPeriod:", error);
            throw error;
        }
    },
};

type ApiGrowingCropPeriod = {
    fetchGCP: () => Promise<any>;
    createGrowingCropPeriod: (newGrowingCropPeriodData: GrowingCropPeriod) => Promise<Response>;
};

type ExtendedApiGrowingCropPeriod = ApiGrowingCropPeriod & {
    createGrowingCropPeriod: (newGrowingCropPeriodData: GrowingCropPeriod) => Promise<Response>;
};

const apiGrowingCropPeriodExtended: ExtendedApiGrowingCropPeriod = {
    fetchGCP: apiGrowingCropPeriod.fetchGCP,
    createGrowingCropPeriod: apiGrowingCropPeriod.createGrowingCropPeriod,
};

export { apiGrowingCropPeriodExtended };
