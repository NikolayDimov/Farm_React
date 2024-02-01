import React from 'react';
import {MostCommonSoilPerFarmProps} from './Report.static.ts'


const MostCommonSoilPerFarm: React.FC<{ mostCommonSoilPerFarm: MostCommonSoilPerFarmProps[] }> = ({ mostCommonSoilPerFarm }) => {

    if (!Array.isArray(mostCommonSoilPerFarm)) {
        return <div>No data available</div>;
      }
  
  return (
    <div>
      <h2>Most Common Soil Per Farm</h2>
      <table>
        <thead>
          <tr>
            <th>Farm ID</th>
            <th>Farm Name</th>
            <th>Soil ID</th>
            <th>Soil Name</th>
            <th>FieldCount</th>
          </tr>
        </thead>
        <tbody>
          {mostCommonSoilPerFarm.map((farm, index) => (
            <tr key={index}>
              <td>{farm.farmId}</td>
              <td>{farm.farmname}</td>
              <td>{farm.soilId}</td>
              <td>{farm.soilname}</td>
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

export default MostCommonSoilPerFarm;
