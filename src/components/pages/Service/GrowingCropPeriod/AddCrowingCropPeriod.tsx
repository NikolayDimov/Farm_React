import React, { useState, useEffect, FormEvent } from 'react';
import { apiGrowingCropPeriod } from './apiGrowingCropPeriod';
import { Crop, GrowingCropPeriod, Field } from "./GrowingCropPeriod.static";
import { apiField } from '../Field/apiField';
import { apiCrop } from '../Crop/apiCrop';


interface AddGrowingCropPeriodProps {
  onGrowingCropPeriodAdded: (newGrowingCropPeriod: GrowingCropPeriod) => void;
}


const AddGrowingCropPeriod: React.FC<AddGrowingCropPeriodProps> = ({ onGrowingCropPeriodAdded }) => {
  const [createdValues, setCreatedValues] = useState({
    newFieldId: '',
    newCropId: '',
  });

  const [fields, setFields] = useState<Field[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchFields = async () => {
      try {
        const fieldsData = await apiField.fetchFields(); 
        setFields(fieldsData.data);
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    };
    fetchFields();
  }, []);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const cropsData = await apiCrop.fetchCrops(); 
        setCrops(cropsData.data);
      } catch (error) {
        console.error('Error fetching crops:', error);
      }
    };
    fetchCrops();
  }, []);

  
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCreatedValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleAddGrowingCropPeriod = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!createdValues.newFieldId || !createdValues.newCropId) {
        setErrorMessage('Field and Crop are required.');
        return;
      }

      setLoading(true);

      const newGrowingCropPeriodData: GrowingCropPeriod = {
        fieldId: createdValues.newFieldId,
        cropId: createdValues.newCropId,
      };

      const response = await apiGrowingCropPeriod.createGrowingCropPeriod(newGrowingCropPeriodData);

      if (response.ok) {
        const newGrowingCropPeriodId: GrowingCropPeriod = {
          fieldId: createdValues.newFieldId,
          cropId: createdValues.newCropId,
        };


        onGrowingCropPeriodAdded(newGrowingCropPeriodId);
        
        setCreatedValues({
          newFieldId: '',
          newCropId: '',
        });
        setErrorMessage('');
      } else {
        console.error('Failed to create a new gcp in the database');
        const responseText = await response.text();
        console.error('Response text:', responseText);
       
      }
    } catch (error) {
      console.error('Failed to create a new gcp in the database:', error);
      setErrorMessage('Failed to create a new gcp in the database');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Add a New GrowingCropPeriod</h3>
      <form onSubmit={handleAddGrowingCropPeriod}>
        <label>Field:</label>
        <select
          name="newFieldId"
          value={createdValues.newFieldId}
          onChange={changeHandler}
        >
          <option value="">Select Field</option>
          {fields.map((field) => (
            <option key={field.id} value={field.id}>
              {field.name}
            </option>
          ))}
        </select>
        <label>Crop:</label>
        <select
          name="newCropId"
          value={createdValues.newCropId}
          onChange={changeHandler}
        >
          <option value="">Select Soil</option>
          {crops.map((crop) => (
            <option key={crop.id} value={crop.id}>
              {crop.name}
            </option>
          ))}
        </select>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Creating GrowingCropPeriod...' : 'Create GrowingCropPeriod'}
        </button>
      </form>
    </div>
  );
};

export default AddGrowingCropPeriod;
