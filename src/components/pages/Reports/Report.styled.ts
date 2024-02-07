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
