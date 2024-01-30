// MachineList.tsx
import React, { useEffect, useState } from 'react';
import { Crop, Field, GrowingCropPeriod } from "./GrowingCropPeriod.static";
import { ListContainer, ListHeader, ListItem, List } from '../../../common/ListStyles';
import { apiGrowingCropPeriod } from './apiGrowingCropPeriod';
import { apiField } from '../Field/apiField';
import { apiCrop } from '../Crop/apiCrop';

interface GrowingCropPeriodListProps {
  growingCropPeriods: GrowingCropPeriod[];
  setGrowingCropPeriods: React.Dispatch<React.SetStateAction<GrowingCropPeriod[]>>;
}

const GrowingCropPeriodList: React.FC<GrowingCropPeriodListProps> = ({ growingCropPeriods, setGrowingCropPeriods }) => {
  const [fields, setFields] = useState<Field[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);


  const findFieldName = (fieldId: string): string => {
    const field = fields.find((field) => field.id === fieldId);
    return field ? field.name : 'Unknown field';
  };

  const findCropName = (cropId: string): string => {
    const crop = crops.find((crop) => crop.id === cropId);
    return crop ? crop.name : 'Unknown crop';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gcpData = await apiGrowingCropPeriod.fetchCrops();
        const fieldsData = await apiField.fetchFields();
        const cropsData = await apiCrop.fetchCrops();

        setGrowingCropPeriods(gcpData.data);
        setFields(fieldsData.data);
        setCrops(cropsData.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setGrowingCropPeriods]);


  if (loading) {
    return <p>Loading machines...</p>;
  }

  return (
    <ListContainer>
      <ListHeader>Field List</ListHeader>
      <List>
        {Array.isArray(fields) ? (
          growingCropPeriods.map((gcp) => (
            <ListItem key={gcp.id}>
              <strong>Farm:</strong> {findFieldName(gcp.fieldId)} |&nbsp;
              <strong>Soil:</strong> {findCropName(gcp.cropId)}
            </ListItem>
          ))
        ) : (
          <p>No machines available</p>
        )}
      </List>
    </ListContainer>
  );
};

export default GrowingCropPeriodList;
