import { BASE_URL } from "../static/baseUrl";
import { apiEndpoints } from "../static/apiEndpoints";
import { getUser } from "./authHeaders";
import { Field } from "../components/pages/Field/Field.static";

const user = getUser();
const field = apiEndpoints.field;

export const apiField = {
    fetchFields: async () => {
        try {
            const response = await fetch(`${BASE_URL}/${field}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
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
            const response = await fetch(`${BASE_URL}/${field}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(newField),
            });

            return response;
        } catch (error) {
            console.error("Error creating a new field:", error);
            throw error;
        }
    },

    editField: async (fieldId: string, newFieldName: string, newSoilId: string) => {
        try {
            const response = await fetch(`${BASE_URL}/${field}/${fieldId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ name: newFieldName, soilId: newSoilId }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error(`Failed to edit field with ID: ${fieldId}`, errorResponse);
                throw new Error("Failed to edit field");
            }

            return response;
        } catch (error) {
            console.error("Error editing field:", error);
            throw error;
        }
    },

    deleteField: async (fieldId: string) => {
        try {
            const response = await fetch(`${BASE_URL}/${field}/${fieldId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error(`Failed to delete field with ID: ${fieldId}`, errorResponse);
                throw new Error("Failed to delete field");
            }
            return response;
        } catch (error) {
            console.error("Error deleting field:", error);
            throw new Error("Failed to delete field");
        }
    },
};
