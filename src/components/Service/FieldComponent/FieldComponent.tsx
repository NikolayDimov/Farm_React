import { useState } from 'react'
import { Field } from './interface';
import FieldList from './FieldList';
import AddField from './AddField';



const FieldComponent: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([]);

  const handleFieldAdded = (newField: Field) => {
    setFields((prevFields) => [...prevFields, newField]);
  };

  console.log('componen', fields);
  
  return (
    <>
      <AddField onFieldAdded={handleFieldAdded} />
      <FieldList fields={fields} setFields={setFields} />
    </>
  );
};

export default FieldComponent;
