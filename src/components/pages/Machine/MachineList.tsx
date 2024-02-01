import React, { useState } from 'react';
import { Machine } from "./Machine.static";
import { Farm } from '../Farm/Farm.static';
import { ListContainer, ListHeader, List, ListItem } from '../../BaseLayout/common/ListStyles';
import EditIcon from '../../BaseLayout/common/icons/EditIcon'; 
import DeleteIcon from '../../BaseLayout/common/icons/DeleteIcon'; 
import { ButtonContainer } from '../../BaseLayout/common/icons/ButtonContainer';
import { StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from '../../BaseLayout/BaseLayout.style';


interface MachinesListProps {
  machines: Machine[];
  farms: Farm[];
  onDeleteMachine: (machineId: string) => void;
  onEditMachine: (machineId: string, currentMachineBrand: string, currentMachineModel: string, currentMachineRegisterNumber: string,  newFarmId: string) => void; 
}

const MachineList: React.FC<MachinesListProps> = ({ machines, farms, onDeleteMachine, onEditMachine }) => {
  const [selectedMachineIdForDelete, setSelectedMachineIdForDelete] = useState<string | null>(null);
  const [selectedMachineIdForEdit, setSelectedMachineIdForEdit] = useState<string | null>(null);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [currentMachineBrand, setCurrentMachineBrand] = useState<string>('');
  const [currentMachineModel, setCurrentMachineModel] = useState<string>('');
  const [currentMachineRegisterNumber, setCurrentMachineRegisterNumber] = useState<string>('');
  const [originalMachineBrand, setOriginalMachineBrand] = useState<string>('');
  const [originalMachineModel, setOriginalMachineModel] = useState<string>('');
  const [originalMachineRegisterNumber, setOriginalMachineRegisterNumber] = useState<string>('');
  const [selectedFarmId, setSelectedFarmId] = useState<string>(''); 


  const findFarmName = (farmId: string): string => {
    const farm = farms.find((farm) => farm.id === farmId);
    return farm ? farm.name : 'Unknown Farm';
  };

  const handleDeleteClick = (machineId: string | undefined) => {
    if (machineId) {
      setSelectedMachineIdForDelete(machineId);
      setDeleteModalVisible(true);
    }
  };

  const handleEditClick = (machineId: string | undefined, machineBrand: string, machineModel: string, machineRegisterNumber: string, farmId: string) => {
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

  const handleDeleteConfirm = async () => {
    if (selectedMachineIdForDelete) {
      await onDeleteMachine(selectedMachineIdForDelete);
      setSelectedMachineIdForDelete(null);
      setDeleteModalVisible(false);
    }
  };

  const handleDeleteCancel = () => {
    setSelectedMachineIdForDelete(null);
    setDeleteModalVisible(false);
  };

  const handleEditConfirm = async () => {
    try {
      if (selectedMachineIdForEdit) {
        await onEditMachine(selectedMachineIdForEdit, currentMachineBrand, currentMachineModel, currentMachineRegisterNumber, selectedFarmId);
      }

      setSelectedMachineIdForEdit(null);
      setEditModalVisible(false);
      setOriginalMachineBrand('');
      setOriginalMachineModel(''); 
      setOriginalMachineRegisterNumber('');
      setSelectedFarmId('');
    } catch (error) {
      console.error('Error handling edit confirmation:', error);
    }
  };

  const handleEditCancel = () => {
    setSelectedMachineIdForEdit(null);
    setEditModalVisible(false);
    setCurrentMachineBrand(''); 
    setCurrentMachineModel(''); 
    setCurrentMachineRegisterNumber(''); 
    setSelectedFarmId('');
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
              <ButtonContainer>
                <EditIcon onClick={() => handleEditClick(machine.id, machine.brand, machine.model, machine.registerNumber, machine.farmId)} />
                <DeleteIcon onClick={() => handleDeleteClick(machine.id)} />
              </ButtonContainer>
            </ListItem>
          ))
        ) : (
          <p>No machines available</p>
        )}
      </List>

       {/* Edit Modal */}
     <ModalOverlay show={isEditModalVisible} confirmation={false}>
        <StyledModalContainer confirmation={false}>
          <ModalContent>
            <p>Machine Brand: {originalMachineBrand}</p>
            <input
              type="text"
              placeholder="Enter new machine brand"
              value={currentMachineBrand}
              onChange={(e) => setCurrentMachineBrand(e.target.value)}
            />
            <p>Machine Model: {originalMachineModel}</p>
            <input
              type="text"
              placeholder="Enter new machine model"
              value={currentMachineModel}
              onChange={(e) => setCurrentMachineModel(e.target.value)}
            />
            <p>Machine Register Number: {originalMachineRegisterNumber}</p>
            <input
              type="text"
              placeholder="Enter new machine register number"
              value={currentMachineRegisterNumber}
              onChange={(e) => setCurrentMachineRegisterNumber(e.target.value)}
            />
            <div>
              <label>Select Farm:</label>
              <select
                value={selectedFarmId}
                onChange={(e) => setSelectedFarmId(e.target.value)}
              >
                <option value="" disabled>
                  Select Farm
                </option>
                {farms.map((farm) => (
                  <option key={farm.id} value={farm.id}>
                    {farm.name}
                  </option>
                ))}
              </select>
            </div>
          </ModalContent>
          <ModalActions>
            <ModalButton onClick={handleEditConfirm}>Save</ModalButton>
            <ModalButton onClick={handleEditCancel}>Cancel</ModalButton>
          </ModalActions>
        </StyledModalContainer>
      </ModalOverlay>

      {/* Delete Modal */}
      <ModalOverlay show={isDeleteModalVisible} confirmation={false}>
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
