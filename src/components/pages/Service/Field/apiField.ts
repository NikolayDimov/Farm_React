import authHeader from "../../../../services/authHeader";
import { Field } from "./Field.static";

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

            if (!response.ok) {
                console.error(`Failed to fetch fields. Status: ${response.status}`);
                throw new Error(`Failed to fetch fields. Status: ${response.status}`);
            }
            const fieldData = await response.json();
            return fieldData;
        } catch (error) {
            console.error("Error in fetching fields", error);
            throw error;
        }
    },

    createField: async (newField: Field) => {
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
                body: JSON.stringify(newField),
            });

            return response;
        } catch (error) {
            console.error("Error creating a new field:", error);
            throw error;
        }
    },
};
