import { useState } from "react";
import { apiField } from "../../../../services/apiField";
import { Field as FieldProp } from "../Field.static";

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

    const onDeleteField = async (fieldId: string) => {
        try {
            setLoading(true);

            const response = await apiField.deleteField(fieldId);

            if (response.ok) {
                fetchFields();
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

    const onEditField = async (fieldId: string, newFieldName: string, newSoilId: string) => {
        try {
            setLoading(true);
            //const originalOrder: Field[] = [...fields];
            const response = await apiField.editField(fieldId, newFieldName, newSoilId);

            if (response.ok) {
                // const updatedFieldData = await apiField.fetchFields();
                // setFields(originalOrder.map((originalField: FieldProp) => updatedFieldData.data.find((updatedField: FieldProp) => updatedField.id === originalField.id) as FieldProp));
                fetchFields();
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

    const onEditClick = (fieldId: string | undefined, fieldName: string, soilId: string) => {
        if (fieldId) {
            setSelectedFieldIdForEdit(fieldId);
            setCurrentFieldName(fieldName);
            setOriginalFieldName(fieldName);
            setSelectedSoilId(soilId);
        }
    };

    const onDetailsClick = (machineId: string) => {
        onDetailField(machineId);
    };

    const onDeleteConfirm = async () => {
        if (selectedFieldIdForDelete) {
            await onDeleteField(selectedFieldIdForDelete);
            setSelectedFieldIdForDelete(null);
        }
    };

    const onEditConfirm = async () => {
        try {
            if (selectedFieldIdForEdit) {
                await onEditField(selectedFieldIdForEdit, currentFieldName, selectedSoilId);
            }

            setSelectedFieldIdForEdit(null);
            setCurrentFieldName("");
            setSelectedSoilId("");
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
    };
};

export default useFieldList;
