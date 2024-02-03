import React, { useEffect, useState } from "react";
import { apiProcessing } from "../../../../services/apiProcessing";
import { Processing as ProcessingProp } from "../Processing.static";

interface UseProcessingListProps {
    fetchProcessings: () => Promise<void>;
}

const useProcessingList = ({ fetchProcessings }: UseProcessingListProps) => {
    const [selectedProcessingIdForDelete, setSelectedProcessingIdForDelete] = useState<string | null>(null);
    const [selectedProcessingIdForEdit, setSelectedProcessingIdForEdit] = useState<string | null>(null);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [currentProcessingDate, setCurrentProcessingDate] = useState<Date | undefined>();
    const [originalProcessingDate, setOriginalProcessingDate] = useState<string>("");
    const [selectedProcessingTypeId, setSelectedProcessingTypeId] = useState<string>("");
    const [selectedMachinedId, setSelectedMachineId] = useState<string>("");
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

    const onDeleteProcessing = async (processingId: string) => {
        try {
            setLoading(true);

            const response = await apiProcessing.deleteProcessing(processingId);

            if (response.ok) {
                fetchProcessings();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to delete Processing with ID: ${processingId}`, responseBody);

                if (response.status === 400 && responseBody.error?.message) {
                    showModal(responseBody.error.message);
                    setConfirmation(true);
                } else {
                    showModal("Failed to delete Processing");
                }
            }
        } catch (error) {
            console.error("Error deleting Processing:", error);
            showModal("Failed to delete Processing");
        } finally {
            setLoading(false);
        }
    };

    const onEditProcessing = async (processingId: string, newProcessingDate: Date, newProcessingTypeId: string, newMachineId: string) => {
        try {
            setLoading(true);
            //const originalOrder: ProcessingProp[] = [...processings];
            const response = await apiProcessing.editProcessing(processingId, newProcessingDate, newProcessingTypeId, newMachineId);

            if (response.ok) {
                fetchProcessings();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit processing with ID: ${processingId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing processing:", error);
            showModal("Failed to edit processing");
        } finally {
            setLoading(false);
        }
    };

    const onDeleteClick = (processingId: string | undefined) => {
        if (processingId) {
            setSelectedProcessingIdForDelete(processingId);
            setDeleteModalVisible(true);
        }
    };

    const onEditClick = (processingId: string | undefined, processingDate: Date, processingTypeId: string, machineId: string) => {
        if (processingId && processingDate) {
            setSelectedProcessingIdForEdit(processingId);
            setCurrentProcessingDate(processingDate);
            setSelectedProcessingTypeId(processingTypeId);
            setSelectedMachineId(machineId);
            setEditModalVisible(true);
        }
    };

    const onDeleteConfirm = async () => {
        if (selectedProcessingIdForDelete) {
            await onDeleteProcessing(selectedProcessingIdForDelete);
            setSelectedProcessingIdForDelete(null);
            setDeleteModalVisible(false);
        }
    };

    const onDeleteCancel = () => {
        setSelectedProcessingIdForDelete(null);
        setDeleteModalVisible(false);
    };

    const onEditConfirm = async () => {
        try {
            if (selectedProcessingIdForEdit && currentProcessingDate) {
                await onEditProcessing(selectedProcessingIdForEdit, currentProcessingDate, selectedProcessingTypeId, selectedMachinedId);
            }

            setSelectedProcessingIdForEdit(null);
            setEditModalVisible(false);
            setOriginalProcessingDate("");
            setSelectedProcessingTypeId("");
            setSelectedMachineId("");
        } catch (error) {
            console.error("Error handling edit confirmation:", error);
        }
    };

    const onEditCancel = () => {
        setSelectedProcessingIdForEdit(null);
        setEditModalVisible(false);
        setCurrentProcessingDate(undefined);
        setSelectedProcessingTypeId("");
        setSelectedMachineId("");
    };

    return {
        onDeleteClick,
        onEditClick,
        isDeleteModalVisible,
        isEditModalVisible,
        currentProcessingDate,
        originalProcessingDate,
        onEditConfirm,
        onEditCancel,
        onDeleteConfirm,
        onDeleteCancel,
        setSelectedProcessingTypeId,
        setSelectedMachineId,
        setCurrentProcessingDate,
        selectedProcessingTypeId,
        selectedMachinedId,
    };
};

export default useProcessingList;
