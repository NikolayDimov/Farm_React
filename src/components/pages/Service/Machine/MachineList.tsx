// MachineList.tsx
import React, { useEffect, useState } from 'react';
import { Machine } from "./Machine.static";
import { Farm } from './Machine.static';
import { ListContainer, ListHeader, ListItem, List } from '../../../common/ListStyles';
import { apiMachine } from './apiMachine';
import { apiFarm } from '../../Profile/Farm/apiFarm';

interface MachinesListProps {
  machines: Machine[];
  setMachines: React.Dispatch<React.SetStateAction<Machine[]>>;
}

const MachineList: React.FC<MachinesListProps> = ({ machines, setMachines }) => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);


  const findFarmName = (farmId: string): string => {
    const farm = farms.find((farm) => farm.id === farmId);
    return farm ? farm.name : 'Unknown Farm';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const machinesData = await apiMachine.fetchMachines();
        const farmsData = await apiFarm.fetchFarms();

        setMachines(machinesData.data);
        setFarms(farmsData.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setMachines]);


  if (loading) {
    return <p>Loading machines...</p>;
  }

  return (
    <ListContainer>
      <ListHeader>Machine List</ListHeader>
      <List>
        {Array.isArray(machines) ? (
          machines.map((machine) => (
            <ListItem key={machine.id}>
              <strong>Brand:</strong> {machine.brand} |&nbsp;
              <strong>Model:</strong> {machine.model} |&nbsp;
              <strong>Register Number:</strong> {machine.registerNumber} |&nbsp;
              <strong>Farm:</strong> {findFarmName(machine.farmId)}
            </ListItem>
          ))
        ) : (
          <p>No machines available</p>
        )}
      </List>
    </ListContainer>
  );
};

export default MachineList;
