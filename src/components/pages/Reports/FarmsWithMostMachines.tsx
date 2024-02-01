import React from 'react';
import {FarmsWithMostMachinesReportListProps} from './Report.static.ts'


const FarmsWithMostMachinesReport: React.FC<{ farmsWithMostMachines: FarmsWithMostMachinesReportListProps[] }> = ({ farmsWithMostMachines }) => {

    if (!Array.isArray(farmsWithMostMachines)) {
        return <div>No data available</div>;
      }
  
  return (
    <div>
      <h2>Farms with Most Machines Report</h2>
      <table>
        <thead>
          <tr>
            <th>Farm ID</th>
            <th>Farm Name</th>
            <th>Machine Count</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {farmsWithMostMachines.map((farm, index) => (
            <tr key={index}>
              <td>{farm.farmId}</td>
              <td>{farm.farmname}</td>
              <td>{farm.machinecount}</td>
              <td>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FarmsWithMostMachinesReport;
