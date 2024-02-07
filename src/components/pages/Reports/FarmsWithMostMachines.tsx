import React from "react";
import { FarmsWithMostMachinesReportListProps } from "./Report.static.ts";
import { TableContainer, TableContent, TableHeader, TableHeaderCell, TableRow, TableCell } from "./Report.styled.ts";

const FarmsWithMostMachinesReport: React.FC<{ farmsWithMostMachines: FarmsWithMostMachinesReportListProps[] }> = ({ farmsWithMostMachines }) => {
    if (!Array.isArray(farmsWithMostMachines) || farmsWithMostMachines.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <TableContainer>
            <h2>Farms with Most Machines Report</h2>
            <TableContent>
                <table>
                    <TableHeader>
                        <tr>
                            <TableHeaderCell>Farm Name</TableHeaderCell>
                            <TableHeaderCell>Machine Count</TableHeaderCell>
                        </tr>
                    </TableHeader>
                    <tbody>
                        {farmsWithMostMachines.map((farm, index) => (
                            <TableRow key={index}>
                                <TableCell>{farm.farmname}</TableCell>
                                <TableCell>{farm.machinecount}</TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </table>
            </TableContent>
        </TableContainer>
    );
};

export default FarmsWithMostMachinesReport;
