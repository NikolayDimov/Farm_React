import React from "react";
import { ProcessingReportProps } from "./Report.static.ts";
import { TableContainer, TableContent, TableHeader, TableHeaderCell, TableRow, TableCell } from "./Report.styled.ts";

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
