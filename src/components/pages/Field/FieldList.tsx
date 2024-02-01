import React, { useState } from 'react';
import { Field } from "./Field.static";
import { Farm } from '../Farm/Farm.static';
import { Soil } from '../Soil/Soil.static';
import { ListContainer, ListHeader, List, ListItem } from '../../BaseLayout/common/ListStyles';
import EditIcon from '../../BaseLayout/common/icons/EditIcon'; 
import DeleteIcon from '../../BaseLayout/common/icons/DeleteIcon'; 
import { ButtonContainer } from '../../BaseLayout/common/icons/ButtonContainer';
import { StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from '../../BaseLayout/BaseLayout.style';

interface FieldListProps {
  fields: Field[];
  farms: Farm[];
  soils: Soil[];
  onDeleteField: (fieldId: string) => void;
  onEditField: (fieldId: string, currentFieldName: string, newSoilId: string) => void; 
}

const FieldList: React.FC<FieldListProps> = ({ fields, farms, soils, onDeleteField, onEditField }) => {
  const [selectedFieldIdForDelete, setSelectedFieldIdForDelete] = useState<string | null>(null);
  const [selectedFieldIdForEdit, setSelectedFieldIdForEdit] = useState<string | null>(null);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [currentFieldName, setCurrentFieldName] = useState<string>('');
  const [originalFieldName, setOriginalFieldName] = useState<string>('');
  const [selectedSoilId, setSelectedSoilId] = useState<string>(''); 
 
  const findFarmName = (farmId: string): string => {
    const farm = farms.find((farm) => farm.id === farmId);
    return farm ? farm.name : 'Unknown Farm';
  };

  const findSoilName = (soilId: string): string => {
    const soil = soils.find((soil) => soil.id === soilId);
    return soil ? soil.name : 'Unknown Farm';
  };

  const handleDeleteClick = (fieldId: string | undefined) => {
    if (fieldId) {
      setSelectedFieldIdForDelete(fieldId);
      setDeleteModalVisible(true);
    }
  };

  const handleEditClick = (fieldId: string | undefined, fieldName: string, soilId: string) => {
    if (fieldId) {
      setSelectedFieldIdForEdit(fieldId);
      setCurrentFieldName(fieldName);
      setOriginalFieldName(fieldName); 
      setSelectedSoilId(soilId);
      setEditModalVisible(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedFieldIdForDelete) {
      await onDeleteField(selectedFieldIdForDelete);
      setSelectedFieldIdForDelete(null);
      setDeleteModalVisible(false);
    }
  };

  const handleDeleteCancel = () => {
    setSelectedFieldIdForDelete(null);
    setDeleteModalVisible(false);
  };

  const handleEditConfirm = async () => {
    try {
      if (selectedFieldIdForEdit) {
        await onEditField(selectedFieldIdForEdit, currentFieldName, selectedSoilId);
      }

      setSelectedFieldIdForEdit(null);
      setEditModalVisible(false);
      setCurrentFieldName(''); 
      setSelectedSoilId('');
    } catch (error) {
      console.error('Error handling edit confirmation:', error);
    }
  };

  const handleEditCancel = () => {
    setSelectedFieldIdForEdit(null);
    setEditModalVisible(false);
    setCurrentFieldName(''); 
    setSelectedSoilId('');
  };


  return (
    <ListContainer>
      <ListHeader>Field List</ListHeader>
      <List>
        {Array.isArray(fields) ? (
          fields.map((field) => (
            <ListItem key={field.id}>
              <strong>Name:</strong> {field.name} |&nbsp;
              <strong>Farm:</strong> {findFarmName(field.farmId)} |&nbsp;
              <strong>Soil:</strong> {findSoilName(field.soilId)}
              <ButtonContainer>
                <EditIcon onClick={() => handleEditClick(field.id, field.name, field.soilId)} />
                <DeleteIcon onClick={() => handleDeleteClick(field.id)} />
              </ButtonContainer>
            </ListItem>
          ))
        ) : (
          <p>No fields available</p>
        )}
      </List>

     {/* Edit Modal */}
     <ModalOverlay show={isEditModalVisible} confirmation={false}>
        <StyledModalContainer confirmation={false}>
          <ModalContent>
            <p>Current Field Name: {originalFieldName}</p>
            <input
              type="text"
              placeholder="Enter new field name"
              value={currentFieldName}
              onChange={(e) => setCurrentFieldName(e.target.value)}
            />
            <div>
              <label>Select Soil:</label>
              <select
                value={selectedSoilId}
                onChange={(e) => setSelectedSoilId(e.target.value)}
              >
                <option value="" disabled>
                  Select Soil
                </option>
                {soils.map((soil) => (
                  <option key={soil.id} value={soil.id}>
                    {soil.name}
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
            <p>Are you sure you want to delete this field?</p>
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

export default FieldList;
