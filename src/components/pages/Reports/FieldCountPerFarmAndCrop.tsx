import React from "react";
import { FieldCountPerFarmAndCropProps } from "./Report.static.ts";
import { TableCell, TableContainer, TableContent, TableHeader, TableHeaderCell, TableRow } from "./Report.styled.ts";

const FieldCountPerFarmAndCrop: React.FC<{ fieldCountPerFarmAndCrop: FieldCountPerFarmAndCropProps[] }> = ({ fieldCountPerFarmAndCrop }) => {
    if (!Array.isArray(fieldCountPerFarmAndCrop)) {
        return <div>No data available</div>;
    }

    return (
        <TableContainer>
            <h2>Field Count Per Farm And Crop</h2>
            <TableContent>
                <table>
                    <TableHeader>
                        <tr>
                            <TableHeaderCell>Farm Name</TableHeaderCell>
                            <TableHeaderCell>Crop Name</TableHeaderCell>
                            <TableHeaderCell>FieldCount</TableHeaderCell>
                        </tr>
                    </TableHeader>
                    <tbody>
                        {fieldCountPerFarmAndCrop.map((farm, index) => (
                            <TableRow key={index}>
                                <TableCell>{farm.farmname}</TableCell>
                                <TableCell>{farm.cropname}</TableCell>
                                <TableCell>{farm.fieldcount}</TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </table>
            </TableContent>
        </TableContainer>
    );
};

export default FieldCountPerFarmAndCrop;
