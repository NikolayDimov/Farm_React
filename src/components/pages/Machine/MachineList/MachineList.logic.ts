import { useState } from "react";
import { apiMachine } from "../../../../services/apiMachine";
import { Machine as MachineProp } from "../Machine.static";

interface UseMachineListProps {
    fetchMachines: () => Promise<void>;
}

const useMachineList = ({ fetchMachines }: UseMachineListProps) => {
    const [selectedMachineIdForDelete, setSelectedMachineIdForDelete] = useState<string | null>(null);
    const [selectedMachineIdForEdit, setSelectedMachineIdForEdit] = useState<string | null>(null);
    const [currentMachineBrand, setCurrentMachineBrand] = useState<string>("");
    const [currentMachineModel, setCurrentMachineModel] = useState<string>("");
    const [currentMachineRegisterNumber, setCurrentMachineRegisterNumber] = useState<string>("");
    const [originalMachineBrand, setOriginalMachineBrand] = useState<string>("");
    const [originalMachineModel, setOriginalMachineModel] = useState<string>("");
    const [originalMachineRegisterNumber, setOriginalMachineRegisterNumber] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [machineDetails, setMachineDetails] = useState<MachineProp>();

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
                    console.error("Error deleting crop:", responseBody.error?.message);
                }
            }
        } catch (error) {
            console.error("Error deleting Machine:", error);
        } finally {
            setLoading(false);
        }
    };

    const onEditMachine = async (machineId: string, newMachineBrand: string, newMachineModel: string, MachineRegisterNumber: string) => {
        try {
            setLoading(true);

            const response = await apiMachine.editMachine(machineId, newMachineBrand, newMachineModel, MachineRegisterNumber);

            if (response.ok) {
                fetchMachines();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit machine with ID: ${machineId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing machine:", error);
        } finally {
            setLoading(false);
        }
    };

    const onDetailMachine = async (machineId: string) => {
        try {
            setLoading(true);
            const response = await apiMachine.getMachineDetails(machineId);

            if (response.ok) {
                const responseData = await response.json();
                setMachineDetails(responseData.data);
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit farm with ID: ${machineId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing farm:", error);
        } finally {
            setLoading(false);
        }
    };

    const onDeleteClick = (machineId: string | undefined) => {
        if (machineId) {
            setSelectedMachineIdForDelete(machineId);
        }
    };

    const onEditClick = (machineId: string | undefined, machineBrand: string, machineModel: string, machineRegisterNumber: string) => {
        if (machineId) {
            setSelectedMachineIdForEdit(machineId);
            setCurrentMachineBrand(machineBrand);
            setCurrentMachineModel(machineModel);
            setCurrentMachineRegisterNumber(machineRegisterNumber);
            setOriginalMachineBrand(machineBrand);
            setOriginalMachineModel(machineModel);
            setOriginalMachineRegisterNumber(machineRegisterNumber);
        }
    };

    const onDetailsClick = (machineId: string) => {
        onDetailMachine(machineId);
    };

    const onDeleteConfirm = async () => {
        if (selectedMachineIdForDelete) {
            await onDeleteMachine(selectedMachineIdForDelete);
            setSelectedMachineIdForDelete(null);
        }
    };

    const onEditConfirm = async () => {
        try {
            if (selectedMachineIdForEdit) {
                await onEditMachine(selectedMachineIdForEdit, currentMachineBrand, currentMachineModel, currentMachineRegisterNumber);
                fetchMachines();
            }

            setSelectedMachineIdForEdit(null);
            setOriginalMachineBrand("");
            setOriginalMachineModel("");
            setOriginalMachineRegisterNumber("");
        } catch (error) {
            console.error("Error handling edit confirmation:", error);
        }
    };

    return {
        onDeleteClick,
        onEditClick,
        onDetailsClick,
        currentMachineBrand,
        currentMachineModel,
        currentMachineRegisterNumber,
        originalMachineBrand,
        originalMachineModel,
        originalMachineRegisterNumber,
        setCurrentMachineBrand,
        setCurrentMachineModel,
        setCurrentMachineRegisterNumber,
        onEditConfirm,
        onDeleteConfirm,
        machineDetails,
    };
};

export default useMachineList;
