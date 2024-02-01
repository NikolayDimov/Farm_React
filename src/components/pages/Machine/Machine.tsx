
import React, { useEffect, useState } from 'react';
import { Machine } from "./Machine.static";
import { Farm } from "../Farm/Farm.static";
import AddMachine from './AddMachine';
import MachineList from './MachineList';
import {
  ModalOverlay,
  StyledModalContainer,
  modalContentStyles,
  closeButtonStyles,
} from '../../BaseLayout/BaseLayout.style';
import { apiMachine } from '../../../services/apiMachine';
import { apiFarm } from '../../../services/apiFarm';
import TransferMachine from './TransferMachine';


const MachineComponent: React.FC = () => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
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
      console.error('Error in fetching machine', error);
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
        setModalMessage('');
        setConfirmation(false); 
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [modalVisible]);


  const handleDeleteMachine = async (machineId: string) => {
    try {
      setLoading(true);

      // Make API call to delete soil by ID
      const response = await apiMachine.deleteMachine(machineId);

      if (response.ok) {
        // Handle successful deletion
        setMachines((prevMachines) => prevMachines.filter((machine) => machine.id !== machineId));
      } else {
        const responseBody = await response.json();
        console.error(`Failed to delete soil with ID: ${machineId}`, responseBody);

        if (response.status === 400 && responseBody.error?.message) {
          showModal(responseBody.error.message);
          setConfirmation(true); 
        } else {
          showModal('Failed to delete Machine');
        }
      }
    } catch (error) {
      console.error('Error deleting Machine:', error);

      showModal('Failed to delete Machine');
    } finally {
      setLoading(false);
    }
  };

  const handleEditMachine = async (machineId: string, newMachineBrand: string, newMachineModel: string, MachineRegisterNumber: string, newFarmId: string) => {
    try {
      setLoading(true);
      const originalOrder: Machine[] = [...machines];
      const response = await apiMachine.editMachine(machineId, newMachineBrand, newMachineModel, MachineRegisterNumber, newFarmId);
      // console.log(response);

      if (response.ok) {
        const updatedMachineData = await apiMachine.fetchMachines();
        setMachines(originalOrder.map((originalMachine: Machine) => updatedMachineData.data.find((updatedMachine: Machine) => updatedMachine.id === originalMachine.id) as Machine));
        // setSoils(updatedSoilData.data);
      } else {
        const responseBody = await response.json();
        console.error(`Failed to edit machine with ID: ${machineId}`, responseBody);
      }
    } catch (error) {
      console.error('Error editing machine:', error);
      showModal('Failed to edit machine');
    } finally {
      setLoading(false);
    }
  };

  const handleTransferSuccess = () => {
    setTransferMode(false);
    fetchMachines();
  };
  

  return (
    <>
      <AddMachine fetchMachines={fetchMachines} />
      <MachineList machines={machines} farms={farms} onDeleteMachine={handleDeleteMachine} onEditMachine={handleEditMachine}/>
      <ModalOverlay show={modalVisible} confirmation={false}>
        <StyledModalContainer confirmation={confirmation}>
          <div style={modalContentStyles}>
            {confirmation ? 'Machine cannot be deleted' : modalMessage}
          </div>
          <div style={closeButtonStyles}>
            <button onClick={() => setModalVisible(false)}>Close</button>
          </div>
        </StyledModalContainer>
      </ModalOverlay>
      <div>
        <h2>Transfer Machine</h2>
        {transferMode ? (
          <TransferMachine
            machines={machines}
            farms={farms}
            onTransferSuccess={handleTransferSuccess}
          />
        ) : (
          <button onClick={() => setTransferMode(true)}>Transfer Machine</button>
        )}
      </div>
    </>
  );
};

export default MachineComponent;

