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

// Assuming your apiGrowingCropPeriod type looks like this:
type ApiGrowingCropPeriod = {
    fetchGCP: () => Promise<any>;
    createGrowingCropPeriod: (newGrowingCropPeriodData: GrowingCropPeriod) => Promise<Response>;
    // ... other methods or properties
};

// Extend the type definition to include createGrowingCropPeriod
type ExtendedApiGrowingCropPeriod = ApiGrowingCropPeriod & {
    createGrowingCropPeriod: (newGrowingCropPeriodData: GrowingCropPeriod) => Promise<Response>;
    // ... other methods or properties
};

// Declaration of apiGrowingCropPeriodExtended
const apiGrowingCropPeriodExtended: ExtendedApiGrowingCropPeriod = {
    fetchGCP: apiGrowingCropPeriod.fetchGCP,
    createGrowingCropPeriod: apiGrowingCropPeriod.createGrowingCropPeriod,
    // ... other methods or properties
};

export { apiGrowingCropPeriodExtended };
