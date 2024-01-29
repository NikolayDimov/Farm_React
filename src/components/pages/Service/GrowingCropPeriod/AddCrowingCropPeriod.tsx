import React, { useState, useEffect } from 'react';
import authHeader from '../../../../services/authHeader';
import { GrowingCropPeriod } from "./GrowingCropPeriod.static";
import { Field } from './GrowingCropPeriod.static';
import { Crop } from './GrowingCropPeriod.static';

const BASE_URL = "http://localhost:3000";

interface AddGrowingCropPeriodProps {
  onGrowingCropPeriodAdded: (newGrowingCropPeriod: GrowingCropPeriod) => void;
  fields: Field[];
  crops: Crop[];
}

const AddGrowingCropPeriod: React.FC<AddGrowingCropPeriodProps> = ({ onGrowingCropPeriodAdded }) => {
  const [newGrowingCropPeriodFieldId, setNewGrowingCropPeriodFieldId] = useState('');
  const [fields, setFields] = useState<Field[]>([]);
  const [newGrowingCropPeriodCropId, setNewGrowingCropPeriodCropId] = useState('');
  const [crops, setCrops] = useState<Crop[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const authHeaders = authHeader();
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
        };

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
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
      
    };
    
    fetchFields();
  }, []);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const authHeaders = authHeader();
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
        };

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
        console.error('Error fetching crops:', error);
      }
      
    };
    
    fetchCrops();
  }, []);
  
  const handleAddGrowingCropPeriod = async () => {
    try {
      const authHeaders = authHeader();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
      };

      const response = await fetch(`${BASE_URL}/growingCropPeriod`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ 
          fieldId: newGrowingCropPeriodFieldId,
          cropId: newGrowingCropPeriodCropId,
        }),
      });

      if (response.ok) {
        const newGrowingCropPeriod: GrowingCropPeriod = {
          id: 'temporary-id-' + Date.now(),
          fieldId: newGrowingCropPeriodFieldId,
          cropId: newGrowingCropPeriodCropId
        };

        onGrowingCropPeriodAdded(newGrowingCropPeriod);
        setNewGrowingCropPeriodFieldId('');
        setNewGrowingCropPeriodCropId('');
        setErrorMessage('');
      } else {
        console.error('Failed to create a new GrowingCropPeriod in the database');
      }
    } catch (error) {
      console.error('Error creating a new GrowingCropPeriod:', error);
    }
  };

  return (
    <div>
      <h3>Add a New GrowingCropPeriod</h3>
      <label>Field Name:</label>
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
      <label>Crop Name:</label>
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
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={handleAddGrowingCropPeriod}>Create GrowingCropPeriod</button>
    </div>
  );
};

export default AddGrowingCropPeriod;
