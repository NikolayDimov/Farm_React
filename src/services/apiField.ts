import { BASE_URL } from "../static/baseUrl";
import { apiEndpoints } from "../static/apiEndpoints";
import { getUser } from "./authHeaders";
import { Field, FieldCoordinates, UpdateField } from "../components/pages/Field/Field.static";

const field = apiEndpoints.field;
const user = getUser();

export const apiField = {
    fetchFields: async () => {
        if (!user && !user.access_token) {
            throw new Error("User not authenticated");
        }
        const response = await fetch(`${BASE_URL}/${field}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
        });

        const fieldData = await response.json();
        return fieldData;
    },

    getFieldDetails: async (fieldId: string) => {
        const response = await fetch(`${BASE_URL}/${field}/${fieldId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
        });

        return response;
    },

    createField: async (newField: Field) => {
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
    },

    editField: async (fieldId: string, updatedFieldData: UpdateField) => {
        const response = await fetch(`${BASE_URL}/${field}/${fieldId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(updatedFieldData),
        });

        return response;
    },

    deleteField: async (fieldId: string) => {
        const response = await fetch(`${BASE_URL}/${field}/${fieldId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        return response;
    },
};
