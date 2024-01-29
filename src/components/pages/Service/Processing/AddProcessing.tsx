import React, { useState, useEffect } from 'react';
import authHeader from '../../../../services/authHeader';
import { Processing } from "./Processing.static";
import { GrowingCropPeriod } from './Processing.static';
import { ProcessingType } from './Processing.static';
import { Machine } from './Processing.static';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const BASE_URL = "http://localhost:3000";

interface AddProcessingProps {
  onProcessingAdded: (newProcessing: Processing) => void;
}

const AddProcessing: React.FC<AddProcessingProps> = ({ onProcessingAdded }) => {
  const [newDate, setNewDate] = useState<Date | null>(null);
  const [newGrowingCropPeriodId, setNewGrowingCropPeriodId] = useState('');
  const [newProcessingTypeId, setNewProcessingTypeId] = useState('');
  const [newMachineId, setNewMachineId] = useState('');
  const [growingCropPeriods, setGrowingCropPeriods] = useState<GrowingCropPeriod[]>([]);
  const [processingTypes, setProcessingTypes] = useState<ProcessingType[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');


  useEffect(() => {
    const fetchGrowingCropPeriod = async () => {
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
          console.error('Failed to fetch growingCropPeriods from the database');
        }
      } catch (error) {
        console.error('Error fetching growingCropPeriods:', error);
      }
    };
    
    fetchGrowingCropPeriod();
  }, []);

  useEffect(() => {
    const fetchProcessingTypes = async () => {
      try {
        const authHeaders = authHeader();
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
        };

        const processingTypesResponse = await fetch(`${BASE_URL}/processingTypes`, {
          method: 'GET',
          headers,
        });

        if (processingTypesResponse.ok) {
          const processingTypesData: { data: ProcessingType[] } = await processingTypesResponse.json();
          setProcessingTypes(processingTypesData.data);
          
        } else {
          console.error('Failed to fetch processing Types from the database');
        }
      } catch (error) {
        console.error('Error fetching processing Types:', error);
      }
    };
    
    fetchProcessingTypes();
  }, []);

  useEffect(() => {
    const fetchMachines = async () => {
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
          console.error('Failed to fetch machines from the database');
        }
      } catch (error) {
        console.error('Error fetching machines:', error);
      }
    };
    
    fetchMachines();
  }, []);
  
  const handleAddProcessing = async () => {
    try {
      const authHeaders = authHeader();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
      };

      if (!newGrowingCropPeriodId || !newProcessingTypeId || newMachineId) {
        setErrorMessage('GrowingCropPeriod, ProcessingType or Machine are required.');
        return;
      }

      const response = await fetch(`${BASE_URL}/processing`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ 
          date: newDate, 
          growingCropPeriodId: newGrowingCropPeriodId,
          processingTypeId: newProcessingTypeId,
          machineId: newMachineId
        }),
      });

      if (response.ok) {
        const newProcessing: Processing = {
          id: 'temporary-id-' + Date.now(),
          date: new Date(),
          growingCropPeriodId: newGrowingCropPeriodId,
          processingTypeId: newProcessingTypeId,
          machineId: newMachineId
        };

        onProcessingAdded(newProcessing);
        setNewDate(null);
        setNewGrowingCropPeriodId('');
        setNewProcessingTypeId('');
        setNewMachineId('');
        setErrorMessage('');
      } else {
        console.error('Failed to create a new processing in the database');
        const responseText = await response.text();
        console.error('Response text:', responseText);
      }
    } catch (error) {
      console.error('Failed to create a new field in the database');
    
    }
  };


  return (
    <div>
      <h3>Add a New Processing</h3>
      <label>Processing date:</label>
      <DatePicker selected={newDate} onChange={(date: Date) => setNewDate(date)} />
      <label>GrowingCropPeriod:</label>
      <select
        value={newGrowingCropPeriodId}
        onChange={(e) => setNewGrowingCropPeriodId(e.target.value)}
      >
        <option value="">Select GrowingCropPeriod</option>
        {growingCropPeriods.map((growingCropPeriod) => (
          <option key={growingCropPeriod.id} value={growingCropPeriod.id}>
            {growingCropPeriod.id}
          </option>
        ))}
      </select>
      <label>Processing Type:</label>
      <select
        value={newProcessingTypeId}
        onChange={(e) => setNewProcessingTypeId(e.target.value)}
      >
        <option value="">Select Processing Type</option>
        {processingTypes.map((processingType) => (
          <option key={processingType.id} value={processingType.id}>
            {processingType.name}
          </option>
        ))}
      </select>
      <label>Machine:</label>
      <select
        value={newMachineId}
        onChange={(e) => setNewMachineId(e.target.value)}
      >
        <option value="">Select Machine</option>
        {machines.map((machine) => (
          <option key={machine.id} value={machine.id}>
            {machine.brand}, {machine.model}, {machine.registerNumber}
          </option>
        ))}
      </select>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={handleAddProcessing}>Create Processing</button>

    </div>
  );
};

export default AddProcessing;
