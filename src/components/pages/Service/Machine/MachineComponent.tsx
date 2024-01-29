
import React, { useState } from 'react';
import { Machine } from "./Machine.static";
import AddMachine from './AddMachine';
import MachineList from './MachineList';

const MachineComponent: React.FC = () => {
  const [machines, setMachines] = useState<Machine[]>([]);

  const handleMachineAdded = (newMachine: Machine) => {
    setMachines((prevMachines) => [...prevMachines, newMachine]);
  };
  

  return (
    <>
      <AddMachine onMachineAdded={handleMachineAdded} />
      <MachineList machines={machines} setMachines={setMachines} />
    </>
  );
};

export default MachineComponent;


