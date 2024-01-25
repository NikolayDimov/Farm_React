// SoilComponent.tsx
import React, { useState } from 'react';
import SoilList from './SoilList';
import AddSoil from './AddSoil';
import { Soil } from "./interface";

const SoilComponent: React.FC = () => {
  const [soils, setSoils] = useState<Soil[]>([]);

  const handleSoilAdded = (newSoil: Soil) => {
    setSoils((prevSoils) => [...prevSoils, newSoil]);
  };

  return (
    <>
      <SoilList soils={soils} setSoils={setSoils} />
      <AddSoil onSoilAdded={handleSoilAdded} />
    </>
  );
};

export default SoilComponent;
