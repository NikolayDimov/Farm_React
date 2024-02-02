import React from "react";
import { Machine } from "../Machine.static";
import { Farm } from "../../Farm/Farm.static";
import { TransferMachineContainer, SelectContainer, Label, Select, TransferButton } from "../../../BaseLayout/common/Machine.styles";
import { Title } from "../../Auth/StyledComponents";

interface TransferMachinePresentationProps {
    machines: Machine[];
    farms: Farm[];
    selectedMachineId: string;
    selectedFarmId: string;
    loading: boolean;
    setSelectedMachineId: React.Dispatch<React.SetStateAction<string>>;
    setSelectedFarmId: React.Dispatch<React.SetStateAction<string>>;
    handleTransfer: () => void;
}

const TransferMachinePresentation: React.FC<TransferMachinePresentationProps> = ({
    machines,
    farms,
    selectedMachineId,
    selectedFarmId,
    loading,
    setSelectedMachineId,
    setSelectedFarmId,
    handleTransfer,
}) => {
    return (
        <TransferMachineContainer>
            <Title>Transfer Machine</Title>
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
            <TransferButton onClick={handleTransfer} disabled={!selectedMachineId || !selectedFarmId || loading}>
                Transfer Machine
            </TransferButton>
        </TransferMachineContainer>
    );
};

export default TransferMachinePresentation;
