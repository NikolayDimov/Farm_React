import authHeader from "../../../../services/authHeader";

const BASE_URL = "http://localhost:3000";

export const apiField = {
    fetchFields: async () => {
        try {
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/field`, {
                method: "GET",
                headers,
            });
            const fieldData = await response.json();
            return fieldData;
        } catch (error) {
            console.error("Error in fetching fields", error);
            throw error;
        }
    },

    createField: async (fieldName: string) => {
        try {
            const authHeaders = authHeader();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
            };

            const response = await fetch(`${BASE_URL}/field`, {
                method: "POST",
                headers,
                credentials: "include",
                body: JSON.stringify({
                    name: fieldName,
                    boundary: {
                        type: "Polygon",
                        coordinates: outlinedCoordinates,
                    },
                    farmId: newFarmId,
                    soilId: newSoilId,
                }),
            });

            return response;
        } catch (error) {
            console.error("Error creating a new field:", error);
            throw error;
        }
    },
};
