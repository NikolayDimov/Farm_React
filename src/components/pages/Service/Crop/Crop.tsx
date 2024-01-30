import React, { useState } from 'react';
import CropList from './CropList';
import AddCrop from './AddCrop';
import { Crop } from "./Crop.static";

const SoilComponent: React.FC = () => {
  const [crops, setCrops] = useState<Crop[]>([]);

  const handleCropAdded = (newCrop: Crop) => {
    setCrops((prevCrops) => [...prevCrops, newCrop]);
  };

  return (
    <>
      <AddCrop onCropAdded={handleCropAdded} />
      <CropList crops={crops} setCrops={setCrops} />
    </>
  );
};

export default SoilComponent;
