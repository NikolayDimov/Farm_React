import React, { useEffect, useState } from "react";
import MachinePresentation from "./MachinePresentation";
import { Machine } from "./Machine.static";
import { apiMachine } from "../../../services/apiMachine";
import { apiFarm } from "../../../services/apiFarm";
import { Farm } from "../Farm/Farm.static";

const MachineLogic: React.FC = () => {
    const [machines, setMachines] = useState<Machine[]>([]);
    const [farms, setFarms] = useState<Farm[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [confirmation, setConfirmation] = useState(false);
    const [transferMode, setTransferMode] = useState<boolean>(false);

    const fetchMachines = async () => {
        try {
            const machinesData = await apiMachine.fetchMachines();
            const farmsData = await apiFarm.fetchFarms();

            setMachines(machinesData.data);
            setFarms(farmsData.data);
        } catch (error) {
            console.error("Error in fetching machine", error);
        }
    };

    useEffect(() => {
        fetchMachines();
    }, []);

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

    const handleDeleteMachine = async (machineId: string) => {
        try {
            setLoading(true);

            const response = await apiMachine.deleteMachine(machineId);

            if (response.ok) {
                setMachines((prevMachines) => prevMachines.filter((machine) => machine.id !== machineId));
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

    const handleEditMachine = async (machineId: string, newMachineBrand: string, newMachineModel: string, MachineRegisterNumber: string, newFarmId: string) => {
        try {
            setLoading(true);
            const originalOrder: Machine[] = [...machines];
            const response = await apiMachine.editMachine(machineId, newMachineBrand, newMachineModel, MachineRegisterNumber, newFarmId);

            if (response.ok) {
                const updatedMachineData = await apiMachine.fetchMachines();
                setMachines(
                    originalOrder.map((originalMachine: Machine) => updatedMachineData.data.find((updatedMachine: Machine) => updatedMachine.id === originalMachine.id) as Machine)
                );
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

    const handleTransferSuccess = () => {
        setTransferMode(false);
        fetchMachines();
    };

    return (
        <MachinePresentation
            machines={machines}
            farms={farms}
            modalVisible={modalVisible}
            confirmation={confirmation}
            modalMessage={modalMessage}
            onDeleteMachine={handleDeleteMachine}
            onEditMachine={handleEditMachine}
            setModalVisible={setModalVisible}
            fetchMachines={fetchMachines}
            transferMode={transferMode}
            setTransferMode={setTransferMode}
            handleTransferSuccess={handleTransferSuccess}
        />
    );
};

export default MachineLogic;
