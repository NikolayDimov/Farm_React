import React from 'react';
import {FieldCountPerFarmAndCropProps} from './Report.static.ts'


const FieldCountPerFarmAndCrop: React.FC<{ fieldCountPerFarmAndCrop: FieldCountPerFarmAndCropProps[] }> = ({ fieldCountPerFarmAndCrop }) => {

    if (!Array.isArray(fieldCountPerFarmAndCrop)) {
        return <div>No data available</div>;
      }
  
  return (
    <div>
      <h2>Field Count Per Farm And Crop</h2>
      <table>
        <thead>
          <tr>
            <th>Farm ID</th>
            <th>Farm Name</th>
            <th>Crop ID</th>
            <th>Crop Name</th>
            <th>FieldCount</th>
          </tr>
        </thead>
        <tbody>
          {fieldCountPerFarmAndCrop.map((farm, index) => (
            <tr key={index}>
              <td>{farm.farmId}</td>
              <td>{farm.farmname}</td>
              <td>{farm.cropId}</td>
              <td>{farm.cropname}</td>
              <td>{farm.fieldcount}</td>
              <td>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FieldCountPerFarmAndCrop;
