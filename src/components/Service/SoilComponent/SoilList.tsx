import React, { useEffect } from 'react';
import authHeader from '../../../services/authHeader';
import { Soil } from "./interface";
import { ListContainer, ListHeader, ListItem, List } from '../../common/ListStyles';

const BASE_URL = "http://localhost:3000";



interface SoilListProps {
  soils: Soil[];
  setSoils: React.Dispatch<React.SetStateAction<Soil[]>>;
}

const SoilList: React.FC<SoilListProps> = ({ soils, setSoils }) => {

  useEffect(() => {
    const fetchSoils = async () => {
      try {
        const authHeaders = authHeader();
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
        };

        const response = await fetch(`${BASE_URL}/soil`, {
          method: 'GET',
          headers,
        });

        if (response.ok) {
          const soilsData = await response.json();
          
          setSoils(soilsData.data);
        } else {
          console.error('Failed to fetch soils from the database');
        }
      } catch (error) {
        console.error('Error fetching soils:', error);
      }
    };

    fetchSoils();
  }, [setSoils]);

  return (
    <ListContainer>
      <ListHeader>Soil List</ListHeader>
      <List>
      {soils.map((soil) => (
        <ListItem key={soil.id}>
          <strong>Name:</strong> {soil.name}
        </ListItem>
      ))}
       </List>
    </ListContainer>
  );
};

export default SoilList;
