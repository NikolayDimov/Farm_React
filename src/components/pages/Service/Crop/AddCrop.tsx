import React, { useState, FormEvent } from 'react';
import { Crop } from "./Crop.static";
import { apiCrop } from './apiCrop';

interface AddSoilProps {
  onCropAdded: (newSoil: Crop) => void;
}

const AddSoil: React.FC<AddSoilProps> = ({ onCropAdded }) => {
  const [cropName, setCropName] = useState('');
  const [loading, setLoading] = useState(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCropName(e.target.value);
  };

  async function createCrop(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await apiCrop.createCrop(cropName);
      console.log(response)

      if (response.ok) {
        const newSoil: Crop = {
          id: 'temporary-id-' + Date.now(),
          name: cropName,
        };

        onCropAdded(newSoil);
        setCropName('');
      } else {
        console.error('Failed to create a new Crop in the database');
      }
    } catch (error) {
      console.error('Error creating a new Crop:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3>Add a New Crop</h3>
      <form onSubmit={createCrop}>
        <label>Crop Name:</label>
        <input type="text" value={cropName} onChange={changeHandler} />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding Crop...' : 'Add Crop'}
        </button>
      </form>
    </div>
  );
};

export default AddSoil;
