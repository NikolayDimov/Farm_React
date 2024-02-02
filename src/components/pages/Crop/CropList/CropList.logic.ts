import { useEffect, useState } from "react";
import { apiCrop } from "../../../../services/apiCrop";

interface UseCropListProps {
    fetchCrops: () => Promise<void>;
}

const useCropList = ({ fetchCrops }: UseCropListProps) => {
    const [selectedCropIdForDelete, setSelectedCropIdForDelete] = useState<string | null>(null);
    const [selectedCropIdForEdit, setSelectedCropIdForEdit] = useState<string | null>(null);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [currentCropName, setCurrentCropName] = useState<string>("");
    const [originalCropName, setOriginalCropName] = useState<string>("");
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

    const onDeleteCrop = async (cropId: string) => {
        try {
            setLoading(true);
            const response = await apiCrop.deleteCrop(cropId);

            if (response.ok) {
                fetchCrops();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to delete crop with ID: ${cropId}`, responseBody);

                if (response.status === 400 && responseBody.error?.message) {
                    showModal(responseBody.error.message);
                    setConfirmation(true);
                } else {
                    showModal("Failed to delete crop");
                }
            }
        } catch (error) {
            console.error("Error deleting crop:", error);
            showModal("Failed to delete crop");
        } finally {
            setLoading(false);
        }
    };

    const onEditCrop = async (cropId: string, newCropName: string) => {
        try {
            setLoading(true);
            const response = await apiCrop.editCrop(cropId, newCropName);

            if (response.ok) {
                fetchCrops();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit crop with ID: ${cropId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing crop:", error);
            showModal("Failed to edit crop");
        } finally {
            setLoading(false);
        }
    };

    const onDeleteClick = (cropId: string) => {
        setSelectedCropIdForDelete(cropId);
        setDeleteModalVisible(true);
    };

    const onEditClick = (cropId: string, cropName: string) => {
        setSelectedCropIdForEdit(cropId);
        setCurrentCropName(cropName);
        setOriginalCropName(cropName);
        setEditModalVisible(true);
    };

    const handleDeleteConfirm = async () => {
        if (selectedCropIdForDelete) {
            await onDeleteCrop(selectedCropIdForDelete);
            setSelectedCropIdForDelete(null);
            setDeleteModalVisible(false);
        }
    };

    const handleDeleteCancel = () => {
        setSelectedCropIdForDelete(null);
        setDeleteModalVisible(false);
    };

    const handleEditConfirm = async () => {
        try {
            if (selectedCropIdForEdit) {
                await onEditCrop(selectedCropIdForEdit, currentCropName);
                fetchCrops();
            }

            setSelectedCropIdForEdit(null);
            setEditModalVisible(false);
            setCurrentCropName("");
        } catch (error) {
            console.error("Error handling edit confirmation:", error);
        }
    };

    const handleEditCancel = () => {
        setSelectedCropIdForEdit(null);
        setEditModalVisible(false);
        setCurrentCropName("");
    };

    return {
        onDeleteClick,
        onEditClick,
        isDeleteModalVisible,
        isEditModalVisible,
        currentCropName,
        setCurrentCropName,
        originalCropName,
        handleDeleteConfirm,
        handleDeleteCancel,
        handleEditConfirm,
        handleEditCancel,
    };
};

export default useCropList;
