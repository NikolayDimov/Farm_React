import React, { useState } from 'react';
import { Machine } from "./Machine.static";
import { Farm } from '../Farm/Farm.static';
import { ListContainer, ListHeader, ListItem, List } from '../../BaseLayout/common/ListStyles';
import { DeleteIcon, StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from '../../BaseLayout/BaseLayout.style';


interface MachinesListProps {
  machines: Machine[];
  farms: Farm[];
  onDeleteMachine: (machineId: string) => void;
}

const MachineList: React.FC<MachinesListProps> = ({ machines, farms, onDeleteMachine }) => {
  const [selectedMachineId, setSelectedMachineId] = useState<string | null>(null);


  const findFarmName = (farmId: string): string => {
    const farm = farms.find((farm) => farm.id === farmId);
    return farm ? farm.name : 'Unknown Farm';
  };

  const handleDeleteClick = (machineId: string | undefined) => {
    if (machineId) {
      setSelectedMachineId(machineId);
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedMachineId) {
      await onDeleteMachine(selectedMachineId);
      setSelectedMachineId(null);
    }
  };

  const handleDeleteCancel = () => {
    setSelectedMachineId(null);
  };

  return (
    <ListContainer>
      <ListHeader>Machine List</ListHeader>
      <List>
        {Array.isArray(machines) ? (
          machines.map((machine) => (
            <ListItem key={machine.id}>
              <strong>Brand:</strong> {machine.brand} |&nbsp;
              <strong>Model:</strong> {machine.model} |&nbsp;
              <strong>Register Number:</strong> {machine.registerNumber} |&nbsp;
              <strong>Farm:</strong> {findFarmName(machine.farmId)}
              <DeleteIcon onClick={() => handleDeleteClick(machine.id)}>X</DeleteIcon>
            </ListItem>
          ))
        ) : (
          <p>No machines available</p>
        )}
      </List>

      <ModalOverlay show={!!selectedMachineId} confirmation={false}>
        {/* Use StyledModalContainer here instead of ModalContainer */}
        <StyledModalContainer confirmation={false}>
          <ModalContent>
            <p>Are you sure you want to delete this machine?</p>
          </ModalContent>
          <ModalActions>
            <ModalButton onClick={handleDeleteConfirm}>Yes</ModalButton>
            <ModalButton onClick={handleDeleteCancel}>No</ModalButton>
          </ModalActions>
        </StyledModalContainer>
      </ModalOverlay>
    </ListContainer>
  );
};

export default MachineList;
