import React, { useEffect, useState } from 'react';
import ProcessingTypeList from './ProcessingTypeList';
import AddProcessingType from './AddProcessingType';
import { ProcessingType } from "./ProcessingType.static";
import {
  ModalOverlay,
  StyledModalContainer,
  modalContentStyles,
  closeButtonStyles,
} from '../ServicePage.style';
import { apiProcessingType } from './apiProcessingType';

const ProcessingTypeComponent: React.FC = () => {
  const [processingTypes, setProcessingTypes] = useState<ProcessingType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState(false); 


  const fetchProcessingTypes = async () => {
    try {
      const processingTypeData = await apiProcessingType.fetchProcessingTypes();
      setProcessingTypes(processingTypeData.data); 
    } catch (error) {
      console.error('Error in fetching ProcessingType', error);
    }
  };

  useEffect(() => {
    fetchProcessingTypes(); 
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


  const handleDeleteProcessingType = async (processingTypeId: string) => {
    try {
      setLoading(true);

      // Make API call to delete soil by ID
      const response = await apiProcessingType.deleteProcessingType(processingTypeId);

      if (response.ok) {
        // Handle successful deletion
        setProcessingTypes((prevProcessingTypes) => prevProcessingTypes.filter((processingType) => processingType.id !== processingTypeId));
      } else {
        const responseBody = await response.json();
        console.error(`Failed to delete ProcessingType with ID: ${processingTypeId}`, responseBody);

        if (response.status === 400 && responseBody.error?.message) {
          showModal(responseBody.error.message);
          setConfirmation(true); 
        } else {
          showModal('Failed to delete ProcessingType');
        }
      }
    } catch (error) {
      console.error('Error deleting ProcessingType:', error);

      showModal('Failed to delete ProcessingType');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AddProcessingType fetchProcessingTypes={fetchProcessingTypes} />
      <ProcessingTypeList processingTypes={processingTypes} onDeleteProcessingType={handleDeleteProcessingType}/>
      <ModalOverlay show={modalVisible} confirmation={false}>
        <StyledModalContainer confirmation={confirmation}>
          <div style={modalContentStyles}>
            {confirmation ? 'ProcessingType cannot be deleted' : modalMessage}
          </div>
          <div style={closeButtonStyles}>
            <button onClick={() => setModalVisible(false)}>Close</button>
          </div>
        </StyledModalContainer>
      </ModalOverlay>
    </>
  );
};

export default ProcessingTypeComponent;
