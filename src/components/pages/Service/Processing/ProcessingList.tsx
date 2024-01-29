import React, { useEffect, useState, useCallback } from 'react';
import authHeader from '../../../../services/authHeader';
import { Processing } from './Processing.static';
import { GrowingCropPeriod } from './Processing.static';
import { ProcessingType } from './Processing.static';
import { Machine } from './Processing.static';
import { Field } from './Processing.static';
import { Crop } from './Processing.static';
import { Farm } from './Processing.static';
import { ListContainer, ListHeader, ListItem, List } from '../../../common/ListStyles';

const BASE_URL = "http://localhost:3000";

interface ProcessingsListProps {
  processings: Processing[];
  setProcessings: React.Dispatch<React.SetStateAction<Processing[]>>;
}

const ProcessingList: React.FC<ProcessingsListProps> = ({ processings, setProcessings }) => {
  const [growingCropPeriods, setGrowingCropPeriods] = useState<GrowingCropPeriod[]>([]);
  const [processingTypes, setProcessingTypes] = useState<ProcessingType[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [farms, setFarms] = useState<Farm[]>([]);
 

  const fetchGrowingCropPeriods = useCallback(async () => {
    try {
      const authHeaders = authHeader();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
      };

      const growingCropPeriodsResponse = await fetch(`${BASE_URL}/growingCropPeriod`, {
        method: 'GET',
        headers,
      });

      if (growingCropPeriodsResponse.ok) {
        const growingCropPeriodsData: { data: GrowingCropPeriod[] } = await growingCropPeriodsResponse.json();
        setGrowingCropPeriods(growingCropPeriodsData.data);
      } else {
        console.error('Failed to fetch GrowingCropPeriod from the database');
      }
    } catch (error) {
      console.error('Error fetching GrowingCropPeriod:', error);
    }
  }, []);

  const fetchProcessingTypes = useCallback(async () => {
    try {
      const authHeaders = authHeader();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
      };

      const processingTypesResponse = await fetch(`${BASE_URL}/processingType`, {
        method: 'GET',
        headers,
      });

      if (processingTypesResponse.ok) {
        const processingTypesData: { data: ProcessingType[] } = await processingTypesResponse.json();
        setProcessingTypes(processingTypesData.data);
      } else {
        console.error('Failed to fetch processingTypes from the database');
        console.error('Response status:', processingTypesResponse.status);
        console.error('Response text:', await processingTypesResponse.text());
      }
    } catch (error) {
      console.error('Error fetching processingTypes:', error);
    }
  }, []);

  const fetchMachines = useCallback(async () => {
    try {
      const authHeaders = authHeader();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
      };

      const machinesResponse = await fetch(`${BASE_URL}/machine`, {
        method: 'GET',
        headers,
      });

      if (machinesResponse.ok) {
        const machinesData: { data: Machine[] } = await machinesResponse.json();
        setMachines(machinesData.data);
      } else {
        console.error('Failed to fetch Machine from the database');
      }
    } catch (error) {
      console.error('Error fetching Machine:', error);
    }
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetchGrowingCropPeriods();
  //     await fetchProcessingTypes();
  //     await fetchMachines();
  //   };
  //   fetchData();
  // }, []);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        await Promise.all([fetchGrowingCropPeriods(), fetchProcessingTypes(), fetchMachines()]);
        console.log('Data fetched successfully.');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  



  useEffect(() => {
    const fetchProcessings = async () => {
      try {
        const authHeaders = authHeader();
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
        };
  
        const response = await fetch(`${BASE_URL}/processing`, {
          method: 'GET',
          headers,
        });
  
        if (response.ok) {
          const processingsData = await response.json();
          
          // console.log('Fetched Processings Data:', processingsData);

  
          setProcessings((prevProcessings: Processing[]) => {
            const updatedProcessings: Processing[] = processingsData.data.map((period: any) => {
             
              console.log('Period Growing Crop Period ID:', period.growing_crop_period_id);

              const matchingGrowingCropPeriod = growingCropPeriods.find(
                (growingCropPeriod) => growingCropPeriod?.id?.toLowerCase() === period.growing_crop_period_id.toLowerCase()
              );
              console.log('Matching GrowingCropPeriod:', matchingGrowingCropPeriod);

              const matchingProcessingType = processingTypes.find(
                (processingType) => processingType?.id?.toLowerCase() === period.processing_type_id.toLowerCase()
              );
              console.log('Matching ProcessingType:', matchingProcessingType);

              const matchingMachine = machines.find(
                (machine) => machine?.id?.toLowerCase() === period.machine_id.toLowerCase()
              );
              console.log('Matching Machine:', matchingMachine);

              // Assuming you have arrays or objects named fields, crops, and farms
              const matchingField = fields.find((field) => field?.id?.toLowerCase() === matchingGrowingCropPeriod?.fieldId?.toLowerCase());
              console.log('Matching Field:', matchingField);

              const matchingCrop = crops.find((crop) => crop?.id?.toLowerCase() === matchingGrowingCropPeriod?.cropId?.toLowerCase());
              console.log('Matching Crop:', matchingCrop);

              const matchingFarm = farms.find((farm) => farm?.id?.toLowerCase() === matchingMachine?.farmId?.toLowerCase());
              console.log('Matching Farm:', matchingFarm);


      
              return {
                ...period,
                growingCropPeriod: matchingGrowingCropPeriod,
                processingType: matchingProcessingType,
                machine: matchingMachine,
              };
            });
  
            if (JSON.stringify(prevProcessings) !== JSON.stringify(updatedProcessings)) {
              return updatedProcessings;
            }
  
            return prevProcessings;
          });
        } else {
          console.error('Failed to fetch processings from the database');
        }
      } catch (error) {
        console.error('Error fetching processings:', error);
      }
    };
  
    fetchProcessings();
  }, [setProcessings, growingCropPeriods, machines, processingTypes]);
  


  return (
    <ListContainer>
      <ListHeader>Fields List</ListHeader>
      <List>
        {processings.map((processing) => (
          <ListItem key={processing.id}>
            <strong>Date:</strong> {processing.date.toString()} |&nbsp;
  
            <strong>GPid:</strong> {processing.growingCropPeriod?.id} |&nbsp;
            <strong>GPCrop:</strong> {processing.growingCropPeriod?.crop?.name} |&nbsp;
            <strong>GPFieldname:</strong> {processing.growingCropPeriod?.field?.name} |&nbsp;
            <strong>Processing Type:</strong> {processing.processingType?.name} |&nbsp;
            <strong>Machine-brand:</strong> {processing.machine?.brand} |&nbsp; 
            <strong>Machine-model:</strong> {processing.machine?.model} |&nbsp; 
            <strong>Machine-regNum:</strong> {processing.machine?.registerNumber} |&nbsp; 
            <strong>Machine-farm:</strong> {processing.machine?.farm?.name} |&nbsp;
      
    


          </ListItem>
        ))}
      </List>
    </ListContainer>
    
  );
};

export default ProcessingList;
