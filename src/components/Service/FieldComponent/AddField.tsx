import React, { useState, useEffect } from 'react';
import authHeader from '../../../services/authHeader';
import { Field } from "./interface";
import { Farm } from './interface';
import { Soil } from './interface';


const BASE_URL = "http://localhost:3000";

interface AddFieldProps {
  onFieldAdded: (newField: Field) => void;
}

const AddField: React.FC<AddFieldProps> = ({ onFieldAdded }) => {
  const [newFieldName, setNewFieldName] = useState('');
  const [newBoundary, setNewBoundary] = useState('');
  const [newFarmId, setNewFarmId] = useState('');
  const [newSoilId, setNewSoilId] = useState('');
  const [farms, setFarms] = useState<Farm[]>([]);
  const [soils, setSoils] = useState<Soil[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');


  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const authHeaders = authHeader();
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
        };

        const farmsResponse = await fetch(`${BASE_URL}/farm`, {
          method: 'GET',
          headers,
        });

        if (farmsResponse.ok) {
          const farmsData: { data: Farm[] } = await farmsResponse.json();
          setFarms(farmsData.data);
          
        } else {
          console.error('Failed to fetch farms from the database');
        }
      } catch (error) {
        console.error('Error fetching farms:', error);
      }
    };
    
    fetchFarms();
  }, []);

  useEffect(() => {
    const fetchSoils = async () => {
      try {
        const authHeaders = authHeader();
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
        };

        const soilsResponse = await fetch(`${BASE_URL}/soil`, {
          method: 'GET',
          headers,
        });

        if (soilsResponse.ok) {
          const soilsData: { data: Soil[] } = await soilsResponse.json();
          setSoils(soilsData.data);
          
        } else {
          console.error('Failed to fetch farms from the database');
        }
      } catch (error) {
        console.error('Error fetching farms:', error);
      }
    };
    
    fetchSoils();
  }, []);
  
  const handleAddField = async () => {
    try {
      const authHeaders = authHeader();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
      };

      const response = await fetch(`${BASE_URL}/field`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ 
          name: newFieldName, 
          boundary: newBoundary,
          farmId: newFarmId,
          soilId: newSoilId
        }),
      });

      if (response.ok) {
        const newField: Field = {
          id: 'temporary-id-' + Date.now(),
          name: newFieldName, 
          boundary: JSON.parse(newBoundary), 
          farmId: newFarmId,
          soilId: newSoilId
        };

        onFieldAdded(newField);
        setNewFieldName('');
        setNewBoundary('');
        setNewFarmId('');
        setNewSoilId('');
        setErrorMessage('');
      } else {
        console.error('Failed to create a new field in the database');
        console.error('Failed to create a new field in the database');
      console.error('Response status:', response.status);
      console.error('Response status text:', response.statusText);
      const responseText = await response.text();
      console.error('Response text:', responseText);
      }
    } catch (error) {
      console.error('Failed to create a new field in the database');
    
    }
  };

  return (
    <div>
      <h3>Add a New Field</h3>
      <label>Field name:</label>
      <input type="text" value={newFieldName} onChange={(e) => setNewFieldName(e.target.value)} />
      <label>Field Boubdary:</label>
      <input type="text" value={newBoundary} onChange={(e) => setNewBoundary(e.target.value)} />
      <label>Farm:</label>
      <select
        value={newFarmId}
        onChange={(e) => setNewFarmId(e.target.value)}
      >
        <option value="">Select Farm</option>
        {farms.map((farm) => (
          <option key={farm.id} value={farm.id}>
            {farm.name}
          </option>
        ))}
      </select>
      <label>Soil:</label>
      <select
        value={newSoilId}
        onChange={(e) => setNewSoilId(e.target.value)}
      >
        <option value="">Select Soil</option>
        {soils.map((soil) => (
          <option key={soil.id} value={soil.id}>
            {soil.name}
          </option>
        ))}
      </select>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={handleAddField}>Create Field</button>
    </div>
  );
};

export default AddField;
