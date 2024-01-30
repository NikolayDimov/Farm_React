// MachineList.tsx
import React, { useEffect, useState } from 'react';
import { Processing } from "./Processing.static";
import { ListContainer, ListHeader, ListItem, List } from '../../../common/ListStyles';
import { apiFarm } from '../../Profile/Farm/apiFarm';
import { apiSoil } from '../Soil/apiSoil';
import { Field } from '../Field/Field.static';
import { Farm } from '../../Profile/Farm/Farm.static';
import { Soil } from '../Soil/Soil.static';
import { Crop } from '../Crop/Crop.static';
import { ProcessingType } from '../ProcessingType/ProcessingType.static';
import { Machine } from '../Machine/Machine.static';
import { apiProcessingType } from '../ProcessingType/apiProcessingType';
import { apiCrop } from '../Crop/apiCrop';
import { apiField } from '../Field/apiField';
import { apiMachine } from '../Machine/apiMachine';
import { apiProcessing } from './apiProcessing';
import { GrowingCropPeriod } from '../GrowingCropPeriod/GrowingCropPeriod.static';
import { apiGrowingCropPeriod } from '../GrowingCropPeriod/apiGrowingCropPeriod';

interface ProcessingListProps {
    processings: Processing[];
  setProcessings: React.Dispatch<React.SetStateAction<Processing[]>>;
}

const FieldList: React.FC<ProcessingListProps> = ({ processings, setProcessings }) => {
  const [processingTypes, setProcessingTypes] = useState<ProcessingType[]>([]);
  const [growingCropPeriods, setGrowingCropPeriods] = useState<GrowingCropPeriod[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [soils, setSoils] = useState<Soil[]>([]);
  const [loading, setLoading] = useState(true);

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

  const findSoilName = (soilId: string): string => {
    const soil = soils.find((soil) => soil.id === soilId);
    return soil ? soil.name : 'Unknown Farm';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const processingsData = await apiProcessing.fetchProcessings();
        const processingTypesData = await apiProcessingType.fetchProcessingTypes();
        const growingCropPeriodsData = await apiGrowingCropPeriod.fetchGCP();
        const fieldsData = await apiField.fetchFields();
        const cropsData = await apiCrop.fetchCrops();
        const machinesData = await apiMachine.fetchMachines();
        const farmsData = await apiFarm.fetchFarms();
        const soilsData = await apiSoil.fetchSoils();

        // console.log('Processings data:', processingsData.data);
        // console.log('Processing Types data:', processingTypesData.data);
        // console.log('Growing Crop Periods data:', growingCropPeriodsData.data);
        // console.log('Fields data:', fieldsData.data);
        // console.log('Crops data:', cropsData.data);
        // console.log('Machines data:', machinesData.data);
        // console.log('Farms data:', farmsData.data);
        // console.log('Soils data:', soilsData.data);

        setProcessings(processingsData.data);
        setProcessingTypes(processingTypesData.data);
        setGrowingCropPeriods(growingCropPeriodsData.data);
        setFields(fieldsData.data);
        setCrops(cropsData.data);
        setMachines(machinesData.data);
        setFarms(farmsData.data);
        setSoils(soilsData.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  
    fetchData();
  }, [setProcessings]);


  if (loading) {
    return <p>Loading machines...</p>;
  }



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
              <strong>Farmmachine:</strong> {findFarmNameByMachineId(processing.machineId)} |&nbsp;

            </ListItem>
          ))
        ) : (
          <p>No processing available</p>
        )}
      </List>
    </ListContainer>
  );
  
  
  
};

export default FieldList;
