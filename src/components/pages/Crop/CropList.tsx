import React, { useState } from 'react';
import { Crop } from "./Crop.static";
import { ListContainer, ListHeader, List, ListItem } from '../../BaseLayout/common/ListStyles';
import EditIcon from '../../BaseLayout/common/icons/EditIcon'; 
import DeleteIcon from '../../BaseLayout/common/icons/DeleteIcon'; 
import { ButtonContainer } from '../../BaseLayout/common/icons/ButtonContainer';
import { StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from '../../BaseLayout/BaseLayout.style';

interface CropListProps {
  crops: Crop[]; 
  onDeleteCrop: (cropId: string) => void;
  onEditCrop: (cropId: string, currentCropName: string) => void; 
}

const CropList: React.FC<CropListProps> = ({ crops, onDeleteCrop, onEditCrop }) => {
  const [selectedCropIdForDelete, setSelectedCropIdForDelete] = useState<string | null>(null);
  const [selectedCropIdForEdit, setSelectedCropIdForEdit] = useState<string | null>(null);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [currentCropName, setCurrentCropName] = useState<string>('');
  const [originalCropName, setOriginalCropName] = useState<string>('');


  const handleDeleteClick = (cropId: string | undefined) => {
    if (cropId) {
      setSelectedCropIdForDelete(cropId);
      setDeleteModalVisible(true);
    }
  };

  const handleEditClick = (cropId: string | undefined, cropName: string) => {
    if (cropId) {
      setSelectedCropIdForEdit(cropId);
      setCurrentCropName(cropName);
      setOriginalCropName(cropName); 
      setEditModalVisible(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedCropIdForDelete) {
      await onDeleteCrop(selectedCropIdForDelete);
      setSelectedCropIdForDelete(null);
      setDeleteModalVisible(false);
    }
  };

  const handleDeleteCancel = () => {
    setSelectedCropIdForDelete(null);
    setDeleteModalVisible(false);
  };

  const handleEditConfirm = async () => {
    try {
      if (selectedCropIdForEdit) {
        await onEditCrop(selectedCropIdForEdit, currentCropName);
      }

      setSelectedCropIdForEdit(null);
      setEditModalVisible(false);
      setCurrentCropName(''); 
    } catch (error) {
      console.error('Error handling edit confirmation:', error);
    }
  };

  const handleEditCancel = () => {
    setSelectedCropIdForEdit(null);
    setEditModalVisible(false);
    setCurrentCropName(''); 
  };

  return (
    <ListContainer>
      <ListHeader>Crop List</ListHeader>
      <List>
      {Array.isArray(crops) && crops.length > 0 ? (
        crops.map((crop) => (
          <ListItem key={crop.id}>
            {crop.name}
            <ButtonContainer>
              <EditIcon onClick={() => handleEditClick(crop.id, crop.name)} />
              <DeleteIcon onClick={() => handleDeleteClick(crop.id)} />
            </ButtonContainer>
          </ListItem>
        ))
      ) : (
        <ListItem>No crops available</ListItem>
      )}
    </List>

      {/* Edit Modal */}
      <ModalOverlay show={isEditModalVisible} confirmation={false}>
        <StyledModalContainer confirmation={false}>
          <ModalContent>
            <p>Current Crop Name: {originalCropName}</p>
            <input
              type="text"
              placeholder="Enter new crop name"
              value={currentCropName}
              onChange={(e) => setCurrentCropName(e.target.value)}
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
            <p>Are you sure you want to delete this crop?</p>
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

export default CropList;
