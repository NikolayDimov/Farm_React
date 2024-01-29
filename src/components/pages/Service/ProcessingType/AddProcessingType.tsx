import React, { useState } from 'react';
import authHeader from '../../../../services/authHeader';
import { ProcessingType } from "./ProcessingType.static";

const BASE_URL = "http://localhost:3000";


interface AddProcessingTypeProps {
  onProcessingTypeAdded: (newProcessingType: ProcessingType) => void;
}


const AddProcessingType: React.FC<AddProcessingTypeProps> = ({ onProcessingTypeAdded }) => {
  const [newProcessingTypeName, setNewProcessingTypeName] = useState('');

  const handleAddProcessingType = async () => {
    try {
      const authHeaders = authHeader();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
      };

      const response = await fetch(`${BASE_URL}/processingType`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ name: newProcessingTypeName }),
      });

      if (response.ok) {
        const newProcessingType: ProcessingType = {
          id: 'temporary-id-' + Date.now(),
          name: newProcessingTypeName,
        };

        onProcessingTypeAdded(newProcessingType);
        setNewProcessingTypeName('');
      } else {
        console.error('Failed to create a new ProcessingType in the database');
      }
    } catch (error) {
      console.error('Error creating a new ProcessingType:', error);
    }
  };

  return (
    <div>
      <h3>Add a New Processing Type</h3>
      <label>Processing Type Name:</label>
      <input type="text" value={newProcessingTypeName} onChange={(e) => setNewProcessingTypeName(e.target.value)} />
      <button onClick={handleAddProcessingType}>Add Processing Type</button>
    </div>
  );
};

export default AddProcessingType;
