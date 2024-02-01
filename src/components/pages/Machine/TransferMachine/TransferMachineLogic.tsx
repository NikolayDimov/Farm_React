import React, { useState } from "react";
import { Machine } from "../Machine.static";
import { Farm } from "../../Farm/Farm.static";
import { apiMachine } from "../../../../services/apiMachine";
import TransferMachinePresentation from "./TransferMachinePresentation";

interface TransferMachineLogicProps {
    machines: Machine[];
    farms: Farm[];
    onTransferSuccess: () => void;
}

const TransferMachineLogic: React.FC<TransferMachineLogicProps> = ({ machines, farms, onTransferSuccess }) => {
    const [selectedMachineId, setSelectedMachineId] = useState<string>("");
    const [selectedFarmId, setSelectedFarmId] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleTransfer = async () => {
        try {
            if (!selectedMachineId || !selectedFarmId) {
                console.error("Please select both a machine and a farm for the transfer.");
                return;
            }

            setLoading(true);
            const response = await apiMachine.transferMachine(selectedMachineId, selectedFarmId);
            const responseBody = await response.json();

            if (response.ok) {
                // Wait for the `setSelectedFarmId` function to complete
                const updatePromise = setSelectedFarmId(selectedFarmId);
                await updatePromise;

                onTransferSuccess();
            } else {
                console.error(`Failed to transfer machine: ${responseBody.error?.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error transferring machine:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TransferMachinePresentation
            machines={machines}
            farms={farms}
            selectedMachineId={selectedMachineId}
            selectedFarmId={selectedFarmId}
            loading={loading}
            setSelectedMachineId={setSelectedMachineId}
            setSelectedFarmId={setSelectedFarmId}
            handleTransfer={handleTransfer}
        />
    );
};

export default TransferMachineLogic;
