import React, { useEffect, useState } from 'react';
import authHeader from '../../../services/authHeader';
import { Field } from './interface';
import { ListContainer, ListHeader, ListItem, List } from '../../common/ListStyles';
const BASE_URL = "http://localhost:3000";

interface FieldsListProps {
  fields: Field[];
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
}


const FieldList: React.FC<FieldsListProps> = ({ fields, setFields }) => {

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const authHeaders = authHeader();
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
        };
    
        const response = await fetch(`${BASE_URL}/field`, {
          method: 'GET',
          headers,
        });
    
        if (response.ok) {
          const fieldsData = await response.json();
          setFields(fieldsData.data || []); 
        } else {
          console.error('Failed to fetch fields from the database');
        }
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    };
    
    fetchFields();
  }, [setFields]);

  return (
    <ListContainer>
      <ListHeader>Fields List</ListHeader>
      <List>
        {fields.map((field) => (
          <ListItem key={field.id}>
            <strong>Name:</strong> {field.name}
            <strong>Boundary:</strong> {JSON.stringify(field.boundary)}
            <strong>Farm:</strong> {field.farm?.name}
            <strong>Soil:</strong> {field.soil?.name}
          </ListItem>
        ))}
      </List>
    </ListContainer>
  );
};

export default FieldList;
