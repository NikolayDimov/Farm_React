import React, { useEffect } from 'react';
import { Soil } from "./Soil.static";
import { apiSoil } from './apiSoil';
import { ListContainer, ListHeader, List, ListItem } from '../../../common/ListStyles';

interface SoilListProps {
  soils: Soil[]; // Make soils optional
  setSoils: React.Dispatch<React.SetStateAction<Soil[]>>;
}

const SoilList: React.FC<SoilListProps> = ({ soils, setSoils }) => {
  useEffect(() => {
    const fetchSoils = async () => {
      try {
        const soilData = await apiSoil.fetchSoils();
        setSoils(soilData.data); 
      } catch (error) {
        console.error('Error in fetching soils', error);
      }
    };

    fetchSoils();
  }, [setSoils]);

  return (
    <ListContainer>
      <ListHeader>Soil List</ListHeader>
      <List>
        {Array.isArray(soils) && soils.length > 0 ? (
          soils.map((soil) => (
            <ListItem key={soil.id}>{soil.name}</ListItem>
          ))
        ) : (
          <ListItem>No soils available</ListItem>
        )}
      </List>
    </ListContainer>
  );
};

export default SoilList;
