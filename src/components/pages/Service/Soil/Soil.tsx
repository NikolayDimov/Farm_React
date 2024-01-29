import React, { useState } from 'react';
import SoilList from './SoilList';
import AddSoil from './AddSoil';
import { Soil } from "./Soil.static";

const SoilComponent: React.FC = () => {
  const [soils, setSoils] = useState<Soil[]>([]);

  const handleSoilAdded = (newSoil: Soil) => {
    setSoils((prevSoils) => [...prevSoils, newSoil]);
  };

  return (
    <>
      <AddSoil onSoilAdded={handleSoilAdded} />
      <SoilList soils={soils} setSoils={setSoils} />
    </>
  );
};

export default SoilComponent;
