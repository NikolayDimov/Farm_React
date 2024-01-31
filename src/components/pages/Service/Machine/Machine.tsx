
import React, { useEffect, useState } from 'react';
import { Machine } from "./Machine.static";
import AddMachine from './AddMachine';
import MachineList from './MachineList';
import {
  ModalOverlay,
  StyledModalContainer,
  modalContentStyles,
  closeButtonStyles,
} from '../ServicePage.style';
import { apiMachine } from './apiMachine';

const MachineComponent: React.FC = () => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState(false); 

  const fetchMachines = async () => {
    try {
      const machineData = await apiMachine.fetchMachines();
      setMachines(machineData.data); 
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



  

  return (
    <>
      <AddMachine fetchMachines={fetchMachines} />
      <MachineList machines={machines} onDeleteMachine={handleDeleteMachine} />
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
    </>
  );
};

export default MachineComponent;


