import React from "react";
import { FarmsWithMostMachinesReportListProps } from "../Report.static.ts";
import styled from "styled-components";

export const TableContainer = styled.div`
    margin-top: 20px;
`;

export const TableContent = styled.div`
    overflow: hidden;
    border-radius: 8px;

    table {
        border-collapse: collapse;
        border: 5px solid #ddd;
        width: 100%;
    }
`;

export const TableHeader = styled.thead`
    background-color: #f0f0f0;
`;

export const TableHeaderCell = styled.th`
    padding: 10px;
    border: 2px solid #ddd;
`;

export const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f9f9f9;
    }
`;

export const TableCell = styled.td`
    padding: 8px;
    border: 1px solid #ddd;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

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
