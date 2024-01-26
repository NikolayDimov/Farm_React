// FieldComponent.tsx
import React, { useState, useEffect } from 'react';
import { Field } from './interface';
import MapContainer from '../MapContainer';
import FieldList from './FieldList';
import AddField from './AddField';


const FieldComponent: React.FC<{ coordinates: number[][] }> = ({ coordinates }) => {
  const [fields, setFields] = useState<Field[]>([]);

  const handleFieldAdded = (newField: Field) => {
    setFields((prevFields) => [...prevFields, newField]);
  };

  useEffect(() => {
    // Check if there are coordinates and handle saving them to the field boundary
    if (coordinates.length > 0) {
      console.log('Save coordinates to field boundary:', coordinates);
      // Perform the logic to save coordinates to the field boundary
    }
  }, [coordinates]);

  return (
    <>
      {/* <MapContainer onSelectLocation={() => {}} outlinedCoordinates={coordinates} /> */}
      <AddField onFieldAdded={handleFieldAdded} />
      <FieldList fields={fields} setFields={setFields} />
    </>
  );
};



export default FieldComponent;
