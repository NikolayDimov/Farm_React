import React, { useState } from 'react';
import { Processing } from './Processing.static';
import ProcessingList from './ProcessingList';
import AddProcessing from './AddProcessing';


const ProcessingComponent: React.FC = () => {
  const [processings, setProcessings] = useState<Processing[]>([]);

  const handleProcessingAdded = (newProcessing: Processing) => {
    setProcessings((prevProcessings) => [...prevProcessings, newProcessing]);
  };

 
  return (
    <>
      <AddProcessing onProcessingAdded={handleProcessingAdded} />
      <ProcessingList processings={processings} setProcessings={setProcessings} /> 
    </>
  );
};



export default ProcessingComponent;
