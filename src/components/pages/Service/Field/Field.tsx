import React, { useState, useEffect } from 'react';
import { Field } from './Field.static';
import { Farm } from '../../Profile/Farm/Farm.static';
import { Soil } from '../Soil/Soil.static';
import FieldList from './FieldList';
import AddField from './AddField';
import {
  ModalOverlay,
  StyledModalContainer,
  modalContentStyles,
  closeButtonStyles,
} from '../ServicePage.style';
import { apiField } from './apiField';
import { apiFarm } from '../../Profile/Farm/apiFarm';
import { apiSoil } from '../Soil/apiSoil';


const FieldComponent: React.FC<{ coordinates: number[][] }> = ({ coordinates }) => {
  const [fields, setFields] = useState<Field[]>([]);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [soils, setSoils] = useState<Soil[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState(false); 

  const fetchFields = async () => {
    try {
      const fieldsData = await apiField.fetchFields();
      const farmsData = await apiFarm.fetchFarms();
      const soilsData = await apiSoil.fetchSoils();

      setFields(fieldsData.data); 
      setFarms(farmsData.data); 
      setSoils(soilsData.data); 
    } catch (error) {
      console.error('Error in fetching Field', error);
    }
  };

  useEffect(() => {
    fetchFields(); 
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


  const handleDeleteField = async (fieldId: string) => {
    try {
      setLoading(true);

      // Make API call to delete soil by ID
      const response = await apiField.deleteField(fieldId);

      if (response.ok) {
        // Handle successful deletion
        setFields((prevFields) => prevFields.filter((field) => field.id !== fieldId));
      } else {
        const responseBody = await response.json();
        console.error(`Failed to delete soil with ID: ${fieldId}`, responseBody);

        if (response.status === 400 && responseBody.error?.message) {
          showModal(responseBody.error.message);
          setConfirmation(true); 
        } else {
          showModal('Failed to delete Field');
        }
      }
    } catch (error) {
      console.error('Error deleting Field:', error);

      showModal('Failed to delete Field');
    } finally {
      setLoading(false);
    }
  };
  



 
  return (
    <>
      <AddField fetchFields={fetchFields} />
      <FieldList fields={fields} farms={farms} soils={soils} onDeleteField={handleDeleteField} /> 
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



export default FieldComponent;
