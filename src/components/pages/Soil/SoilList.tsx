import React, { useState } from 'react';
import { Soil } from "./Soil.static";
import { ListContainer, ListHeader, List, ListItem } from '../../BaseLayout/common/ListStyles';
import EditIcon from '../../BaseLayout/common/icons/EditIcon'; 
import DeleteIcon from '../../BaseLayout/common/icons/DeleteIcon'; 
import { ButtonContainer } from '../../BaseLayout/common/icons/ButtonContainer';
import { StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from '../../BaseLayout/BaseLayout.style';


interface SoilListProps {
  soils: Soil[]; // Make soils optional
  onDeleteSoil: (soilId: string) => void;
  onEditSoil: (cropId: string, currentCropName: string) => void; 
}

const SoilList: React.FC<SoilListProps> = ({ soils, onDeleteSoil, onEditSoil }) => {
  const [selectedSoilIdForDelete, setSelectedSoilIdForDelete] = useState<string | null>(null);
  const [selectedSoilIdForEdit, setSelectedSoilIdForEdit] = useState<string | null>(null);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [currentSoilName, setCurrentSoilName] = useState<string>('');
  const [originalSoilName, setOriginalSoilName] = useState<string>('');

  const handleDeleteClick = (soilId: string | undefined) => {
    if (soilId) {
      setSelectedSoilIdForDelete(soilId);
      setDeleteModalVisible(true);
    }
  };

  const handleEditClick = (soilId: string | undefined, soilName: string) => {
    if (soilId) {
      setSelectedSoilIdForEdit(soilId);
      setCurrentSoilName(soilName);
      setOriginalSoilName(soilName); 
      setEditModalVisible(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedSoilIdForDelete) {
      await onDeleteSoil(selectedSoilIdForDelete);
      setSelectedSoilIdForDelete(null);
      setDeleteModalVisible(false);
    }
  };

  const handleDeleteCancel = () => {
    setSelectedSoilIdForDelete(null);
    setDeleteModalVisible(false);
  };

  const handleEditConfirm = async () => {
    try {
      if (selectedSoilIdForEdit) {
        await onEditSoil(selectedSoilIdForEdit, currentSoilName);
      }

      setSelectedSoilIdForEdit(null);
      setEditModalVisible(false);
      setCurrentSoilName(''); 
    } catch (error) {
      console.error('Error handling edit confirmation:', error);
    }
  };

  const handleEditCancel = () => {
    setSelectedSoilIdForEdit(null);
    setEditModalVisible(false);
    setCurrentSoilName(''); 
  };

  return (
    <ListContainer>
      <ListHeader>Crop List</ListHeader>
      <List>
      {Array.isArray(soils) && soils.length > 0 ? (
        soils.map((soil) => (
          <ListItem key={soil.id}>
            {soil.name}
            <ButtonContainer>
              <EditIcon onClick={() => handleEditClick(soil.id, soil.name)} />
              <DeleteIcon onClick={() => handleDeleteClick(soil.id)} />
            </ButtonContainer>
          </ListItem>
        ))
      ) : (
        <ListItem>No soils available</ListItem>
      )}
    </List>

      {/* Edit Modal */}
      <ModalOverlay show={isEditModalVisible} confirmation={false}>
        <StyledModalContainer confirmation={false}>
          <ModalContent>
            <p>Current Crop Name: {originalSoilName}</p>
            <input
              type="text"
              placeholder="Enter new crop name"
              value={currentSoilName}
              onChange={(e) => setCurrentSoilName(e.target.value)}
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
            <p>Are you sure you want to delete this soil?</p>
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

export default SoilList;
