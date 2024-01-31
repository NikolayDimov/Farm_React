import React, { useState } from 'react';
import { Soil } from "./Soil.static";
import { ListContainer, ListHeader, List, ListItem } from '../../../common/ListStyles';
import { DeleteIcon, StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from '../ServicePage.style';


interface SoilListProps {
  soils: Soil[]; // Make soils optional
  onDeleteSoil: (soilId: string) => void;
}

const SoilList: React.FC<SoilListProps> = ({ soils, onDeleteSoil }) => {
  const [selectedSoilId, setSelectedSoilId] = useState<string | null>(null);

  const handleDeleteClick = (soilId: string | undefined) => {
    if (soilId) {
      setSelectedSoilId(soilId);
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedSoilId) {
      await onDeleteSoil(selectedSoilId);
      setSelectedSoilId(null);
    }
  };

  const handleDeleteCancel = () => {
    setSelectedSoilId(null);
  };

  return (
    <ListContainer>
      <ListHeader>Soil List</ListHeader>
      <List>
        {Array.isArray(soils) && soils.length > 0 ? (
          soils.map((soil) => (
            <ListItem key={soil.id}>
              {soil.name}
              <DeleteIcon onClick={() => handleDeleteClick(soil.id)}>X</DeleteIcon>
            </ListItem>
          ))
        ) : (
          <ListItem>No soils available</ListItem>
        )}
      </List>
      
      <ModalOverlay show={!!selectedSoilId} confirmation={false}>
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

export default SoilList;
