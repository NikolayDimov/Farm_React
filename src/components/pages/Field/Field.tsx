import React, { useState, useEffect } from 'react';
import { Field } from './Field.static';
import { Farm } from '../Farm/Farm.static';
import { Soil } from '../Soil/Soil.static';
import FieldList from './FieldList';
import AddField from './AddField';
import {
  ModalOverlay,
  StyledModalContainer,
  modalContentStyles,
  closeButtonStyles,
} from '../../BaseLayout/BaseLayout.style';
import { apiField } from '../../../services/apiField';
import { apiFarm } from '../../../services/apiFarm';
import { apiSoil } from '../../../services/apiSoil';

interface FieldProps {
  coordinates: number[][];
}

const FieldComponent: React.FC<FieldProps> = ({ coordinates }) => {
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

  const handleEditField = async (fieldId: string, newFieldName: string) => {
    try {
      setLoading(true);
      const originalOrder: Field[] = [...fields];
      const response = await apiField.editField(fieldId, newFieldName);
      // console.log(response);

      if (response.ok) {
        const updatedFieldData = await apiField.fetchFields();
        setFields(originalOrder.map((originalField: Field) => updatedFieldData.data.find((updatedField: Field) => updatedField.id === originalField.id) as Field));
        // setSoils(updatedSoilData.data);
      } else {
        const responseBody = await response.json();
        console.error(`Failed to edit field with ID: ${fieldId}`, responseBody);
      }
    } catch (error) {
      console.error('Error editing field:', error);
      showModal('Failed to edit field');
    } finally {
      setLoading(false);
    }
  };
  



 
  return (
    <>
      <AddField fetchFields={fetchFields} />
      <FieldList fields={fields} farms={farms} soils={soils} onDeleteField={handleDeleteField} onEditField={handleEditField} /> 
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
