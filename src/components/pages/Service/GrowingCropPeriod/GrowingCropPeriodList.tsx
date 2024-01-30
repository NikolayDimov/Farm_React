import React, { useCallback, useEffect, useState } from 'react';
import authHeader from '../../../../services/authHeader';
import { GrowingCropPeriod } from "./GrowingCropPeriod.static";
import { Field } from './GrowingCropPeriod.static';
import { Crop } from './GrowingCropPeriod.static';
import { ListContainer, ListHeader, ListItem, List } from '../../../common/ListStyles';

const BASE_URL = "http://localhost:3000";

interface GrowingCropPeriodListProps {
  growingCropPeriods: GrowingCropPeriod[];
  setGrowingCropPeriods: React.Dispatch<React.SetStateAction<GrowingCropPeriod[]>>;
}

const GrowingCropPeriodList: React.FC<GrowingCropPeriodListProps> = ({ growingCropPeriods, setGrowingCropPeriods }) => {
  const [fields, setFields] = useState<Field[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);

 
    const fetchFields = useCallback(async () => {
      try {
        const authHeaders = authHeader();
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
        };

        const fieldsResponse = await fetch(`${BASE_URL}/field`, {
          method: 'GET',
          headers,
        });

        if (fieldsResponse.ok) {
          const fieldsData: { data: Field[] } = await fieldsResponse.json();
          setFields(fieldsData.data);
        } else {
          console.error('Failed to fetch fields from the database');
        }
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    }, []);

    const fetchCrops = useCallback(async () => {
      try {
        const authHeaders = authHeader();
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
        };

        const cropsResponse = await fetch(`${BASE_URL}/crop`, {
          method: 'GET',
          headers,
        });

        if (cropsResponse.ok) {
          const cropsData: { data: Crop[] } = await cropsResponse.json();
          setCrops(cropsData.data);
        } else {
          console.error('Failed to fetch crops from the database');
        }
      } catch (error) {
        console.error('Error fetching crops:', error);
      }
    }, []);

   
  useEffect(() => {
    fetchFields();
    fetchCrops();
  }, [fetchFields, fetchCrops]);

  // Memoize Callbacks
  useEffect(() => {
    const fetchGrowingCropPeriods = async () => {
      try {
        const authHeaders = authHeader();
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
        };

        const response = await fetch(`${BASE_URL}/growingCropPeriod`, {
          method: 'GET',
          headers,
        });

        if (response.ok) {
          const growingCropPeriodsData = await response.json();

          setGrowingCropPeriods((prevGrowingCropPeriods: GrowingCropPeriod[]) => {
            const updatedGrowingCropPeriods: GrowingCropPeriod[] = growingCropPeriodsData.data.map((period:any) => ({
              ...period,
                field: fields.find((field) => field.id === period.fieldId) as Field,
                crop: crops.find((crop) => crop.id === period.cropId) as Crop,
            }));

            if (JSON.stringify(prevGrowingCropPeriods) !== JSON.stringify(updatedGrowingCropPeriods)) {
              return updatedGrowingCropPeriods;
            }

            return updatedGrowingCropPeriods;
          });
        } else {
          console.error('Failed to fetch GrowingCropPeriod from the database');
        }
      } catch (error) {
        console.error('Error fetching GrowingCropPeriod:', error);
      }
    };

    fetchGrowingCropPeriods();
  }, [setGrowingCropPeriods, fields, crops]);

  return (
    <ListContainer>
      <ListHeader>GrowingCropPeriod List</ListHeader>
      <List>
        {growingCropPeriods.map((growingCropPeriod, index) => (
          <ListItem key={growingCropPeriod.id}>
            <strong>Serial Number:</strong> {index + 1} |&nbsp;
            <strong>Field:</strong> {growingCropPeriod.field?.name} |&nbsp;
            <strong>Crop:</strong> {growingCropPeriod.crop?.name}
          </ListItem>
        ))}
      </List>
    </ListContainer>
  );
};

export default GrowingCropPeriodList;
