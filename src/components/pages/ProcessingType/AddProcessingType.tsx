import React, { useState, FormEvent } from 'react';
import { ProcessingType } from "./ProcessingType.static";
import { apiProcessingType } from '../../../services/apiProcessingType';

interface AddProcessingTypeProps {
  fetchProcessingTypes: () => void;
}

const AddProcessingType: React.FC<AddProcessingTypeProps> = ({ fetchProcessingTypes }) => {
  const [processingTypeName, setProcessingTypeName] = useState('');
  const [loading, setLoading] = useState(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProcessingTypeName(e.target.value);
  };

  async function createProcessingType(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await apiProcessingType.createProcessingType(processingTypeName);

      if (response.ok) {
        setProcessingTypeName('');
        fetchProcessingTypes(); 

      } else {
        console.error('Failed to create a new ProcessingType in the database');
      }
    } catch (error) {
      console.error('Error creating a new ProcessingType:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3>Add a New ProcessingType</h3>
      <form onSubmit={createProcessingType}>
        <label>ProcessingType Name:</label>
        <input type="text" value={processingTypeName} onChange={changeHandler} />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding ProcessingType...' : 'Add ProcessingType'}
        </button>
      </form>
    </div>
  );
};

export default AddProcessingType;
