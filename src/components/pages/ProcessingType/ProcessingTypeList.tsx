import React, { useState } from 'react';
import { ProcessingType } from "./ProcessingType.static";
import { ListContainer, ListHeader, List, ListItem } from '../../BaseLayout/common/ListStyles';
import { DeleteIcon, StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from '../../BaseLayout/BaseLayout.style';

interface ProcessingTypeListProps {
  processingTypes: ProcessingType[]; 
  onDeleteProcessingType: (processingTypeId: string) => void;
}

const ProcessingTypeList: React.FC<ProcessingTypeListProps> = ({ processingTypes, onDeleteProcessingType }) => {
  const [selectedProcessingTypeId, setSelectedProcessingTypeId] = useState<string | null>(null);

  const handleDeleteClick = (processingTypeId: string | undefined) => {
    if (processingTypeId) {
      setSelectedProcessingTypeId(processingTypeId);
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedProcessingTypeId) {
      await onDeleteProcessingType(selectedProcessingTypeId);
      setSelectedProcessingTypeId(null);
    }
  };

  const handleDeleteCancel = () => {
    setSelectedProcessingTypeId(null);
  };
  

  return (
    <ListContainer>
      <ListHeader>ProcessingType List</ListHeader>
      <List>
        {Array.isArray(processingTypes) && processingTypes.length > 0 ? (
          processingTypes.map((processingType) => (
            <ListItem key={processingType.id}>
              {processingType.name}
              <DeleteIcon onClick={() => handleDeleteClick(processingType.id)}>X</DeleteIcon>
              </ListItem>
          ))
        ) : (
          <ListItem>No ProcessingType available</ListItem>
        )}
      </List>

      <ModalOverlay show={!!selectedProcessingTypeId} confirmation={false}>
        {/* Use StyledModalContainer here instead of ModalContainer */}
        <StyledModalContainer confirmation={false}>
          <ModalContent>
            <p>Are you sure you want to delete this processing type?</p>
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
