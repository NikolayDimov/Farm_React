// ProfilePage.tsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../common/Layout';
import MapContainer from './MapContainer';
import AddFarmForm from './AddFarmForm';
import FarmList from './FarmList';
import { Farm } from './profile-types';
import styled from 'styled-components';
import authHeader from "../../services/authHeader";


const BASE_URL = "http://localhost:3000";


// Style the MapContainer component
const StyledMapContainer = styled(MapContainer)`
  height: 600px;
`;

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState<number[]>([]);
  const [farms, setFarms] = useState<Farm[]>([]);

  const onSelectLocation = (coordinates: number[]) => {
    setSelectedLocation(coordinates);
  };

  const handleFarmAdded = async (newFarm: Farm) => {
    try {
      const authHeaders = authHeader();
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
        };

      // Assuming you have an API endpoint for creating farms
      const response = await fetch(`${BASE_URL}/farm`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(newFarm),
      });

      if (response.ok) {
        // If the farm is successfully created in the database, update the state
        setFarms((prevFarms) => [...prevFarms, newFarm]);
      } else {
        console.error('Failed to create a new farm in the database');
      }
    } catch (error) {
      console.error('Error creating a new farm:', error);
    }
  };

  const handleFarmLocationClick = (farm: Farm) => {
    // Set the selected location when a farm location is clicked
    setSelectedLocation(farm.location.coordinates);
  };

  return (
    <Layout>
      <h2>Welcome, {user?.email}!</h2>
      <p>Your role: {user?.role}</p>

      {/* Use the StyledMapContainer component */}
      <StyledMapContainer onSelectLocation={onSelectLocation} />

      {/* Display selected location (for testing purposes) */}
      {selectedLocation.length > 0 && (
        <p>Selected Location: {JSON.stringify({ type: 'Point', coordinates: selectedLocation })}</p>
      )}

      {/* AddFarmForm component */}
      <AddFarmForm onFarmAdded={handleFarmAdded} />

      {/* FarmList component */}
      <FarmList farms={farms} />
    </Layout>
  );
};

export default ProfilePage;
