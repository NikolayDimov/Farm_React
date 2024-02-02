import { useEffect, useState } from "react";
import { apiSoil } from "../../../../services/apiSoil";
import { Soil as SoilProp } from "../Soil.static";

interface UseSoilListProps {
    fetchSoils: () => Promise<void>;
}

const useSoilList = ({ fetchSoils }: UseSoilListProps) => {
    const [selectedSoilIdForDelete, setSelectedSoilIdForDelete] = useState<string | null>(null);
    const [selectedSoilIdForEdit, setSelectedSoilIdForEdit] = useState<string | null>(null);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [currentSoilName, setCurrentSoilName] = useState<string>("");
    const [originalSoilName, setOriginalSoilName] = useState<string>("");
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

    const onDeleteClick = (soilId: string) => {
        setSelectedSoilIdForDelete(soilId);
        setDeleteModalVisible(true);
    };

    const onEditClick = (soilId: string, soilName: string) => {
        setSelectedSoilIdForEdit(soilId);
        setCurrentSoilName(soilName);
        setOriginalSoilName(soilName);
        setEditModalVisible(true);
    };

    const onDeleteSoil = async (soilId: string) => {
        try {
            setLoading(true);
            const response = await apiSoil.deleteSoil(soilId);

            if (response.ok) {
                fetchSoils();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to delete soil with ID: ${soilId}`, responseBody);

                if (response.status === 400 && responseBody.error?.message) {
                    showModal(responseBody.error.message);
                    setConfirmation(true);
                } else {
                    showModal("Failed to delete soil");
                }
            }
        } catch (error) {
            console.error("Error deleting soil:", error);
            showModal("Failed to delete soil");
        } finally {
            setLoading(false);
        }
    };

    const onEditSoil = async (soilId: string, newSoilName: string) => {
        try {
            setLoading(true);
            const response = await apiSoil.editSoil(soilId, newSoilName);

            if (response.ok) {
                fetchSoils(); // Refresh soils after editing
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit soil with ID: ${soilId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing soil:", error);
            showModal("Failed to edit soil");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (selectedSoilIdForDelete) {
            await onDeleteSoil(selectedSoilIdForDelete);
            setSelectedSoilIdForDelete(null);
            setDeleteModalVisible(false);
        }
    };

    const handleDeleteCancel = () => {
        setSelectedSoilIdForDelete(null);
        setDeleteModalVisible(false);
    };

    const handleEditConfirm = async () => {
        try {
            if (selectedSoilIdForEdit) {
                await onEditSoil(selectedSoilIdForEdit, currentSoilName);
                fetchSoils();
            }

            setSelectedSoilIdForEdit(null);
            setEditModalVisible(false);
            setCurrentSoilName("");
        } catch (error) {
            console.error("Error handling edit confirmation:", error);
        }
    };

    const handleEditCancel = () => {
        setSelectedSoilIdForEdit(null);
        setEditModalVisible(false);
        setCurrentSoilName("");
    };

    return {
        onDeleteClick,
        onEditClick,
        isDeleteModalVisible,
        isEditModalVisible,
        currentSoilName,
        setCurrentSoilName,
        originalSoilName,
        handleDeleteConfirm,
        handleDeleteCancel,
        handleEditConfirm,
        handleEditCancel,
    };
};

export default useSoilList;
