import React, { useState, useEffect, FormEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { apiProcessing } from '../../../services/apiProcessing';
import { Processing } from './Processing.static';
import { ProcessingType } from '../ProcessingType/ProcessingType.static';
import { GrowingCropPeriod } from '../GrowingCropPeriod/GrowingCropPeriod.static';
import { Machine } from '../Machine/Machine.static';
import { Crop } from '../Crop/Crop.static';
import { Field } from '../Field/Field.static';
import { apiField } from '../../../services/apiField';
import { apiProcessingType } from '../../../services/apiProcessingType';
import { apiGrowingCropPeriod } from '../../../services/apiGrowingCropPeriod';
import { apiMachine } from '../../../services/apiMachine';
import { apiCrop } from '../../../services/apiCrop';

interface AddProcessingProps {
  fetchProcessings: () => void;
}

// Assuming your apiGrowingCropPeriod type looks like this:
type ApiGrowingCropPeriod = {
  fetchGCP: () => Promise<any>;
  createGrowingCropPeriod: (newGrowingCropPeriodData: GrowingCropPeriod) => Promise<Response>;
  // ... other methods or properties
};

// Extend the type definition to include createGrowingCropPeriod
type ExtendedApiGrowingCropPeriod = ApiGrowingCropPeriod & {
  createGrowingCropPeriod: (newGrowingCropPeriodData: GrowingCropPeriod) => Promise<Response>;
};

const AddProcessing: React.FC<AddProcessingProps> = ({ fetchProcessings }) => {
  const [createdValues, setCreatedValues] = useState({
    newProcessingDate: new Date(),
    processingTypeId: '',
    fieldId: '',
    cropId: '',
    machineId: '',
    growingCropPeriodId: '',
  });
  const [currentGrowingCropPeriod, setCurrentGrowingCropPeriod] = useState<GrowingCropPeriod | undefined>();

  const [processingTypes, setProcessingTypes] = useState<ProcessingType[]>([]);
  const [growingCropPeriods, setGrowingCropPeriods] = useState<GrowingCropPeriod[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    const fetchProcessingTypes = async () => {
      try {
        const processingTypesData = await apiProcessingType.fetchProcessingTypes();
        setProcessingTypes(processingTypesData.data);
      } catch (error) {
        console.error('Error fetching ProcessingType:', error);
      }
    };
    fetchProcessingTypes();
  }, []);

  useEffect(() => {
    const fetchGrowingCropPeriods = async () => {
      try {
        const growingCropPeriodsData = await apiGrowingCropPeriod.fetchGCP();
        setGrowingCropPeriods(growingCropPeriodsData.data);
      } catch (error) {
        console.error('Error fetching growingCropPeriod:', error);
      }
    };
    fetchGrowingCropPeriods();
  }, []);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const machinesData = await apiMachine.fetchMachines();
        setMachines(machinesData.data);
      } catch (error) {
        console.error('Error fetching machines:', error);
      }
    };
    fetchMachines();
  }, []);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const fieldsData = await apiField.fetchFields();
        setFields(fieldsData.data);
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    };
    fetchFields();
  }, []);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const cropsData = await apiCrop.fetchCrops();
        setCrops(cropsData.data);
      } catch (error) {
        console.error('Error fetching crops:', error);
      }
    };
    fetchCrops();
  }, []);


  

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCreatedValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };


 async function createProcessing (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    try {
      if (
        !createdValues.newProcessingDate ||
        !createdValues.processingTypeId ||
        !createdValues.fieldId ||
        !createdValues.cropId ||
        !createdValues.machineId
      ) {
        setErrorMessage('Fields are required.');
        return;
      }
  
      setLoading(true);

      let growingCropPeriodId: string | undefined;
      // Check if there is a current GrowingCropPeriod and it matches the selected field and crop
      if (
        currentGrowingCropPeriod &&
        currentGrowingCropPeriod.fieldId === createdValues.fieldId &&
        currentGrowingCropPeriod.cropId === createdValues.cropId
      ) {
        growingCropPeriodId = currentGrowingCropPeriod.id;
      } else {
        // Create a new GrowingCropPeriod entry
        const newGrowingCropPeriodResponse = await apiGrowingCropPeriod.createGrowingCropPeriod({
          fieldId: createdValues.fieldId,
          cropId: createdValues.cropId,
        });

        if (!newGrowingCropPeriodResponse.ok) {
          console.error('Failed to create a new growingCropPeriod in the database');
          return;
        }

        const newGrowingCropPeriodData = await newGrowingCropPeriodResponse.json();
        growingCropPeriodId = newGrowingCropPeriodData.id;

        // Update the currentGrowingCropPeriod state with the newly created one
        setCurrentGrowingCropPeriod(newGrowingCropPeriodData);
      }
      
  
      // Create a new Processing entry
      const newProcessingData: Processing = {
        date: createdValues.newProcessingDate,
        processingTypeId: createdValues.processingTypeId,
        growingCropPeriodId: growingCropPeriodId || '',
        machineId: createdValues.machineId,
      };
  
      const response: Response = await apiProcessing.createProcessing(newProcessingData);
  
      if (response.ok) {
        setCreatedValues({
          newProcessingDate: new Date(),
          processingTypeId: '',
          fieldId: '',
          cropId: '',
          machineId: '',
          growingCropPeriodId: '',
        });
        fetchProcessings();
      } else {
        const responseBody = await response.json();
        console.error('Failed to create a new processing in the database:', responseBody);
        setErrorMessage('Failed to create a new processing in the database');
      }
    } catch (error) {
      console.error('Failed to create a new processing in the database:', error);
      setErrorMessage('Failed to create a new processing in the database');
    } finally {
      setLoading(false);
    }
  };
  


  // const handleAddProcessing = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  
  //   try {
  //     if (
  //       !createdValues.newProcessingDate ||
  //       !createdValues.processingTypeId ||
  //       !createdValues.fieldId ||
  //       !createdValues.cropId ||
  //       !createdValues.machineId
  //     ) {
  //       setErrorMessage('Fields are required.');
  //       return;
  //     }
  
  //     setLoading(true);
  
  //     // Create a new GrowingCropPeriod entry
  //     const newGrowingCropPeriodResponse = await apiGrowingCropPeriod.createGrowingCropPeriod({
  //       fieldId: createdValues.fieldId,
  //       cropId: createdValues.cropId,
  //       // Add any other necessary fields for GrowingCropPeriod
  //     });
  
  //     if (!newGrowingCropPeriodResponse.ok) {
  //       console.error('Failed to create a new growingCropPeriod in the database');
  //       console.error('Response status:', newGrowingCropPeriodResponse.status);
  //       console.error('Response status text:', newGrowingCropPeriodResponse.statusText);
  //       const responseText = await newGrowingCropPeriodResponse.text();
  //       console.error('Response text:', responseText);
  //       setErrorMessage('Failed to create a new growingCropPeriod in the database');
  //       return;
  //     }
  
  //     const newGrowingCropPeriodData = await newGrowingCropPeriodResponse.json();
  
  //     // Update createdValues with the new GrowingCropPeriodId
  //     setCreatedValues((state) => ({ ...state, growingCropPeriodId: newGrowingCropPeriodData.id }));
  
  //     // Create a new Processing entry
  //     const newProcessingData: Processing = {
  //       date: createdValues.newProcessingDate,
  //       processingTypeId: createdValues.processingTypeId,
  //       growingCropPeriodId: newGrowingCropPeriodData.id,
  //       machineId: createdValues.machineId,
  //     };
  
  //     const response: Response = await apiProcessing.createProcessing(newProcessingData);
  
  //     if (response.ok) {
  //       const newProcessing: Processing = {
  //         date: createdValues.newProcessingDate,
  //         processingTypeId: createdValues.processingTypeId,
  //         growingCropPeriodId: newGrowingCropPeriodData.id,
  //         machineId: createdValues.machineId,
  //       };
  
  //       onProcessingAdded(newProcessing);
  
  //       setCreatedValues({
  //         newProcessingDate: new Date(),
  //         processingTypeId: '',
  //         fieldId: '',
  //         cropId: '',
  //         machineId: '',
  //         growingCropPeriodId: '',
  //       });
  
  //       setErrorMessage('');
  //     } else {
  //       console.error('Failed to create a new processing in the database');
  //       console.error('Response status:', response.status);
  //       console.error('Response status text:', response.statusText);
  //       const responseText = await response.text();
  //       console.error('Response text:', responseText);
  //       setErrorMessage('Failed to create a new processing in the database');
  //     }
  //   } catch (error) {
  //     console.error('Failed to create a new processing in the database:', error);
  //     setErrorMessage('Failed to create a new processing in the database');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  

  return (
    <div>
      <h3>Add a New Processing</h3>
      <form onSubmit={createProcessing}>
        <label>Processing date:</label>
        <DatePicker selected={createdValues.newProcessingDate} onChange={(date: Date) => setCreatedValues((state) => ({ ...state, newProcessingDate: date }))} />

        <label>Processing Type:</label>
        <select
          name="processingTypeId"
          value={createdValues.processingTypeId}
          onChange={changeHandler}
        >
          <option key="" value="">Select Processing Type</option>
          {processingTypes.map((processingType) => (
            <option key={processingType.id} value={processingType.id}>
              {processingType.name}
            </option>
          ))}
        </select>

        <label>Field:</label>
        <select
          name="fieldId"
          value={createdValues.fieldId}
          onChange={changeHandler}
        >
          <option key="" value="">Select Field</option>
          {fields.map((field) => (
            <option key={field.id} value={field.id}>
              {field.name}
            </option>
          ))}
        </select>

        <label>Crop:</label>
        <select
          name="cropId"
          value={createdValues.cropId}
          onChange={changeHandler}
        >
          <option key="" value="">Select Crop</option>
          {crops.map((crop) => (
            <option key={crop.id} value={crop.id}>
              {crop.name}
            </option>
          ))}
        </select>

        <label>Machine:</label>
        <select
          name="machineId"
          value={createdValues.machineId}
          onChange={changeHandler}
        >
          <option key="" value="">Select Machine</option>
          {machines.map((machine) => (
            <option key={machine.id} value={machine.id}>
              {machine.brand}, {machine.model}, {machine.registerNumber}
            </option>
          ))}
        </select>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Processing...' : 'Create processing'}
        </button>
      </form>
    </div>
  );
};

export default AddProcessing;
