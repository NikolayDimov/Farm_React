import { GrowingCropPeriod } from "../components/pages/GrowingCropPeriod/GrowingCropPeriod.static";
import { BASE_URL } from "../static/baseUrl";
import { apiEndpoints } from "../static/apiEndpoints";
import { getUser } from "./authHeaders";

const gcp = apiEndpoints.growingPeriod;
const user = getUser();

export const apiGrowingCropPeriod = {
    fetchGCP: async () => {
        const response = await fetch(`${BASE_URL}/${gcp}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
        });

        const growingCropPeriodData = await response.json();
        return growingCropPeriodData;
    },

    createGrowingCropPeriod: async (newGrowingCropPeriodData: GrowingCropPeriod) => {
        const response = await fetch(`${BASE_URL}/${gcp}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(newGrowingCropPeriodData),
        });

        return response;
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
