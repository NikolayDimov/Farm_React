import React, { useState } from 'react';
import { Farm } from './profile-types';

interface AddFarmFormProps {
  onFarmAdded: (newFarm: Farm) => void;
}

const AddFarmForm: React.FC<AddFarmFormProps> = ({ onFarmAdded }) => {
  const [newFarmName, setNewFarmName] = useState('');

  const handleAddFarm = () => {
    // Assuming you have a function to get the coordinates, replace this with your logic
    const newFarmCoordinates = [42.6977, 23.3219];
    
    const newFarm: Farm = {
      id: 'temporary-id-' + Date.now(),
      name: newFarmName,
      location: {
        type: 'Point', // Add the 'type' property
        coordinates: newFarmCoordinates,
      },
    };

    // Call the onFarmAdded prop with the newFarm object
    onFarmAdded(newFarm);

    // Optionally, you can clear the form or perform other actions after adding the farm
    setNewFarmName('');
  };

  return (
    <div>
      <h3>Add a New Farm</h3>
      <label>Farm Name:</label>
      <input
        type="text"
        value={newFarmName}
        onChange={(e) => setNewFarmName(e.target.value)}
      />
      <button onClick={handleAddFarm}>Add Farm</button>
    </div>
  );
};

export default AddFarmForm;