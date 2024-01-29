import React, { useEffect, useState, useCallback } from 'react';
import authHeader from '../../../../services/authHeader';
import { Field } from './interface';
import { Farm } from './interface';
import { Soil } from './interface';
import { ListContainer, ListHeader, ListItem, List } from '../../../common/ListStyles';

const BASE_URL = "http://localhost:3000";

interface FieldsListProps {
  fields: Field[];
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
}

const FieldList: React.FC<FieldsListProps> = ({ fields, setFields }) => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [soils, setSoils] = useState<Soil[]>([]);

  const fetchFarms = useCallback(async () => {
    try {
      const authHeaders = authHeader();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
      };

      const farmsResponse = await fetch(`${BASE_URL}/farm`, {
        method: 'GET',
        headers,
      });

      if (farmsResponse.ok) {
        const farmsData: { data: Farm[] } = await farmsResponse.json();
        setFarms(farmsData.data);
      } else {
        console.error('Failed to fetch farms from the database');
      }
    } catch (error) {
      console.error('Error fetching farms:', error);
    }
  }, []);

  const fetchSoils = useCallback(async () => {
    try {
      const authHeaders = authHeader();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
      };

      const soilsResponse = await fetch(`${BASE_URL}/soil`, {
        method: 'GET',
        headers,
      });

      if (soilsResponse.ok) {
        const soilsData: { data: Soil[] } = await soilsResponse.json();
        setSoils(soilsData.data);
      } else {
        console.error('Failed to fetch soils from the database');
      }
    } catch (error) {
      console.error('Error fetching soils:', error);
    }
  }, []);

  useEffect(() => {
    fetchFarms();
    fetchSoils();
  }, [fetchFarms, fetchSoils]);

  // Memoize Callbacks
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

          setFields((prevFields: Field[]) => {
            const updatedFields: Field[] = fieldsData.data.map((period: any) => ({
              ...period,
              farm: farms.find((farm) => farm.id === period.farm_id) as Farm,
              soil: soils.find((soil) => soil.id === period.soil_id) as Soil,
            }));

            if (JSON.stringify(prevFields) !== JSON.stringify(updatedFields)) {
              return updatedFields;
            }

            return prevFields;
          });
        } else {
          console.error('Failed to fetch fields from the database');
        }
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    };

    fetchFields();
  }, [setFields, farms, soils]);

  return (
    <ListContainer>
      <ListHeader>Fields List</ListHeader>
      <List>
        {fields.map((field) => (
          <ListItem key={field.id}>
            <strong>Name:</strong> {field.name} |&nbsp;
            <strong>Farm:</strong> {field.farm?.name} |&nbsp;
            <strong>Soil:</strong> {field.soil?.name}
          </ListItem>
        ))}
      </List>
    </ListContainer>
  );
};

export default FieldList;
