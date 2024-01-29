import React, { useState } from 'react';
import authHeader from '../../../../services/authHeader';
import { Crop } from "./Crop.static";

const BASE_URL = "http://localhost:3000";


interface AddCropProps {
  onCropAdded: (newCrop: Crop) => void;
}


const AddCrop: React.FC<AddCropProps> = ({ onCropAdded }) => {
  const [newCropName, setNewCropName] = useState('');

  const handleAddCrop = async () => {
    try {
      const authHeaders = authHeader();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
      };

      const response = await fetch(`${BASE_URL}/crop`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ name: newCropName }),
      });

      if (response.ok) {
        const newCrop: Crop = {
          id: 'temporary-id-' + Date.now(),
          name: newCropName,
        };

        onCropAdded(newCrop);
        setNewCropName('');
      } else {
        console.error('Failed to create a new crop in the database');
      }
    } catch (error) {
      console.error('Error creating a new crop:', error);
    }
  };

  return (
    <div>
      <h3>Add a New Crop</h3>
      <label>Crop Name:</label>
      <input type="text" value={newCropName} onChange={(e) => setNewCropName(e.target.value)} />
      <button onClick={handleAddCrop}>Add Crop</button>
    </div>
  );
};

export default AddCrop;
