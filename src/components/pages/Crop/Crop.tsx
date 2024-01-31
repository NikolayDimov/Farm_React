import React, { useEffect, useState } from 'react';
import CropList from './CropList';
import AddCrop from './AddCrop';
import { Crop } from "./Crop.static";
import { apiCrop } from '../../../services/apiCrop';
import {
  ModalOverlay,
  StyledModalContainer,
  modalContentStyles,
  closeButtonStyles,
} from '../../BaseLayout/BaseLayout.style';

const CropComponent: React.FC = () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState(false); 

  const fetchCrops = async () => {
    try {
      const cropData = await apiCrop.fetchCrops();
      setCrops(cropData.data); 
    } catch (error) {
      console.error('Error in fetching crops', error);
    }
  };

  useEffect(() => {
    fetchCrops(); 
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


  const handleDeleteCrop = async (cropId: string) => {
    try {
      setLoading(true);

      // Make API call to delete soil by ID
      const response = await apiCrop.deleteCrop(cropId);

      if (response.ok) {
        // Handle successful deletion
        setCrops((prevCrops) => prevCrops.filter((crop) => crop.id !== cropId));
      } else {
        const responseBody = await response.json();
        console.error(`Failed to delete soil with ID: ${cropId}`, responseBody);

        if (response.status === 400 && responseBody.error?.message) {
          showModal(responseBody.error.message);
          setConfirmation(true); 
        } else {
          showModal('Failed to delete crop');
        }
      }
    } catch (error) {
      console.error('Error deleting crop:', error);

      showModal('Failed to delete crop');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <AddCrop fetchCrops={fetchCrops} />
      <CropList crops={crops} onDeleteCrop={handleDeleteCrop} />
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

export default CropComponent;
