import React from "react";
import { MostCommonSoilPerFarmProps } from "./Report.static.ts";
import { TableContainer, TableContent, TableHeader, TableHeaderCell, TableRow, TableCell } from "./Report.styled.ts";

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
