import { useState } from "react";
import { apiField } from "../../../../services/apiField";
import { FieldCoordinates, UpdateField, Field as FieldProp } from "../Field.static";

interface UseFieldListProps {
    fetchFields: () => Promise<void>;
}

const useFieldList = ({ fetchFields }: UseFieldListProps) => {
    const [selectedFieldIdForDelete, setSelectedFieldIdForDelete] = useState<string | null>(null);
    const [selectedFieldIdForEdit, setSelectedFieldIdForEdit] = useState<string | null>(null);
    const [currentFieldName, setCurrentFieldName] = useState<string>("");
    const [originalFieldName, setOriginalFieldName] = useState<string>("");
    const [selectedFarmId, setSelectedFarmId] = useState<string>("");
    const [selectedSoilId, setSelectedSoilId] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [fieldDetails, setFieldDetails] = useState<FieldProp>();
    const [newCoordinates, setFieldMapCoordinates] = useState<FieldCoordinates>();

    const handleSelectLocation = (coordinates: FieldCoordinates) => {
        console.log("Newly outlined coordinates:", coordinates);
        setFieldMapCoordinates(coordinates);
    };

    const onDeleteField = async (fieldId: string) => {
        try {
            setLoading(true);

            const response = await apiField.deleteField(fieldId);

            if (response.ok) {
                await fetchFields();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to delete field with ID: ${fieldId}`, responseBody);

                if (response.status === 400 && responseBody.error?.message) {
                    console.error("Error deleting crop:", responseBody.error?.message);
                }
            }
        } catch (error) {
            console.error("Error deleting Field:", error);
        } finally {
            setLoading(false);
        }
    };

    const onEditField = async (fieldId: string, currentFieldName: string, selectedSoilId: string, newCoordinates: number[][][]) => {
        console.log("onEditField function is called.");
        try {
            setLoading(true);

            console.log("Edit Field Data:", {
                fieldId,
                currentFieldName,
                selectedSoilId,
                newCoordinates,
            }); // Add this log

            const updatedFieldData: UpdateField = {
                name: currentFieldName,
                soilId: selectedSoilId,
                boundary: {
                    type: "Polygon",
                    coordinates: newCoordinates.coordinates,
                },
            };

            console.log("Updated Field Data:", updatedFieldData);
            const response = await apiField.editField(fieldId, updatedFieldData);
            console.log("Response from Server:", response);

            if (response.ok) {
                await fetchFields();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit field with ID: ${fieldId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing field:", error);
        } finally {
            setLoading(false);
        }
    };

    const onDetailField = async (fieldId: string) => {
        try {
            setLoading(true);
            const response = await apiField.getFieldDetails(fieldId);

            if (response.ok) {
                const responseData = await response.json();
                // console.log(responseData);
                setFieldDetails(responseData.data);
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit field with ID: ${fieldId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing field:", error);
        } finally {
            setLoading(false);
        }
    };

    const onDeleteClick = (fieldId: string | undefined) => {
        if (fieldId) {
            setSelectedFieldIdForDelete(fieldId);
        }
    };

    const onEditClick = (fieldId: string | undefined, updatedFieldData: UpdateField) => {
        // console.log("Field ID:", fieldId);
        // console.log("Updated Field Data:", updatedFieldData);
        if (fieldId) {
            setSelectedFieldIdForEdit(fieldId);
            setCurrentFieldName(updatedFieldData.name);
            setOriginalFieldName(updatedFieldData.name);
            setSelectedSoilId(updatedFieldData.soilId);
        }
    };

    const onDetailsClick = (fieldId: string) => {
        onDetailField(fieldId);
    };

    const onDeleteConfirm = async () => {
        if (selectedFieldIdForDelete) {
            await onDeleteField(selectedFieldIdForDelete);
            setSelectedFieldIdForDelete(null);
        }
    };

    const onEditConfirm = async () => {
        try {
            console.log("Before onEditField");
            const updatedCoordinates = newCoordinates;
            if (selectedFieldIdForEdit && updatedCoordinates) {
                console.log("Calling onEditField");
                await onEditField(selectedFieldIdForEdit, currentFieldName, selectedSoilId, updatedCoordinates);
            }
            // console.log("Novi koordinati", newCoordinates);
            // console.log("ime na pole:", currentFieldName);

            console.log("After onEditField");
            setSelectedFieldIdForEdit(null);
            setCurrentFieldName("");
            setSelectedSoilId("");
            setFieldMapCoordinates({ coordinates: [] });
        } catch (error) {
            console.error("Error handling edit confirmation:", error);
        }
    };

    return {
        onDeleteClick,
        onEditClick,
        onDetailsClick,
        currentFieldName,
        originalFieldName,
        setSelectedFarmId,
        selectedFarmId,
        selectedSoilId,
        onEditConfirm,
        onDeleteConfirm,
        setCurrentFieldName,
        setSelectedSoilId,
        fieldDetails,
        newCoordinates,
        setFieldMapCoordinates,
    };
};

export default useFieldList;
