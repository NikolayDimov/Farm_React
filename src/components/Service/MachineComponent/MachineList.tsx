import React, { useEffect } from 'react';
import styled from 'styled-components';
import authHeader from '../../../services/authHeader';
import { Machine } from "./interface";
const BASE_URL = "http://localhost:3000";


const MachineListContainer = styled.div`
  /* Add styles for the block list container */
`;

const MachineItem = styled.div`
  /* Add styles for individual block items */
  margin-bottom: 10px;
`;

interface MachinesListProps {
  machines: Machine[];
  setMachines: React.Dispatch<React.SetStateAction<Machine[]>>;
}

const MachineList: React.FC<MachinesListProps> = ({ machines, setMachines }) => {

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const authHeaders = authHeader();
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
        };

        const response = await fetch(`${BASE_URL}/machine`, {
          method: 'GET',
          headers,
        });

        if (response.ok) {
          const machinesData = await response.json();
          
          setMachines(machinesData.data);
        } else {
          console.error('Failed to fetch soils from the database');
        }
      } catch (error) {
        console.error('Error fetching soils:', error);
      }
    };

    
    fetchMachines();
  }, [setMachines]);

  return (
    <MachineListContainer>
      <h2>Machine List</h2>
      {machines.map((machine) => (
        <MachineItem key={machine.id}>
          <strong>Brand:</strong> {machine.brand}
          <strong>Model:</strong> {machine.model}
          <strong>Register Number:</strong> {machine.registerNumber}
          <strong>Farm:</strong> {machine.farm?.name}
        </MachineItem>
      ))}
    </MachineListContainer>
  );
};

export default MachineList;


