// FarmList.tsx
import React, { useEffect } from 'react';
import { Farm } from './Farm.static';
import { ListContainer, ListHeader, ListItem, List } from '../../../common/ListStyles';
import { apiFarm } from './apiFarm';


interface FarmListProps {
  farms: Farm[];
  setFarms: React.Dispatch<React.SetStateAction<Farm[]>>;
}

const FarmList: React.FC<FarmListProps> = ({ farms, setFarms }) => {

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const farmData = await apiFarm.fetchFarms();
        setFarms(farmData.data); 
      } catch (error) {
        console.error('Error in fetching farms', error);
      }
    };

    fetchFarms();
  }, [setFarms]);

 
  return (
    <ListContainer>
      <ListHeader>Farm List</ListHeader>
      <List>
      {Array.isArray(farms) && farms.length > 0 ? (
        farms.map((farm) => (
          <ListItem key={farm.id}>
            <p>Farm Name: {farm.name}</p>
            <p>Location: {farm.location.coordinates.join(', ')}</p>
          </ListItem>
        ))
      ) : (
        <ListItem>No farms available</ListItem>
      )}
      </List>
    </ListContainer>
  );
};

export default FarmList;
