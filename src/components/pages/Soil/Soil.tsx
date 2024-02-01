import React, { useEffect, useState } from 'react';
import SoilList from './SoilList';
import AddSoil from './AddSoil';
import { Soil } from "./Soil.static";
import { apiSoil } from '../../../services/apiSoil';
import {
  ModalOverlay,
  StyledModalContainer,
  modalContentStyles,
  closeButtonStyles,
} from '../../BaseLayout/BaseLayout.style';



const SoilComponent: React.FC = () => {
  const [soils, setSoils] = useState<Soil[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState(false); 


const fetchSoils = async () => {
    try {
      const soilData = await apiSoil.fetchSoils();
      setSoils(soilData.data); 
    } catch (error) {
      console.error('Error in fetching soils', error);
    }
  };

  useEffect(() => {
    fetchSoils(); 
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


  const handleDeleteSoil = async (soilId: string) => {
    try {
      setLoading(true);

      // Make API call to delete soil by ID
      const response = await apiSoil.deleteSoil(soilId);

      if (response.ok) {
        // Handle successful deletion
        setSoils((prevSoils) => prevSoils.filter((soil) => soil.id !== soilId));
      } else {
        const responseBody = await response.json();
        console.error(`Failed to delete soil with ID: ${soilId}`, responseBody);

        if (response.status === 400 && responseBody.error?.message) {
          // Display the server-provided error message
          showModal(responseBody.error.message);
          setConfirmation(true); // Set confirmation state to true
        } else {
          // Display a generic error message
          showModal('Failed to delete soil');
        }
      }
    } catch (error) {
      console.error('Error deleting soil:', error);

      // Display a generic error message
      showModal('Failed to delete soil');
    } finally {
      setLoading(false);
    }
  };

  const handleEditSoil = async (soilId: string, newSoilName: string) => {
    try {
      setLoading(true);
      const originalOrder: Soil[] = [...soils];
      const response = await apiSoil.editSoil(soilId, newSoilName);
      // console.log(response);

      if (response.ok) {
        const updatedSoilData = await apiSoil.fetchSoils();
        setSoils(originalOrder.map((originalSoil: Soil) => updatedSoilData.data.find((updatedSoil: Soil) => updatedSoil.id === originalSoil.id) as Soil));
        // setSoils(updatedSoilData.data);
      } else {
        const responseBody = await response.json();
        console.error(`Failed to edit soil with ID: ${soilId}`, responseBody);
      }
    } catch (error) {
      console.error('Error editing soil:', error);
      showModal('Failed to edit soil');
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <>
      <AddSoil fetchSoils={fetchSoils} />
      <SoilList soils={soils} onDeleteSoil={handleDeleteSoil} onEditSoil={handleEditSoil}/>
      <ModalOverlay show={modalVisible} confirmation={false}>
        <StyledModalContainer confirmation={confirmation}>
          <div style={modalContentStyles}>
            {confirmation ? 'Soil cannot be deleted' : modalMessage}
          </div>
          <div style={closeButtonStyles}>
            <button onClick={() => setModalVisible(false)}>Close</button>
          </div>
        </StyledModalContainer>
      </ModalOverlay>
    </>
  );
};

export default SoilComponent;
