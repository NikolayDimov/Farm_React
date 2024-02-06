import React from "react";
import { Machine as MachineProp } from "../../Machine/Machine.static";
import { Farm } from "../../Farm/Farm.static";
import { TransferMachineContainer, SelectContainer, Label, Select, TransferButton } from "../../../common/Machine.styles";
import { Title } from "../../Auth/StyledComponents";
import useTransferMachine from "./TransferMachine.logic";

interface MachineTransferProps {
    machines: MachineProp[];
    farms: Farm[];
    onTransferSuccess: () => void;
    fetchMachines: () => Promise<void>;
}

const TransferMachine: React.FC<MachineTransferProps> = ({ machines, farms, onTransferSuccess, fetchMachines }) => {
    const { selectedMachineId, selectedFarmId, loading, setSelectedMachineId, setSelectedFarmId, handleTransfer, successMessage } = useTransferMachine({
        onTransferSuccess,
        fetchMachines,
    });

    return (
        <TransferMachineContainer>
            <Title>Transfer Machine</Title>
            {successMessage && <p style={{ color: successMessage.includes("Cannot") ? "red" : "green" }}>{successMessage}</p>}
            <SelectContainer>
                <Label>Select Machine:</Label>
                <Select value={selectedMachineId} onChange={(e) => setSelectedMachineId(e.target.value)} disabled={loading}>
                    <option value="" disabled>
                        Select Machine
                    </option>
                    {machines.map((machine) => (
                        <option key={machine.id} value={machine.id}>
                            {machine.brand} {machine.model} {machine.registerNumber}
                        </option>
                    ))}
                </Select>
            </SelectContainer>
            <SelectContainer>
                <Label>Select Farm:</Label>
                <Select value={selectedFarmId} onChange={(e) => setSelectedFarmId(e.target.value)} disabled={loading}>
                    <option value="" disabled>
                        Select Farm
                    </option>
                    {farms.map((farm) => (
                        <option key={farm.id} value={farm.id}>
                            {farm.name}
                        </option>
                    ))}
                </Select>
            </SelectContainer>
            <TransferButton
                onClick={() => {
                    handleTransfer();
                }}
                disabled={!selectedMachineId || !selectedFarmId || loading}
            >
                Transfer Machine
            </TransferButton>
        </TransferMachineContainer>
    );
};

export default TransferMachine;
