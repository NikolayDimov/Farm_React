// MachineList.tsx
import React, { useEffect, useState } from 'react';
import { Field } from "./Field.static";
import { Farm } from '../../Profile/Farm/Farm.static';
import { Soil } from '../Soil/Soil.static';
import { ListContainer, ListHeader, ListItem, List } from '../../../common/ListStyles';
import { apiField } from './apiField';
import { apiFarm } from '../../Profile/Farm/apiFarm';
import { apiSoil } from '../Soil/apiSoil';

interface FieldListProps {
  fields: Field[];
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
}

const FieldList: React.FC<FieldListProps> = ({ fields, setFields }) => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [soils, setSoils] = useState<Soil[]>([]);
  const [loading, setLoading] = useState(true);


  const findFarmName = (farmId: string): string => {
    const farm = farms.find((farm) => farm.id === farmId);
    return farm ? farm.name : 'Unknown Farm';
  };

  const findSoilName = (soilId: string): string => {
    const soil = soils.find((soil) => soil.id === soilId);
    return soil ? soil.name : 'Unknown Farm';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fieldsData = await apiField.fetchFields();
        const farmsData = await apiFarm.fetchFarms();
        const soilsData = await apiSoil.fetchSoils();

        setFields(fieldsData.data);
        setFarms(farmsData.data);
        setSoils(soilsData.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setFields]);


  if (loading) {
    return <p>Loading machines...</p>;
  }

  return (
    <ListContainer>
      <ListHeader>Field List</ListHeader>
      <List>
        {Array.isArray(fields) ? (
          fields.map((field) => (
            <ListItem key={field.id}>
              <strong>Name:</strong> {field.name} |&nbsp;
              <strong>Farm:</strong> {findFarmName(field.farmId)} |&nbsp;
              <strong>Soil:</strong> {findSoilName(field.soilId)}
            </ListItem>
          ))
        ) : (
          <p>No machines available</p>
        )}
      </List>
    </ListContainer>
  );
};

export default FieldList;
