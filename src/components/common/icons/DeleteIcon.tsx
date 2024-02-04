import React, { MouseEventHandler } from "react";
import styled from "styled-components";

interface DeleteIconProps {
    onClick: MouseEventHandler;
}

const RedDeleteIcon = styled.span`
    color: red;
    cursor: pointer;
`;

const DeleteIcon: React.FC<DeleteIconProps> = ({ onClick }) => (
    <RedDeleteIcon onClick={onClick} role="img" aria-label="Delete">
        ❌
    </RedDeleteIcon>
);

export default DeleteIcon;
