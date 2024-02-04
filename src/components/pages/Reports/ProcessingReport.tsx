import React from "react";
import { ProcessingReportProps } from "./Report.static.ts";

const ProcessingReport: React.FC<{ processingReport: ProcessingReportProps[] }> = ({ processingReport }) => {
    if (!Array.isArray(processingReport)) {
        return <div>No data available</div>;
    }

    return (
        <div>
            <h2>Processing Report</h2>
            <table>
                <thead>
                    <tr>
                        <th>Processing Date</th>
                        <th>Processing Type</th>
                        <th>Field Name</th>
                        <th>Machine Brand</th>
                        <th>Machine Model</th>
                        <th>Machine Register Number</th>
                        <th>Crop Name</th>
                        <th>Soil Name</th>
                        <th>Farm Name</th>
                    </tr>
                </thead>
                <tbody>
                    {processingReport.map((processing, index) => (
                        <tr key={index}>
                            <td>{new Date(processing.processingdate).toLocaleDateString("en-GB")}</td>
                            <td>{processing.processingtypename}</td>
                            <td>{processing.fieldname}</td>
                            <td>{processing.machinebrand}</td>
                            <td>{processing.machinemodel}</td>
                            <td>{processing.machineregisternumber}</td>
                            <td>{processing.cropname}</td>
                            <td>{processing.soilname}</td>
                            <td>{processing.farmname}</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProcessingReport;
