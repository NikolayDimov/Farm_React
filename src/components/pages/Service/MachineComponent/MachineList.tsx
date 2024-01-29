import React, { useEffect, useState } from 'react';
import authHeader from '../../../../services/authHeader';
import { Machine } from "./interface";
import { Farm } from './interface';
import { ListContainer, ListHeader, ListItem, List } from '../../../common/ListStyles';

const BASE_URL = "http://localhost:3000";


interface MachinesListProps {
  machines: Machine[];
  setMachines: React.Dispatch<React.SetStateAction<Machine[]>>;
}

const MachineList: React.FC<MachinesListProps> = ({ machines, setMachines }) => {
  const [farms, setFarms] = useState<Farm[]>([]);

  useEffect(() => {
    const fetchFarms = async () => {
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
    };

    fetchFarms();
  }, []);

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

          const updatedMachines: Machine[] = machinesData.data.map((period: any) => ({
            ...period,
            farm: farms.find((farm) => farm.id === period.farm_id) as Farm,
          }));
          
          setMachines(updatedMachines);
        } else {
          console.error('Failed to fetch machines from the database');
        }
      } catch (error) {
        console.error('Error fetching machines:', error);
      }
    };

    fetchMachines();
  }, [setMachines, farms]);

  return (
    <ListContainer>
      <ListHeader>Machine List</ListHeader>
      <List>
      {machines.map((machine) => (
        <ListItem key={machine.id}>
          <strong>Brand:</strong> {machine.brand} |&nbsp;
          <strong>Model:</strong> {machine.model} |&nbsp;
          <strong>Register Number:</strong> {machine.registerNumber} |&nbsp;
          <strong>Farm:</strong> {machine.farm?.name}
        </ListItem>
      ))}
      </List>
    </ListContainer>
  );
};

export default MachineList;


