import { useState } from "react";
import { apiMachine } from "../../../../services/apiMachine";
//import { Machine as MachineProp } from "../Machine.static";

interface TransferMachineProps {
    onTransferSuccess: () => void;
    fetchMachines: () => void;
}

const useTransferMachine = ({ onTransferSuccess, fetchMachines }: TransferMachineProps) => {
    const [selectedMachineId, setSelectedMachineId] = useState<string>("");
    const [selectedFarmId, setSelectedFarmId] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleTransfer = async () => {
        try {
            if (!selectedMachineId || !selectedFarmId) {
                console.error("Please select both a machine and a farm for the transfer.");
                return;
            }

            setLoading(true);
            const response = await apiMachine.transferMachine(selectedMachineId, selectedFarmId);

            if (response.ok) {
                const responseData = await response.json();
                setSelectedFarmId(responseData.data);

                setSuccessMessage("Machine transferred successfully!");
                onTransferSuccess();
                fetchMachines();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to transfer machine: ${responseBody}`, responseBody);
            }
        } catch (error) {
            console.error("Error transferring machine:", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        selectedMachineId,
        selectedFarmId,
        loading,
        setSelectedMachineId,
        setSelectedFarmId,
        handleTransfer,
        successMessage,
    };
};

export default useTransferMachine;
