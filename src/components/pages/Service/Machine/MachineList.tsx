import React, { useEffect, useState } from 'react';
import { Machine } from "./Machine.static";
import { Farm } from './Machine.static';
import { ListContainer, ListHeader, ListItem, List } from '../../../common/ListStyles';
import { apiMachine } from './apiMachine';
import { apiFarm } from '../../Profile/Farm/apiFarm';
import { DeleteIcon, StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from '../ServicePage.style';


interface MachinesListProps {
  machines: Machine[];
  onDeleteMachine: (machineId: string) => void;
}

const MachineList: React.FC<MachinesListProps> = ({ machines, onDeleteMachine }) => {
  const [selectedMachineId, setSelectedMachineId] = useState<string | null>(null);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);


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
