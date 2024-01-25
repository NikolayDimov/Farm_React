// FarmList.tsx
import React from 'react';
import { Farm } from './profile-types';

interface FarmListProps {
  farms: Farm[];
}

const FarmList: React.FC<FarmListProps> = ({ farms }) => {
  return (
    <ul>
      {farms.map((farm) => (
        <li key={farm.id}>
          {/* Render farm details here */}
          <p>Farm Name: {farm.name}</p>
          <p>Location: {farm.location.coordinates.join(', ')}</p>
        </li>
      ))}
    </ul>
  );
};

export default FarmList;
