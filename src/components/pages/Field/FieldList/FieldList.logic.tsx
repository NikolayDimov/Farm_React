import React, { useEffect, useState } from "react";
import { apiField } from "../../../../services/apiField";

interface UseFieldListProps {
    fetchFields: () => Promise<void>;
}

const useFieldList = ({ fetchFields }: UseFieldListProps) => {
    const [selectedFieldIdForDelete, setSelectedFieldIdForDelete] = useState<string | null>(null);
    const [selectedFieldIdForEdit, setSelectedFieldIdForEdit] = useState<string | null>(null);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [currentFieldName, setCurrentFieldName] = useState<string>("");
    const [originalFieldName, setOriginalFieldName] = useState<string>("");
    const [selectedFarmId, setSelectedFarmId] = useState<string>("");
    const [selectedSoilId, setSelectedSoilId] = useState<string>("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [confirmation, setConfirmation] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const showModal = (message: string) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    useEffect(() => {
        if (modalVisible) {
            const timeoutId = setTimeout(() => {
                setModalVisible(false);
                setModalMessage("");
                setConfirmation(false);
            }, 5000);

            return () => clearTimeout(timeoutId);
        }
    }, [modalVisible]);

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
                    showModal(responseBody.error.message);
                    setConfirmation(true);
                } else {
                    showModal("Failed to delete Field");
                }
            }
        } catch (error) {
            console.error("Error deleting Field:", error);
            showModal("Failed to delete Field");
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
            showModal("Failed to edit field");
        } finally {
            setLoading(false);
        }
    };

    const onDeleteClick = (fieldId: string | undefined) => {
        if (fieldId) {
            setSelectedFieldIdForDelete(fieldId);
            setDeleteModalVisible(true);
        }
    };

    const onEditClick = (fieldId: string | undefined, fieldName: string, soilId: string) => {
        if (fieldId) {
            setSelectedFieldIdForEdit(fieldId);
            setCurrentFieldName(fieldName);
            setOriginalFieldName(fieldName);
            setSelectedSoilId(soilId);
            setEditModalVisible(true);
        }
    };

    const onDeleteConfirm = async () => {
        if (selectedFieldIdForDelete) {
            await onDeleteField(selectedFieldIdForDelete);
            setSelectedFieldIdForDelete(null);
            setDeleteModalVisible(false);
        }
    };

    const onDeleteCancel = () => {
        setSelectedFieldIdForDelete(null);
        setDeleteModalVisible(false);
    };

    const onEditConfirm = async () => {
        try {
            if (selectedFieldIdForEdit) {
                await onEditField(selectedFieldIdForEdit, currentFieldName, selectedSoilId);
            }

            setSelectedFieldIdForEdit(null);
            setEditModalVisible(false);
            setCurrentFieldName("");
            setSelectedSoilId("");
        } catch (error) {
            console.error("Error handling edit confirmation:", error);
        }
    };

    const onEditCancel = () => {
        setSelectedFieldIdForEdit(null);
        setEditModalVisible(false);
        setCurrentFieldName("");
        setSelectedSoilId("");
    };

    return {
        onDeleteClick,
        onEditClick,
        isDeleteModalVisible,
        isEditModalVisible,
        currentFieldName,
        originalFieldName,
        setSelectedFarmId,
        selectedFarmId,
        selectedSoilId,
        onEditConfirm,
        onEditCancel,
        onDeleteConfirm,
        onDeleteCancel,
        setCurrentFieldName,
        setSelectedSoilId,
    };
};

export default useFieldList;
