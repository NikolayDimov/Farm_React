import React, { useEffect } from 'react';
import { Crop } from "./Crop.static";
import { apiCrop } from './apiCrop';
import { ListContainer, ListHeader, List, ListItem } from '../../../common/ListStyles';

interface CropListProps {
  crops: Crop[]; 
  setCrops: React.Dispatch<React.SetStateAction<Crop[]>>;
}

const CropList: React.FC<CropListProps> = ({ crops, setCrops }) => {
  
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const cropData = await apiCrop.fetchCrops();
        setCrops(cropData.data); 
      } catch (error) {
        console.error('Error in fetching crops', error);
      }
    };

    fetchCrops();
  }, [setCrops]);

  return (
    <ListContainer>
      <ListHeader>Crop List</ListHeader>
      <List>
        {Array.isArray(crops) && crops.length > 0 ? (
          crops.map((crop) => (
            <ListItem key={crop.id}>{crop.name}</ListItem>
          ))
        ) : (
          <ListItem>No crops available</ListItem>
        )}
      </List>
    </ListContainer>
  );
};

export default CropList;
