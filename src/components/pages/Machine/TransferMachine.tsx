import React, { useEffect, useState } from 'react';
import { Machine } from './Machine.static';
import { Farm } from '../Farm/Farm.static';
import { apiMachine } from '../../../services/apiMachine';
import { TransferMachineContainer, SelectContainer, Label, Select, TransferButton } from '../../BaseLayout/common/Machine.styles';
import { Title } from '../Auth/StyledComponents';


interface TransferMachineProps {
  machines: Machine[];
  farms: Farm[];
  onTransferSuccess: () => void;
}

const TransferMachine: React.FC<TransferMachineProps> = ({ machines, farms, onTransferSuccess }) => {
  const [selectedMachineId, setSelectedMachineId] = useState<string>('');
  const [selectedFarmId, setSelectedFarmId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleTransfer = async () => {
    try {
      if (!selectedMachineId || !selectedFarmId) {
        console.error('Please select both a machine and a farm for the transfer.');
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
        
        console.error(`Failed to transfer machine: ${responseBody.error?.message || 'Unknown error'}`);
      
      }
    } catch (error) {
      console.error('Error transferring machine:', error);
      
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <TransferMachineContainer>
      <Title>Transfer Machine</Title>
      <SelectContainer>
        <Label>Select Machine:</Label>
        <Select
          value={selectedMachineId}
          onChange={(e) => setSelectedMachineId(e.target.value)}
          disabled={loading}
        >
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
        <Select
          value={selectedFarmId}
          onChange={(e) => setSelectedFarmId(e.target.value)}
          disabled={loading}
        >
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
        onClick={handleTransfer}
        disabled={!selectedMachineId || !selectedFarmId || loading}
      >
        Transfer Machine
      </TransferButton>
    </TransferMachineContainer>
  );
};

export default TransferMachine;
