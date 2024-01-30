import React, { useState, useEffect } from 'react';
import { Field } from './Field.static';
// import MapContainer from '../MapContainer';
import FieldList from './FieldList';
import AddField from './AddField';


const FieldComponent: React.FC<{ coordinates: number[][] }> = ({ coordinates }) => {
  const [fields, setFields] = useState<Field[]>([]);

  const handleFieldAdded = (newField: Field) => {
    console.log('New field added:', newField);
    setFields((prevFields) => [...prevFields, newField]);
  };
  

  useEffect(() => {
    if (coordinates.length > 0) {
      console.log('Save coordinates to field boundary:', coordinates);
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
