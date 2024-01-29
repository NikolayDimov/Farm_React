import React, { useEffect, useState, useCallback } from 'react';
import authHeader from '../../../../services/authHeader';
import { Processing } from './Processing.static';
import { GrowingCropPeriod } from './Processing.static';
import { ProcessingType } from './Processing.static';
import { Machine } from './Processing.static';
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
        console.error('Failed to fetch processingTypes from the database');
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

  useEffect(() => {
    const fetchData = async () => {
      await fetchGrowingCropPeriods();
      await fetchProcessingTypes();
      await fetchMachines();
    };
  
    fetchData();
  
    console.log("Initial Growing Crop Periods:", growingCropPeriods);
    console.log("Initial ProcessingTypes:", processingTypes);
    console.log("Initial Machines:", machines);
  }, []);
  
  useEffect(() => {
    console.log("Updated Growing Crop Periods:", growingCropPeriods);
  }, [growingCropPeriods]);
  
  useEffect(() => {
    console.log("Updated ProcessingTypes:", processingTypes);
  }, [processingTypes]);
  
  useEffect(() => {
    console.log("Updated Machines:", machines);
  }, [machines]);
  


  // Memoize Callbacks
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

          setProcessings((prevProcessings: Processing[]) => {
            const updatedProcessings: Processing[] = processingsData.data.map((period: any) => ({
              ...period,
              growingCropPeriod: growingCropPeriods.find((growingCropPeriod) => growingCropPeriod.id === period.growingCropPeriod_id) as GrowingCropPeriod,
              processingType: processingTypes.find((processingType) => processingType.id === period.processingType_id) as ProcessingType,
              machine: machines.find((machine) => machine.id === period.machine_id) as Machine,
            }));

            if (JSON.stringify(prevProcessings) !== JSON.stringify(updatedProcessings)) {
              return updatedProcessings;
            }

            return prevProcessings;
          });
        } else {
          console.error('Failed to fetch rocessings from the database');
        }
      } catch (error) {
        console.error('Error fetching processings:', error);
      }
    };

    fetchProcessings();
  }, [setProcessings, growingCropPeriods, processingTypes, machines]);

  return (
    <ListContainer>
      <ListHeader>Fields List</ListHeader>
      <List>
        {processings.map((processing) => (
          <ListItem key={processing.id}>
            <strong>Date:</strong> {processing.date.toString()} |&nbsp;
            {/* <strong>Date:</strong> {new Date(processing.date).toLocaleDateString()} |&nbsp; */}

            <strong>GPid:</strong> {processing.growingCropPeriod?.id} |&nbsp;
            <strong>GPCrop:</strong> {processing.growingCropPeriod?.crop?.name} |&nbsp;
            {/* <strong>GPFieldname:</strong> {processing.growingCropPeriod?.field?.name} |&nbsp; */}
            {/* <strong>Processing Type:</strong> {processing.processingType?.name} |&nbsp; */}
            {/* <strong>mMchine:</strong> {processing.machine?.brand} |&nbsp; */}
            {/* <strong>mMchine:</strong> {processing.machine?.farm} |&nbsp; */}
          </ListItem>
        ))}
      </List>
    </ListContainer>
  );
};

export default ProcessingList;
