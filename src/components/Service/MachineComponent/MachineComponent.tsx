
import React, { useState } from 'react';
import { Machine } from "./interface";
import AddMachine from './AddMachine';
import MachineList from './MachineList';

const MachineComponent: React.FC = () => {
  const [machines, setMachines] = useState<Machine[]>([]);

  const handleMachineAdded = (newMachine: Machine) => {
    setMachines((prevMachines) => [...prevMachines, newMachine]);
  };

  // const convertedMachines: MachineListReport[] = machines.map((machine) => {
  //   // Assuming farmName should be an empty string here, you may need to fetch it.
  //   return { ...machine, farmName: '' };
  // });

  return (
    <>
      <AddMachine onMachineAdded={handleMachineAdded} />
      <MachineList machines={machines} setMachines={setMachines} />
    </>
  );
};

export default MachineComponent;


