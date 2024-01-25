// FarmList.tsx
import React, { useEffect } from 'react';
import { Farm } from './profile-types';
import authHeader from '../../services/authHeader';
const BASE_URL = "http://localhost:3000";


// interface FarmListProps {
//   farms: Farm[];  
//   onFarmLocationClick: (farm: Farm) => void;
// }

interface FarmListProps {
  farms: Farm[];
  setFarms: React.Dispatch<React.SetStateAction<Farm[]>>;
}

const FarmList: React.FC<FarmListProps> = ({ farms, setFarms }) => {

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const authHeaders = authHeader();
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
        };
        const response = await fetch(`${BASE_URL}/farm`, {
          method: 'GET',
          headers,
        });

        if (response.ok) {
          const farmsData = await response.json();
          setFarms(farmsData.data);
        } else {
          console.error('Failed to fetch the list of farms');
        }
      } catch (error) {
        console.error('Error fetching farms:', error);
      }
    };

    fetchFarms();
  }, [setFarms]); 

 

  console.log(farms)
  return (
    <div>
      <h3>Farm List</h3>
      <ul>
        {farms.map((farm) => (
          <li key={farm.id}>
            <p>Farm Name: {farm.name}</p>
            <p>Location: {farm.location.coordinates.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FarmList;
