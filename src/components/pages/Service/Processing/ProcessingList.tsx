import React, { useState } from 'react';
import { Processing } from "./Processing.static";
import { ListContainer, ListHeader, ListItem, List } from '../../../common/ListStyles';
import { Field } from '../Field/Field.static';
import { Farm } from '../../Profile/Farm/Farm.static';
import { Soil } from '../Soil/Soil.static';
import { Crop } from '../Crop/Crop.static';
import { ProcessingType } from '../ProcessingType/ProcessingType.static';
import { Machine } from '../Machine/Machine.static';
import { GrowingCropPeriod } from '../GrowingCropPeriod/GrowingCropPeriod.static';
import { DeleteIcon, StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from '../ServicePage.style';


interface ProcessingListProps {
    processings: Processing[];
    processingTypes: ProcessingType[];
    growingCropPeriods: GrowingCropPeriod[];
    fields: Field[];
    crops: Crop[];
    machines: Machine[];
    farms: Farm[];
    soils: Soil[];
    onDeleteProcessing: (processingId: string) => void;
}

const ProcessingList: React.FC<ProcessingListProps> = ({ processings, processingTypes, growingCropPeriods, fields, crops, machines, farms, soils, onDeleteProcessing }) => {
  const [selectedProcessingId, setSelectedProcessingId] = useState<string | null>(null);

  const findProcessingTypeName = (processingTypeId: string): string => {
    const processingType = processingTypes.find((processingType) => processingType.id === processingTypeId);
    return processingType ? processingType.name : 'Unknown processingType';
  };

  const findGrowingCropPeriodCrop = (growingCropPeriodId: string | undefined): string => {
    const growingCropPeriod = growingCropPeriods.find((growingCropPeriod) => growingCropPeriod.id === growingCropPeriodId);
    return growingCropPeriod ? findCropName(growingCropPeriod.cropId) : 'Unknown growingCropPeriod.crop';
  };
  
  const findGrowingCropPeriodField = (growingCropPeriodId: string | undefined): string => {
    const growingCropPeriod = growingCropPeriods.find((growingCropPeriod) => growingCropPeriod.id === growingCropPeriodId);
    return growingCropPeriod ? findFieldName(growingCropPeriod.fieldId) : 'Unknown growingCropPeriod.field';
  };  
  

  const findFieldName = (fieldId: string | undefined): string => {
    const field = fields.find((field) => field.id === fieldId);
    return field ? field.name : 'Unknown field';
  };
  
  const findCropName = (cropId: string | undefined): string => {
    const crop = crops.find((crop) => crop.id === cropId);
    return crop ? crop.name : 'Unknown crop';
  };  
 

const findMachineName = (machineId: string): string => {
    const machine = machines.find((machine) => machine.id === machineId);
    return machine ? `${machine.brand} - ${machine.model} (${machine.registerNumber})` : 'Unknown machine';
  };
  

  const findFarmNameByMachineId = (machineId: string): string => {
    const machine = machines.find((machine) => machine.id === machineId);
    return machine ? findFarmName(machine.farmId) : 'Unknown farm';
  };
  

  const findFarmName = (farmId: string): string => {
    const farm = farms.find((farm) => farm.id === farmId);
    return farm ? farm.name : 'Unknown Farm';
  };

  // const findSoilNameByFieldId = (fieldId: string): string => {
  //   const field = fields.find((field) => field.id === fieldId);
  //   return field ? findSoilName(field.soilId) : 'Unknown soil';
  // };

  // const findSoilName = (soilId: string): string => {
  //   const soil = soils.find((soil) => soil.id === soilId);
  //   return soil ? soil.name : 'Unknown Soil';
  // };
  

  const handleDeleteClick = (processingId: string | undefined) => {
    if (processingId) {
      setSelectedProcessingId(processingId);
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedProcessingId) {
      await onDeleteProcessing(selectedProcessingId);
      setSelectedProcessingId(null);
    }
  };

  const handleDeleteCancel = () => {
    setSelectedProcessingId(null);
  };



  return (
    <ListContainer>
      <ListHeader>Processing List</ListHeader>
      <List>
        {Array.isArray(processings) ? (
          processings.map((processing) => (
            <ListItem key={processing.id}>
              <strong>Date:</strong> {new Date(processing.date).toLocaleDateString()} |&nbsp;
              <strong>ProcessingType:</strong> {findProcessingTypeName(processing.processingTypeId)} |&nbsp;
              <strong>Field:</strong> {findGrowingCropPeriodField(processing.growingCropPeriodId)} |&nbsp;
              <strong>Crop:</strong> {findGrowingCropPeriodCrop(processing.growingCropPeriodId)} |&nbsp;
              <strong>Machine:</strong> {findMachineName(processing.machineId)} |&nbsp;
              <strong>Farm:</strong> {findFarmNameByMachineId(processing.machineId)} |&nbsp;
              

              {/* <strong>FieldSoil:</strong> {findSoilNameByFieldId(processing.growingCropPeriodId)} |&nbsp;
              <strong>Soil:</strong> {findSoilNameByFieldId(processing.growingCropPeriodId)} |&nbsp;  */}
              

              <DeleteIcon onClick={() => handleDeleteClick(processing.id)}>X</DeleteIcon>
            </ListItem>
          ))
        ) : (
          <p>No processing available</p>
        )}
      </List>

      <ModalOverlay show={!!selectedProcessingId} confirmation={false}>
        {/* Use StyledModalContainer here instead of ModalContainer */}
        <StyledModalContainer confirmation={false}>
          <ModalContent>
            <p>Are you sure you want to delete this processing?</p>
          </ModalContent>
          <ModalActions>
            <ModalButton onClick={handleDeleteConfirm}>Yes</ModalButton>
            <ModalButton onClick={handleDeleteCancel}>No</ModalButton>
          </ModalActions>
        </StyledModalContainer>
      </ModalOverlay>
    </ListContainer>
  );
  
  
  
};

export default ProcessingList;
