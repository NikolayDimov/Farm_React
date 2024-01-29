import React, { useState, useEffect } from 'react';
import authHeader from '../../../../services/authHeader';
import { Processing } from "./Processing.static";
import { GrowingCropPeriod } from './Processing.static';
import { ProcessingType } from './Processing.static';
import { Machine } from './Processing.static';
import { Field } from '../Field/Field.static';
import { Crop } from '../Crop/Crop.static';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BASE_URL = "http://localhost:3000";

interface AddProcessingProps {
  onProcessingAdded: (newProcessing: Processing) => void;
  onGrowingCropPeriodAdded: (newGrowingCropPeriod: GrowingCropPeriod) => void;
}


const AddProcessing: React.FC<AddProcessingProps> = ({ onProcessingAdded, onGrowingCropPeriodAdded }) => {
  const [newDate, setNewDate] = useState<Date | null>(null);
  const [newProcessingTypeId, setNewProcessingTypeId] = useState('');
  const [newMachineId, setNewMachineId] = useState('');
  const [newGrowingCropPeriodFieldId, setNewGrowingCropPeriodFieldId] = useState('');
  const [newGrowingCropPeriodCropId, setNewGrowingCropPeriodCropId] = useState('');
  const [growingCropPeriods, setGrowingCropPeriods] = useState<GrowingCropPeriod[]>([]);
  const [processingTypes, setProcessingTypes] = useState<ProcessingType[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
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

        const processingTypesResponse = await fetch(`${BASE_URL}/processingType`, {
          method: 'GET',
          headers,
        });

        if (processingTypesResponse.ok) {
          const processingTypesData: { data: ProcessingType[] } = await processingTypesResponse.json();
          setProcessingTypes(processingTypesData.data);

        } else {
          console.error('Failed to fetch processing Types from the database');
        }

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

        const fieldsResponse = await fetch(`${BASE_URL}/field`, {
          method: 'GET',
          headers,
        });

        if (fieldsResponse.ok) {
          const fieldsData: { data: Field[] } = await fieldsResponse.json();
          setFields(fieldsData.data);

        } else {
          console.error('Failed to fetch fields from the database');
        }

        const cropsResponse = await fetch(`${BASE_URL}/crop`, {
          method: 'GET',
          headers,
        });

        if (cropsResponse.ok) {
          const cropsData: { data: Crop[] } = await cropsResponse.json();
          setCrops(cropsData.data);

        } else {
          console.error('Failed to fetch crops from the database');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddProcessing = async () => {
    try {
      const authHeaders = authHeader();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
      };
  
  // Create a GrowingCropPeriod
  const growingCropPeriodResponse = await fetch(`${BASE_URL}/growingCropPeriod`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({
      fieldId: newGrowingCropPeriodFieldId,
      cropId: newGrowingCropPeriodCropId,
    }),
  });

  if (!growingCropPeriodResponse.ok) {
    console.error('Failed to create a new GrowingCropPeriod in the database');
    return;
  }

  const growingCropPeriodData: { id?: string } = await growingCropPeriodResponse.json();
  //console.log('GrowingCropPeriod response:', growingCropPeriodData); 

  if (!growingCropPeriodData.id) {
    console.error('Invalid response structure or missing data for GrowingCropPeriod');
    return;
  }

  const newGrowingCropPeriodId = growingCropPeriodData.id;
  
      // Create a Processing
      const response = await fetch(`${BASE_URL}/processing`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({
          date: newDate,
          growingCropPeriodId: newGrowingCropPeriodId,
          processingTypeId: newProcessingTypeId,
          machineId: newMachineId,
        }),
      });
  
      if (response.ok) {
        const newProcessing: Processing = {
          id: 'temporary-id-' + Date.now(),
          date: new Date(),
          growingCropPeriodId: newGrowingCropPeriodId,
          processingTypeId: newProcessingTypeId,
          machineId: newMachineId,
        };
  
        onProcessingAdded(newProcessing);
        setNewDate(null);
        setNewGrowingCropPeriodFieldId('');
        setNewGrowingCropPeriodCropId('');
        setNewProcessingTypeId('');
        setNewMachineId('');
        setErrorMessage('');
      } else {
        console.error('Failed to create a new processing in the database');
        const responseText = await response.text();
        console.error('Response text:', responseText);
      }
    } catch (error) {
      console.error('Failed to create a new processing:', error);
    }
  };
  

  return (
    <div>
      <h3>Add a New Processing</h3>
      <label>Processing date:</label>
      <DatePicker selected={newDate} onChange={(date: Date) => setNewDate(date)} />
      <label>GrowingCropPeriod:</label>
      <label>Field:</label>
            <select
              value={newGrowingCropPeriodFieldId}
              onChange={(e) => setNewGrowingCropPeriodFieldId(e.target.value)}
            >
              <option value="">Select Field</option>
              {fields.map((field) => (
                <option key={field.id} value={field.id}>
                  {field.name}
                </option>
              ))}
            </select>

            <label>Crop:</label>
            <select
              value={newGrowingCropPeriodCropId}
              onChange={(e) => setNewGrowingCropPeriodCropId(e.target.value)}
            >
              <option value="">Select Crop</option>
              {crops.map((crop) => (
                <option key={crop.id} value={crop.id}>
                  {crop.name}
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
