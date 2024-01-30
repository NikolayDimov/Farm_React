import React, { useEffect } from 'react';
import { ProcessingType } from "./ProcessingType.static";
import { apiProcessingType } from './apiProcessingType';
import { ListContainer, ListHeader, List, ListItem } from '../../../common/ListStyles';

interface ProcessingTypeListProps {
  processingTypes: ProcessingType[]; 
  setProcessingTypes: React.Dispatch<React.SetStateAction<ProcessingType[]>>;
}

const ProcessingTypeList: React.FC<ProcessingTypeListProps> = ({ processingTypes, setProcessingTypes }) => {
  
  useEffect(() => {
    const fetchProcessingTypes = async () => {
      try {
        const processingTypeData = await apiProcessingType.fetchProcessingTypes();
        setProcessingTypes(processingTypeData.data); 
      } catch (error) {
        console.error('Error in fetching ProcessingType', error);
      }
    };

    fetchProcessingTypes();
  }, [setProcessingTypes]);

  return (
    <ListContainer>
      <ListHeader>ProcessingType List</ListHeader>
      <List>
        {Array.isArray(processingTypes) && processingTypes.length > 0 ? (
          processingTypes.map((processingType) => (
            <ListItem key={processingType.id}>{processingType.name}</ListItem>
          ))
        ) : (
          <ListItem>No ProcessingType available</ListItem>
        )}
      </List>
    </ListContainer>
  );
};

export default ProcessingTypeList;
