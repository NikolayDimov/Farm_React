import React, { useEffect, useState } from "react";
import { apiMachine } from "../../../../services/apiMachine";

interface UseMachineListProps {
    fetchMachines: () => Promise<void>;
}

const useMachineList = ({ fetchMachines }: UseMachineListProps) => {
    const [selectedMachineIdForDelete, setSelectedMachineIdForDelete] = useState<string | null>(null);
    const [selectedMachineIdForEdit, setSelectedMachineIdForEdit] = useState<string | null>(null);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [currentMachineBrand, setCurrentMachineBrand] = useState<string>("");
    const [currentMachineModel, setCurrentMachineModel] = useState<string>("");
    const [currentMachineRegisterNumber, setCurrentMachineRegisterNumber] = useState<string>("");
    const [originalMachineBrand, setOriginalMachineBrand] = useState<string>("");
    const [originalMachineModel, setOriginalMachineModel] = useState<string>("");
    const [originalMachineRegisterNumber, setOriginalMachineRegisterNumber] = useState<string>("");
    const [selectedFarmId, setSelectedFarmId] = useState<string>("");
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

    const onDeleteMachine = async (machineId: string) => {
        try {
            setLoading(true);

            const response = await apiMachine.deleteMachine(machineId);

            if (response.ok) {
                fetchMachines();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to delete machine with ID: ${machineId}`, responseBody);

                if (response.status === 400 && responseBody.error?.message) {
                    showModal(responseBody.error.message);
                    setConfirmation(true);
                } else {
                    showModal("Failed to delete Machine");
                }
            }
        } catch (error) {
            console.error("Error deleting Machine:", error);
            showModal("Failed to delete Machine");
        } finally {
            setLoading(false);
        }
    };

    const onEditMachine = async (machineId: string, newMachineBrand: string, newMachineModel: string, MachineRegisterNumber: string, newFarmId: string) => {
        try {
            setLoading(true);

            const response = await apiMachine.editMachine(machineId, newMachineBrand, newMachineModel, MachineRegisterNumber, newFarmId);

            if (response.ok) {
                fetchMachines();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit machine with ID: ${machineId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing machine:", error);
            showModal("Failed to edit machine");
        } finally {
            setLoading(false);
        }
    };

    const onDeleteClick = (machineId: string | undefined) => {
        if (machineId) {
            setSelectedMachineIdForDelete(machineId);
            setDeleteModalVisible(true);
        }
    };

    const onEditClick = (machineId: string | undefined, machineBrand: string, machineModel: string, machineRegisterNumber: string, farmId: string) => {
        if (machineId) {
            setSelectedMachineIdForEdit(machineId);
            setCurrentMachineBrand(machineBrand);
            setCurrentMachineModel(machineModel);
            setCurrentMachineRegisterNumber(machineRegisterNumber);
            setOriginalMachineBrand(machineBrand);
            setOriginalMachineModel(machineModel);
            setOriginalMachineRegisterNumber(machineRegisterNumber);
            setSelectedFarmId(farmId);
            setEditModalVisible(true);
        }
    };

    const onDeleteConfirm = async () => {
        if (selectedMachineIdForDelete) {
            await onDeleteMachine(selectedMachineIdForDelete);
            setSelectedMachineIdForDelete(null);
            setDeleteModalVisible(false);
        }
    };

    const onDeleteCancel = () => {
        setSelectedMachineIdForDelete(null);
        setDeleteModalVisible(false);
    };

    const onEditConfirm = async () => {
        try {
            if (selectedMachineIdForEdit) {
                await onEditMachine(selectedMachineIdForEdit, currentMachineBrand, currentMachineModel, currentMachineRegisterNumber, selectedFarmId);
            }

            setSelectedMachineIdForEdit(null);
            setEditModalVisible(false);
            setOriginalMachineBrand("");
            setOriginalMachineModel("");
            setOriginalMachineRegisterNumber("");
            setSelectedFarmId("");
        } catch (error) {
            console.error("Error handling edit confirmation:", error);
        }
    };

    const onEditCancel = () => {
        setSelectedMachineIdForEdit(null);
        setEditModalVisible(false);
        setCurrentMachineBrand("");
        setCurrentMachineModel("");
        setCurrentMachineRegisterNumber("");
        setSelectedFarmId("");
    };

    return {
        onDeleteClick,
        onEditClick,
        isDeleteModalVisible,
        isEditModalVisible,
        currentMachineBrand,
        currentMachineModel,
        currentMachineRegisterNumber,
        originalMachineBrand,
        originalMachineModel,
        originalMachineRegisterNumber,
        setCurrentMachineBrand,
        setCurrentMachineModel,
        setCurrentMachineRegisterNumber,
        setSelectedFarmId,
        selectedFarmId,
        onEditConfirm,
        onEditCancel,
        onDeleteConfirm,
        onDeleteCancel,
    };
};

export default useMachineList;
