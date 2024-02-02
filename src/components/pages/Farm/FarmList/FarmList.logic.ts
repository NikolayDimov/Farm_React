import React, { useEffect, useState } from "react";

import { apiFarm } from "../../../../services/apiFarm";

interface UseFarmListProps {
    fetchFarms: () => Promise<void>;
}

const useFarmList = ({ fetchFarms }: UseFarmListProps) => {
    const [selectedFarmIdForDelete, setSelectedFarmIdForDelete] = useState<string | null>(null);
    const [selectedFarmIdForEdit, setSelectedFarmIdForEdit] = useState<string | null>(null);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [currentFarmName, setCurrentFarmName] = useState<string>("");
    const [originalFarmName, setOriginalFarmName] = useState<string>("");
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

    const onDeleteFarm = async (farmId: string) => {
        try {
            setLoading(true);

            const response = await apiFarm.deleteFarm(farmId);

            if (response.ok) {
                fetchFarms();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to delete farm with ID: ${farmId}`, responseBody);

                if (response.status === 400 && responseBody.error?.message) {
                    showModal(responseBody.error.message);
                    setConfirmation(true);
                } else {
                    showModal("Failed to delete farm");
                }
            }
        } catch (error) {
            console.error("Error deleting farm:", error);

            showModal("Failed to delete farm");
        } finally {
            setLoading(false);
        }
    };

    const onEditFarm = async (farmId: string, newFarmName: string) => {
        try {
            setLoading(true);
            const response = await apiFarm.editFarm(farmId, newFarmName);

            if (response.ok) {
                fetchFarms();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit farm with ID: ${farmId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing farm:", error);
            showModal("Failed to edit farm");
        } finally {
            setLoading(false);
        }
    };

    const onDeleteClick = (farmId: string) => {
        setSelectedFarmIdForDelete(farmId);
        setDeleteModalVisible(true);
    };

    const onEditClick = (farmId: string, farmName: string) => {
        setSelectedFarmIdForEdit(farmId);
        setCurrentFarmName(farmName);
        setOriginalFarmName(farmName);
        setEditModalVisible(true);
    };

    const handleDeleteConfirm = async () => {
        if (selectedFarmIdForDelete) {
            await onDeleteFarm(selectedFarmIdForDelete);
            setSelectedFarmIdForDelete(null);
            setDeleteModalVisible(false);
        }
    };

    const handleDeleteCancel = () => {
        setSelectedFarmIdForDelete(null);
        setDeleteModalVisible(false);
    };

    const handleEditConfirm = async () => {
        try {
            if (selectedFarmIdForEdit) {
                await onEditFarm(selectedFarmIdForEdit, currentFarmName);
                fetchFarms();
            }

            setSelectedFarmIdForEdit(null);
            setEditModalVisible(false);
            setCurrentFarmName("");
        } catch (error) {
            console.error("Error handling edit confirmation:", error);
        }
    };

    const handleEditCancel = () => {
        setSelectedFarmIdForEdit(null);
        setEditModalVisible(false);
        setCurrentFarmName("");
    };

    return {
        onDeleteClick,
        onEditClick,
        isDeleteModalVisible,
        isEditModalVisible,
        currentFarmName,
        setCurrentFarmName,
        originalFarmName,
        handleDeleteConfirm,
        handleDeleteCancel,
        handleEditConfirm,
        handleEditCancel,
    };
};

export default useFarmList;
