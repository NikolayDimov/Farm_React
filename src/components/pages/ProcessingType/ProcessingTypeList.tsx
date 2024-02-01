import React, { useState } from 'react';
import { ProcessingType } from "./ProcessingType.static";
import { ListContainer, ListHeader, List, ListItem } from '../../BaseLayout/common/ListStyles';
import EditIcon from '../../BaseLayout/common/icons/EditIcon'; 
import DeleteIcon from '../../BaseLayout/common/icons/DeleteIcon'; 
import { ButtonContainer } from '../../BaseLayout/common/icons/ButtonContainer';
import { StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from '../../BaseLayout/BaseLayout.style';

interface ProcessingTypeListProps {
  processingTypes: ProcessingType[]; 
  onDeleteProcessingType: (processingTypeId: string) => void;
  onEditProcessingType: (processingTypeId: string, currentProcessingTypeName: string) => void; 

}

const ProcessingTypeList: React.FC<ProcessingTypeListProps> = ({ processingTypes, onDeleteProcessingType, onEditProcessingType }) => {
  const [selectedProcessingTypeIdForDelete, setSelectedProcessingTypeIdForDelete] = useState<string | null>(null);
  const [selectedProcessingTypeIdForEdit, setSelectedProcessingTypeIdForEdit] = useState<string | null>(null);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [currentProcessingTypeName, setCurrentProcessingTypeName] = useState<string>('');
  const [originalProcessingTypeName, setOriginalProcessingTypeName] = useState<string>('');

  const handleDeleteClick = (processingTypeId: string | undefined) => {
    if (processingTypeId) {
      setSelectedProcessingTypeIdForDelete(processingTypeId);
      setDeleteModalVisible(true);
    }
  };

  const handleEditClick = (processingTypeId: string | undefined, processingTypeName: string) => {
    if (processingTypeId) {
      setSelectedProcessingTypeIdForEdit(processingTypeId);
      setCurrentProcessingTypeName(processingTypeName);
      setOriginalProcessingTypeName(processingTypeName); 
      setEditModalVisible(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedProcessingTypeIdForDelete) {
      await onDeleteProcessingType(selectedProcessingTypeIdForDelete);
      setSelectedProcessingTypeIdForDelete(null);
      setDeleteModalVisible(false);
    }
  };

  const handleDeleteCancel = () => {
    setSelectedProcessingTypeIdForDelete(null);
    setDeleteModalVisible(false);
  };

  const handleEditConfirm = async () => {
    try {
      if (selectedProcessingTypeIdForEdit) {
        await onEditProcessingType(selectedProcessingTypeIdForEdit, currentProcessingTypeName);
      }

      setSelectedProcessingTypeIdForEdit(null);
      setEditModalVisible(false);
      setCurrentProcessingTypeName(''); 
    } catch (error) {
      console.error('Error handling edit confirmation:', error);
    }
  };

  const handleEditCancel = () => {
    setSelectedProcessingTypeIdForEdit(null);
    setEditModalVisible(false);
    setCurrentProcessingTypeName(''); 
  };

  return (
    <ListContainer>
      <ListHeader>Processing Type List</ListHeader>
      <List>
      {Array.isArray(processingTypes) && processingTypes.length > 0 ? (
        processingTypes.map((processingType) => (
          <ListItem key={processingType.id}>
            {processingType.name}
            <ButtonContainer>
              <EditIcon onClick={() => handleEditClick(processingType.id, processingType.name)} />
              <DeleteIcon onClick={() => handleDeleteClick(processingType.id)} />
            </ButtonContainer>
          </ListItem>
        ))
      ) : (
        <ListItem>No Processing Type available</ListItem>
      )}
    </List>

      {/* Edit Modal */}
      <ModalOverlay show={isEditModalVisible} confirmation={false}>
        <StyledModalContainer confirmation={false}>
          <ModalContent>
            <p>Current Crop Name: {originalProcessingTypeName}</p>
            <input
              type="text"
              placeholder="Enter new crop name"
              value={currentProcessingTypeName}
              onChange={(e) => setCurrentProcessingTypeName(e.target.value)}
            />
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
            <p>Are you sure you want to delete this Processing Type?</p>
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

export default ProcessingTypeList;
