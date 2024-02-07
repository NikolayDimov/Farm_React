import React from "react";
import { ProcessingReportProps } from "../Report.static.ts";
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

const ProcessingReport: React.FC<{ processingReport: ProcessingReportProps[] }> = ({ processingReport }) => {
    if (!Array.isArray(processingReport)) {
        return <div>No data available</div>;
    }

    return (
        <TableContainer>
            <h2>Processing Report</h2>
            <TableContent>
                <table>
                    <TableHeader>
                        <tr>
                            <TableHeaderCell>Processing Date</TableHeaderCell>
                            <TableHeaderCell>Processing Type</TableHeaderCell>
                            <TableHeaderCell>Field Name</TableHeaderCell>
                            <TableHeaderCell>Machine Brand</TableHeaderCell>
                            <TableHeaderCell>Machine Model</TableHeaderCell>
                            <TableHeaderCell>Machine Register Number</TableHeaderCell>
                            <TableHeaderCell>Crop Name</TableHeaderCell>
                            <TableHeaderCell>Soil Name</TableHeaderCell>
                            <TableHeaderCell>Farm Name</TableHeaderCell>
                        </tr>
                    </TableHeader>
                    <tbody>
                        {processingReport.map((processing, index) => (
                            <TableRow key={index}>
                                <TableCell>{new Date(processing.processingdate).toLocaleDateString("en-GB")}</TableCell>
                                <TableCell>{processing.processingtypename}</TableCell>
                                <TableCell>{processing.fieldname}</TableCell>
                                <TableCell>{processing.machinebrand}</TableCell>
                                <TableCell>{processing.machinemodel}</TableCell>
                                <TableCell>{processing.machineregisternumber}</TableCell>
                                <TableCell>{processing.cropname}</TableCell>
                                <TableCell>{processing.soilname}</TableCell>
                                <TableCell>{processing.farmname}</TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </table>
            </TableContent>
        </TableContainer>
    );
};

export default ProcessingReport;
