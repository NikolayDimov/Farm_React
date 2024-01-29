
import React, { useState } from 'react';
import { GrowingCropPeriod } from "./GrowingCropPeriod.static";
import AddGrowingCropPeriod from './AddCrowingCropPeriod';
import GrowingCropPeriodList from './GrowingCropPeriodList';

const GrowingCropPeriodComponent: React.FC = () => {
  const [growingCropPeriods, setGrowingCropPeriods] = useState<GrowingCropPeriod[]>([]);

  const handleGrowingCropPeriodAdded = (newGrowingCropPeriod: GrowingCropPeriod) => {
    setGrowingCropPeriods((prevGrowingCropPeriods) => [...prevGrowingCropPeriods, newGrowingCropPeriod]);
  };
  

  return (
    <>
      <AddGrowingCropPeriod onGrowingCropPeriodAdded={handleGrowingCropPeriodAdded} />
      <GrowingCropPeriodList growingCropPeriods={growingCropPeriods} setGrowingCropPeriods={setGrowingCropPeriods} />
    </>
  );
};

export default GrowingCropPeriodComponent;


