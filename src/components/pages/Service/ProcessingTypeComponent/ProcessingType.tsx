import React, { useState } from 'react';
import ProcessingTypeList from './ProcessingTypeList';
import AddProcessingType from './AddProcessingType';
import { ProcessingType } from "./interface";

const ProcessingTypeComponent: React.FC = () => {
  const [processingTypes, setProcessingTypes] = useState<ProcessingType[]>([]);

  const handleProcessingTypeAdded = (newProcessingType: ProcessingType) => {
    setProcessingTypes((prevProcessingTypes) => [...prevProcessingTypes, newProcessingType]);
  };

  return (
    <>
      <AddProcessingType onProcessingTypeAdded={handleProcessingTypeAdded} />
      <ProcessingTypeList processingTypes={processingTypes} setProcessingTypes={setProcessingTypes} />
    </>
  );
};

export default ProcessingTypeComponent;
