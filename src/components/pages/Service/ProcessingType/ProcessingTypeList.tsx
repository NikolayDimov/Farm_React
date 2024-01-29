import React, { useEffect } from 'react';
import authHeader from '../../../../services/authHeader';
import { ProcessingType } from "./ProcessingType.static";
import { ListContainer, ListHeader, ListItem, List } from '../../../common/ListStyles';

const BASE_URL = "http://localhost:3000";



interface ProcessingTypeListProps {
  processingTypes: ProcessingType[];
  setProcessingTypes: React.Dispatch<React.SetStateAction<ProcessingType[]>>;
}

const ProcessingTypeList: React.FC<ProcessingTypeListProps> = ({ processingTypes, setProcessingTypes }) => {

  useEffect(() => {
    const fetchProcessingTypes = async () => {
      try {
        const authHeaders = authHeader();
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
        };

        const response = await fetch(`${BASE_URL}/processingType`, {
          method: 'GET',
          headers,
        });

        if (response.ok) {
          const processingTypesData = await response.json();
          
          setProcessingTypes(processingTypesData.data);
        } else {
          console.error('Failed to fetch Processing Type from the database');
        }
      } catch (error) {
        console.error('Error fetching Processing Type:', error);
      }
    };

    fetchProcessingTypes();
  }, [setProcessingTypes]);

  return (
    <ListContainer>
      <ListHeader>Processing Type List</ListHeader>
      <List>
      {processingTypes.map((processingType) => (
        <ListItem key={processingType.id}>
          <strong>Name:</strong> {processingType.name}
        </ListItem>
      ))}
       </List>
    </ListContainer>
  );
};

export default ProcessingTypeList;
