import React from "react";
import { MostCommonSoilPerFarmProps } from "../Report.static.ts";
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

const MostCommonSoilPerFarm: React.FC<{ mostCommonSoilPerFarm: MostCommonSoilPerFarmProps[] }> = ({ mostCommonSoilPerFarm }) => {
    if (!Array.isArray(mostCommonSoilPerFarm)) {
        return <div>No data available</div>;
    }

    return (
        <TableContainer>
            <h2>Most Common Soil Per Farm</h2>
            <TableContent>
                <table>
                    <TableHeader>
                        <tr>
                            <TableHeaderCell>Farm Name</TableHeaderCell>
                            <TableHeaderCell>Soil Name</TableHeaderCell>
                            <TableHeaderCell>FieldCount</TableHeaderCell>
                        </tr>
                    </TableHeader>
                    <tbody>
                        {mostCommonSoilPerFarm.map((farm, index) => (
                            <TableRow key={index}>
                                <TableCell>{farm.farmname}</TableCell>
                                <TableCell>{farm.soilname}</TableCell>
                                <TableCell>{farm.fieldcount}</TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </table>
            </TableContent>
        </TableContainer>
    );
};

export default MostCommonSoilPerFarm;
