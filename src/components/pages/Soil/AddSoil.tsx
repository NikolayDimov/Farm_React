import React, { useState, FormEvent } from 'react';
import { Soil } from './Soil.static';
import { apiSoil } from '../../../services/apiSoil';

interface AddSoilProps {
  fetchSoils: () => void;
}


const AddSoil: React.FC<AddSoilProps> = ({ fetchSoils }) => {
  const [soilName, setSoilName] = useState('');
  const [loading, setLoading] = useState(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSoilName(e.target.value);
  };

  async function createSoil(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await apiSoil.createSoil(soilName);
      // console.log(response)

      if (response.ok) {
        setSoilName('');
        fetchSoils(); 
   

      } else {
        console.error('Failed to create a new soil in the database');
      }
    } catch (error) {
      console.error('Error creating a new soil:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3>Add a New Soil</h3>
      <form onSubmit={createSoil}>
        <label>Soil Name:</label>
        <input type="text" value={soilName} onChange={changeHandler} />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding Soil...' : 'Add Soil'}
        </button>
      </form>
    </div>
  );
};

export default AddSoil;
