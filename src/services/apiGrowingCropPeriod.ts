import { GrowingCropPeriod } from "../components/pages/GrowingCropPeriod/GrowingCropPeriod.static";
import { BASE_URL } from "../static/baseUrl";
import { apiEndpoints } from "../static/apiEndpoints";
import { getUser } from "./authHeaders";

const gcp = apiEndpoints.growingPeriod;
const user = getUser();

export const apiGrowingCropPeriod = {
    fetchGCP: async () => {
        try {
            const response = await fetch(`${BASE_URL}/${gcp}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch GCP");
            }
            const growingCropPeriodData = await response.json();
            return growingCropPeriodData;
        } catch (error) {
            console.error("Error in fetching growingCropPeriod", error);
            throw error;
        }
    },

    createGrowingCropPeriod: async (newGrowingCropPeriodData: GrowingCropPeriod) => {
        try {
            const response = await fetch(`${BASE_URL}/${gcp}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(newGrowingCropPeriodData),
            });
            if (!response.ok) {
                throw new Error("Failed to fetch GCP");
            }

            return response;
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
