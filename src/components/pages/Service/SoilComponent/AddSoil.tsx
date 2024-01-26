import React, { useState } from 'react';
import authHeader from '../../../../services/authHeader';
import {Soil} from "./interface";

const BASE_URL = "http://localhost:3000";


interface AddSoilProps {
  onSoilAdded: (newSoil: Soil) => void;
}


const AddSoil: React.FC<AddSoilProps> = ({ onSoilAdded }) => {
  const [newSoilName, setNewSoilName] = useState('');

  const handleAddSoil = async () => {
    try {
      const authHeaders = authHeader();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
      };

      const response = await fetch(`${BASE_URL}/soil`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ name: newSoilName }),
      });

      if (response.ok) {
        const newSoil: Soil = {
          id: 'temporary-id-' + Date.now(),
          name: newSoilName,
        };

        onSoilAdded(newSoil);
        setNewSoilName('');
      } else {
        console.error('Failed to create a new soil in the database');
      }
    } catch (error) {
      console.error('Error creating a new soil:', error);
    }
  };

  return (
    <div>
      <h3>Add a New Soil</h3>
      <label>Soil Name:</label>
      <input type="text" value={newSoilName} onChange={(e) => setNewSoilName(e.target.value)} />
      <button onClick={handleAddSoil}>Add Soil</button>
    </div>
  );
};

export default AddSoil;
