import { useEffect, useState } from "react";
import { apiProcessingType } from "../../../../services/apiProcessingType";
import { ProcessingType as ProcessingTypeProp } from "../ProcessingType.static";

interface UseProcessingTypeListProps {
    fetchProcessingTypes: () => Promise<void>;
}

const useProcessingTypeList = ({ fetchProcessingTypes }: UseProcessingTypeListProps) => {
    const [selectedProcessingTypeIdForDelete, setSelectedProcessingTypeIdForDelete] = useState<string | null>(null);
    const [selectedProcessingTypeIdForEdit, setSelectedProcessingTypeIdForEdit] = useState<string | null>(null);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [currentProcessingTypeName, setCurrentProcessingTypeName] = useState<string>("");
    const [originalProcessingTypeName, setOriginalProcessingTypeName] = useState<string>("");
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

    const onDeleteClick = (processingTypeId: string) => {
        setSelectedProcessingTypeIdForDelete(processingTypeId);
        setDeleteModalVisible(true);
    };

    const onEditClick = (processingTypeId: string, processingTypeName: string) => {
        setSelectedProcessingTypeIdForEdit(processingTypeId);
        setCurrentProcessingTypeName(processingTypeName);
        setOriginalProcessingTypeName(processingTypeName);
        setEditModalVisible(true);
    };

    const onDeleteProcessingType = async (processingTypeId: string) => {
        try {
            setLoading(true);
            const response = await apiProcessingType.deleteProcessingType(processingTypeId);

            if (response.ok) {
                fetchProcessingTypes();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to delete processingType with ID: ${processingTypeId}`, responseBody);

                if (response.status === 400 && responseBody.error?.message) {
                    showModal(responseBody.error.message);
                    setConfirmation(true);
                } else {
                    showModal("Failed to delete processingType");
                }
            }
        } catch (error) {
            console.error("Error deleting processingType:", error);
            showModal("Failed to delete processingType");
        } finally {
            setLoading(false);
        }
    };

    const onEditProcessingType = async (processingTypeId: string, newProcessingTypeName: string) => {
        try {
            setLoading(true);
            const response = await apiProcessingType.editProcessingType(processingTypeId, newProcessingTypeName);

            if (response.ok) {
                fetchProcessingTypes(); // Refresh processingTypes after editing
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit processingType with ID: ${processingTypeId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing processingType:", error);
            showModal("Failed to edit processingType");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (selectedProcessingTypeIdForDelete) {
            await onDeleteProcessingType(selectedProcessingTypeIdForDelete);
            setSelectedProcessingTypeIdForDelete(null);
            setDeleteModalVisible(false);
        }
    };

    const handleDeleteCancel = () => {
        setSelectedProcessingTypeIdForDelete(null);
        setDeleteModalVisible(false);
    };

    const handleEditConfirm = async () => {
        try {
            if (selectedProcessingTypeIdForEdit) {
                await onEditProcessingType(selectedProcessingTypeIdForEdit, currentProcessingTypeName);
                fetchProcessingTypes(); // Refresh processingTypes after editing
            }

            setSelectedProcessingTypeIdForEdit(null);
            setEditModalVisible(false);
            setCurrentProcessingTypeName("");
        } catch (error) {
            console.error("Error handling edit confirmation:", error);
        }
    };

    const handleEditCancel = () => {
        setSelectedProcessingTypeIdForEdit(null);
        setEditModalVisible(false);
        setCurrentProcessingTypeName("");
    };

    return {
        onDeleteClick,
        onEditClick,
        isDeleteModalVisible,
        isEditModalVisible,
        currentProcessingTypeName,
        setCurrentProcessingTypeName,
        originalProcessingTypeName,
        handleDeleteConfirm,
        handleDeleteCancel,
        handleEditConfirm,
        handleEditCancel,
    };
};

export default useProcessingTypeList;
