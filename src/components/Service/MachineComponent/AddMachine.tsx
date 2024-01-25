// AddMachine.tsx
import React, { useState, useEffect } from 'react';
import authHeader from '../../../services/authHeader';
import { Machine } from "./interface";
import { Farm } from './interface';

const BASE_URL = "http://localhost:3000";

interface AddMachineProps {
  onMachineAdded: (newMachine: Machine) => void;
}

const AddMachine: React.FC<AddMachineProps> = ({ onMachineAdded }) => {
  const [newMachineBrand, setNewMachineBrand] = useState('');
  const [newMachineModel, setNewMachineModel] = useState('');
  const [newMachineRegNumber, setNewMachineRegNumber] = useState('');
  const [newMachineFarmId, setNewMachineFarmId] = useState('');
  const [farms, setFarms] = useState<Farm[]>([]);
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
  
  const handleAddMachine = async () => {
    try {
      const authHeaders = authHeader();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
      };

      // Now you can create the machine
      const response = await fetch(`${BASE_URL}/machine`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ 
          brand: newMachineBrand, 
          model: newMachineModel, 
          registerNumber: newMachineRegNumber, 
          farmId: newMachineFarmId
        }),
      });

      if (response.ok) {
        const newMachine: Machine = {
          id: 'temporary-id-' + Date.now(),
          brand: newMachineBrand, 
          model: newMachineModel, 
          registerNumber: newMachineRegNumber, 
          farmId: newMachineFarmId
        };

        onMachineAdded(newMachine);
        setNewMachineBrand('');
        setNewMachineModel('');
        setNewMachineRegNumber('');
        setNewMachineFarmId('');
        setErrorMessage('');
      } else {
        console.error('Failed to create a new machine in the database');
      }
    } catch (error) {
      console.error('Error creating a new machine:', error);
    }
  };

  return (
    <div>
      <h3>Add a New Machine</h3>
      <label>Machine Brand:</label>
      <input type="text" value={newMachineBrand} onChange={(e) => setNewMachineBrand(e.target.value)} />
      <label>Machine Model:</label>
      <input type="text" value={newMachineModel} onChange={(e) => setNewMachineModel(e.target.value)} />
      <label>Machine Register Number:</label>
      <input type="text" value={newMachineRegNumber} onChange={(e) => setNewMachineRegNumber(e.target.value)} />
      <label>Farm Name:</label>
      <select
        value={newMachineFarmId}
        onChange={(e) => setNewMachineFarmId(e.target.value)}
      >
        <option value="">Select Farm</option>
        {farms.map((farm) => (
          <option key={farm.id} value={farm.id}>
            {farm.name}
          </option>
        ))}
      </select>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={handleAddMachine}>Create Machine</button>
    </div>
  );
};

export default AddMachine;
