import React, { useState } from 'react';
import { Field } from "./Field.static";
import { Farm } from '../../Profile/Farm/Farm.static';
import { Soil } from '../Soil/Soil.static';
import { ListContainer, ListHeader, ListItem, List } from '../../../common/ListStyles';
import { DeleteIcon, StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from '../ServicePage.style';


interface FieldListProps {
  fields: Field[];
  farms: Farm[];
  soils: Soil[];
  onDeleteField: (fieldId: string) => void;
}

const FieldList: React.FC<FieldListProps> = ({ fields, farms, soils, onDeleteField }) => {
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
 
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
      setSelectedFieldId(fieldId);
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedFieldId) {
      await onDeleteField(selectedFieldId);
      setSelectedFieldId(null);
    }
  };

  const handleDeleteCancel = () => {
    setSelectedFieldId(null);
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
              <DeleteIcon onClick={() => handleDeleteClick(field.id)}>X</DeleteIcon>

            </ListItem>
          ))
        ) : (
          <p>No fields available</p>
        )}
      </List>

      <ModalOverlay show={!!selectedFieldId} confirmation={false}>
        {/* Use StyledModalContainer here instead of ModalContainer */}
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
