import React, { useState, useEffect, FormEvent } from 'react';
import { apiField } from '../../../services/apiField';
import { Farm } from '../Farm/Farm.static';
import { Soil } from '../Soil/Soil.static';
import MapContainer from '../../BaseLayout/MapContainer';
import { apiFarm } from '../../../services/apiFarm';
import { apiSoil } from '../../../services/apiSoil';

interface AddFieldProps {
  fetchFields: () => void;
}

const AddField: React.FC<AddFieldProps> = ({ fetchFields }) => {
  const [createdValues, setCreatedValues] = useState({
    newFieldName: '',
    newFarmId: '',
    newSoilId: '',
  });

  const [farms, setFarms] = useState<Farm[]>([]);
  const [soils, setSoils] = useState<Soil[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const [outlinedCoordinates, setOutlinedCoordinates] = useState<number[][][]>([[]]);

  const handleSelectLocation = (coordinates: number[][][]) => {
    console.log('Newly outlined coordinates:', coordinates);
    setOutlinedCoordinates(coordinates);
  };

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const farmsData = await apiFarm.fetchFarms(); 
        setFarms(farmsData.data);
      } catch (error) {
        console.error('Error fetching farms:', error);
      }
    };
    fetchFarms();
  }, []);

  useEffect(() => {
    const fetchSoils = async () => {
      try {
        const soilsData = await apiSoil.fetchSoils(); 
        setSoils(soilsData.data);
      } catch (error) {
        console.error('Error fetching farms:', error);
      }
    };
    fetchSoils();
  }, []);

  
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCreatedValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  async function createField (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (outlinedCoordinates.length === 0) {
        setErrorMessage('Please outline the field boundaries.');
        return;
      }

      if (!createdValues.newFarmId || !createdValues.newSoilId) {
        setErrorMessage('Farm and Soil are required.');
        return;
      }

      setLoading(true);

      const newFieldData = {
        name: createdValues.newFieldName,
        boundary: {
          type: 'Polygon',
          coordinates: outlinedCoordinates,
        },
        farmId: createdValues.newFarmId,
        soilId: createdValues.newSoilId,
      };

      const response = await apiField.createField(newFieldData);

      if (response.ok) {
        setCreatedValues({
          newFieldName: '',
          newFarmId: '',
          newSoilId: '',
        });
        fetchFields();
      } else {
        const responseBody = await response.json();
        console.error('Failed to create a new field in the database:', responseBody);
        setErrorMessage('Failed to create a new field in the database');
      }
    } catch (error) {
      console.error('Failed to create a new field in the database:', error);
      setErrorMessage('Failed to create a new field in the database');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Add a New Field</h3>
      <form onSubmit={createField}>
        <label>Field name:</label>
        <input
          type="text"
          name="newFieldName"
          value={createdValues.newFieldName}
          onChange={changeHandler}
        />
        <label>Farm:</label>
        <select
          name="newFarmId"
          value={createdValues.newFarmId}
          onChange={changeHandler}
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
          name="newSoilId"
          value={createdValues.newSoilId}
          onChange={changeHandler}
        >
          <option value="">Select Soil</option>
          {soils.map((soil) => (
            <option key={soil.id} value={soil.id}>
              {soil.name}
            </option>
          ))}
        </select>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Field...' : 'Create Field'}
        </button>
      </form>

      <MapContainer onSelectLocation={handleSelectLocation}  />
    </div>
  );
};

export default AddField;