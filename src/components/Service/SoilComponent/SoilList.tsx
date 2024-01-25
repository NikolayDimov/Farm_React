// SoilList.tsx
import React, { useEffect } from 'react';
import styled from 'styled-components';
import authHeader from '../../../services/authHeader';
import { Soil } from "./interface";

const BASE_URL = "http://localhost:3000";


const SoilListContainer = styled.div`
  /* Add styles for the block list container */
`;

const SoilItem = styled.div`
  /* Add styles for individual block items */
  margin-bottom: 10px;
`;

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
    <SoilListContainer>
      <h2>Soil List</h2>
      {soils.map((soil) => (
        <SoilItem key={soil.id}>
          <strong>Name:</strong> {soil.name}
        </SoilItem>
      ))}
    </SoilListContainer>
  );
};

export default SoilList;
