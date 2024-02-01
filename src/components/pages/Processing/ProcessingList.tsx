import React, { useState } from 'react';
import { Processing } from "./Processing.static";
import { Field } from '../Field/Field.static';
import { Farm } from '../Farm/Farm.static';
import { Soil } from '../Soil/Soil.static';
import { Crop } from '../Crop/Crop.static';
import { ProcessingType } from '../ProcessingType/ProcessingType.static';
import { Machine } from '../Machine/Machine.static';
import { GrowingCropPeriod } from '../GrowingCropPeriod/GrowingCropPeriod.static';
import { ListContainer, ListHeader, List, ListItem } from '../../BaseLayout/common/ListStyles';
import EditIcon from '../../BaseLayout/common/icons/EditIcon'; 
import DeleteIcon from '../../BaseLayout/common/icons/DeleteIcon'; 
import { ButtonContainer } from '../../BaseLayout/common/icons/ButtonContainer';
import { StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from '../../BaseLayout/BaseLayout.style';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


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
    onEditProcessing: (processingId: string, newProcessingDate: Date, newProcessingTypeId: string, newMachineId: string) => void; 
}

const ProcessingList: React.FC<ProcessingListProps> = ({ processings, processingTypes, growingCropPeriods, fields, crops, machines, farms, soils, onDeleteProcessing, onEditProcessing }) => {
  const [selectedProcessingIdForDelete, setSelectedProcessingIdForDelete] = useState<string | null>(null);
  const [selectedProcessingIdForEdit, setSelectedProcessingIdForEdit] = useState<string | null>(null);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [currentProcessingDate, setCurrentProcessingDate] = useState<Date | undefined>();
  const [originalProcessingDate, setOriginalProcessingDate] = useState<string>('');
  const [selectedProcessingTypeId, setSelectedProcessingTypeId] = useState<string>(''); 
  const [selectedMachinedId, setSelectedMachineId] = useState<string>(''); 

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
      setSelectedProcessingIdForDelete(processingId);
      setDeleteModalVisible(true);
    }
  };

  const handleEditClick = (processingId: string | undefined, processingDate: Date, processingTypeId: string, machineId: string) => {
    if (processingId && processingDate) {
      setSelectedProcessingIdForEdit(processingId);
      setCurrentProcessingDate(processingDate);
      setSelectedProcessingTypeId(processingTypeId);
      setSelectedMachineId(machineId);
      setEditModalVisible(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedProcessingIdForDelete) {
      await onDeleteProcessing(selectedProcessingIdForDelete);
      setSelectedProcessingIdForDelete(null);
      setDeleteModalVisible(false);
    }
  };

  const handleDeleteCancel = () => {
    setSelectedProcessingIdForDelete(null);
    setDeleteModalVisible(false);
  };

  const handleEditConfirm = async () => {
    try {
      if (selectedProcessingIdForEdit && currentProcessingDate) {
        await onEditProcessing(selectedProcessingIdForEdit, currentProcessingDate, selectedProcessingTypeId, selectedMachinedId);
      }

      setSelectedProcessingIdForEdit(null);
      setEditModalVisible(false);
      setOriginalProcessingDate('');
      setSelectedProcessingTypeId('');
      setSelectedMachineId('');
    } catch (error) {
      console.error('Error handling edit confirmation:', error);
    }
  };

  const handleEditCancel = () => {
    setSelectedProcessingIdForEdit(null);
    setEditModalVisible(false);
    setCurrentProcessingDate(undefined); 
    setSelectedProcessingTypeId('');
    setSelectedMachineId('');
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
              <ButtonContainer>
                <EditIcon onClick={() => handleEditClick(processing.id, new Date(processing.date), processing.processingTypeId, processing.machineId)} />
                <DeleteIcon onClick={() => handleDeleteClick(processing.id)} />
              </ButtonContainer>
            </ListItem>
          ))
        ) : (
          <p>No processing available</p>
        )}
      </List>

      {/* Edit Modal */}
      <ModalOverlay show={isEditModalVisible} confirmation={false}>
        <StyledModalContainer confirmation={false}>
          <ModalContent>
            <p>Processing date: {originalProcessingDate}</p>
            <DatePicker
              selected={currentProcessingDate ? new Date(currentProcessingDate) : null}
              onChange={(date) => setCurrentProcessingDate(date as Date)}
            />

            <div>
              <label>Select Processing Type:</label>
              <select
                value={selectedProcessingTypeId}
                onChange={(e) => setSelectedProcessingTypeId(e.target.value)}
              >
                <option value="" disabled>
                  Select Processing Type
                </option>
                {processingTypes.map((processingType) => (
                  <option key={processingType.id} value={processingType.id}>
                    {processingType.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Select Machine:</label>
              <select
                value={selectedMachinedId}
                onChange={(e) => setSelectedMachineId(e.target.value)}
              >
                <option value="" disabled>
                  Select Machine
                </option>
                {machines.map((machine) => (
                  <option key={machine.id} value={machine.id}>
                    {machine.brand}  {machine.model}  {machine.registerNumber}
                  </option>
                ))}
              </select>
            </div>
          </ModalContent>
          <ModalActions>
            <ModalButton onClick={handleEditConfirm}>Save</ModalButton>
            <ModalButton onClick={handleEditCancel}>Cancel</ModalButton>
          </ModalActions>
        </StyledModalContainer>
      </ModalOverlay>

      {/* Delete Modal */}
      <ModalOverlay show={isDeleteModalVisible} confirmation={false}>
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
