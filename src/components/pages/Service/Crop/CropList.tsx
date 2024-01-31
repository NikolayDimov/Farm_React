import React, { useEffect, useState } from 'react';
import { Crop } from "./Crop.static";
import { ListContainer, ListHeader, List, ListItem } from '../../../common/ListStyles';
import { DeleteIcon } from './Crop.static';
import { StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from './Crop.static';

interface CropListProps {
  crops: Crop[]; 
  setCrops: React.Dispatch<React.SetStateAction<Crop[]>>;
  onDeleteCrop: (cropId: string) => void;
}

const CropList: React.FC<CropListProps> = ({ crops, onDeleteCrop }) => {
  const [selectedCropId, setSelectedCropId] = useState<string | null>(null);

  const handleDeleteClick = (cropId: string | undefined) => {
    if (cropId) {
      setSelectedCropId(cropId);
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedCropId) {
      await onDeleteCrop(selectedCropId);
      setSelectedCropId(null);
    }
  };

  const handleDeleteCancel = () => {
    setSelectedCropId(null);
  };
  

  return (
    <ListContainer>
      <ListHeader>Crop List</ListHeader>
      <List>
        {Array.isArray(crops) && crops.length > 0 ? (
          crops.map((crop) => (
            <ListItem key={crop.id}>
              {crop.name}
              <DeleteIcon onClick={() => handleDeleteClick(crop.id)}>X</DeleteIcon>
              </ListItem>
          ))
        ) : (
          <ListItem>No crops available</ListItem>
        )}
      </List>

      <ModalOverlay show={!!selectedCropId} confirmation={false}>
        {/* Use StyledModalContainer here instead of ModalContainer */}
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

export default CropList;
