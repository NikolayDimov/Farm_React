import React, { useEffect } from 'react';
import authHeader from '../../../../services/authHeader';
import { Crop } from "./interface";
import { ListContainer, ListHeader, ListItem, List } from '../../../common/ListStyles';

const BASE_URL = "http://localhost:3000";



interface CropListProps {
  crops: Crop[];
  setCrops: React.Dispatch<React.SetStateAction<Crop[]>>;
}

const CropList: React.FC<CropListProps> = ({ crops, setCrops }) => {

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const authHeaders = authHeader();
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
        };

        const response = await fetch(`${BASE_URL}/crop`, {
          method: 'GET',
          headers,
        });

        if (response.ok) {
          const cropsData = await response.json();
          
          setCrops(cropsData.data);
        } else {
          console.error('Failed to fetch crops from the database');
        }
      } catch (error) {
        console.error('Error fetching crops:', error);
      }
    };

    fetchCrops();
  }, [setCrops]);

  return (
    <ListContainer>
      <ListHeader>Crop List</ListHeader>
      <List>
      {crops.map((crop) => (
        <ListItem key={crop.id}>
          <strong>Name:</strong> {crop.name}
        </ListItem>
      ))}
       </List>
    </ListContainer>
  );
};

export default CropList;
