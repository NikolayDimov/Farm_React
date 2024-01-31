import React, { useState, useEffect, FormEvent } from 'react';
import { apiMachine } from '../../../services/apiMachine';
import { Farm } from '../Farm/Farm.static';
import { apiFarm } from '../../../services/apiFarm';

interface AddMachineProps {
  fetchMachines: () => void;
}

const AddMachine: React.FC<AddMachineProps> = ({ fetchMachines }) => {
  const [createdValues, setCreatedValues] = useState({
    newMachineBrand: '',
    newMachineModel: '',
    newMachineRegNumber: '',
    newMachineFarmId: '',
  });

  const [farms, setFarms] = useState<Farm[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);

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


  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCreatedValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  async function createMachine (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (!createdValues.newMachineFarmId) {
        setErrorMessage('Farm is required.');
        return;
      }

      setLoading(true);

      const newMachineData = {
        brand: createdValues.newMachineBrand,
        model: createdValues.newMachineModel,
        registerNumber: createdValues.newMachineRegNumber,
        farmId: createdValues.newMachineFarmId,
      };

      const response = await apiMachine.createMachine(newMachineData);

      if (response.ok) {
        setCreatedValues({
          newMachineBrand: '',
          newMachineModel: '',
          newMachineRegNumber: '',
          newMachineFarmId: '',
        });
        fetchMachines();
      } else {
        const responseBody = await response.json();
        console.error('Failed to create a new machine in the database:', responseBody);
        setErrorMessage('Failed to create a new machine in the database');
      }
    } catch (error) {
      console.error('Failed to create a new machine in the database:', error);
      setErrorMessage('Failed to create a new machine in the database');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Add a New Machine</h3>
      <form onSubmit={createMachine}>
        <label>Machine Brand:</label>
        <input
          type="text"
          name="newMachineBrand"
          value={createdValues.newMachineBrand}
          onChange={changeHandler}
        />
        <label>Machine Model:</label>
        <input
          type="text"
          name="newMachineModel"
          value={createdValues.newMachineModel}
          onChange={changeHandler}
        />
        <label>Machine Register Number:</label>
        <input
          type="text"
          name="newMachineRegNumber"
          value={createdValues.newMachineRegNumber}
          onChange={changeHandler}
        />
        <label>Farm:</label>
        <select
          name="newMachineFarmId"
          value={createdValues.newMachineFarmId}
          onChange={changeHandler}
        >
          <option value="">Select Farm</option>
          {farms.map((farm) => (
            <option key={farm.id} value={farm.id}>
              {farm.name}
            </option>
          ))}
        </select>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Machine...' : 'Create Machine'}
        </button>
      </form>

     
    </div>
  );
};

export default AddMachine;
