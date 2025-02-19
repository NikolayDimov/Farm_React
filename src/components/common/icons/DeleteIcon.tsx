import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import { TiDeleteOutline } from "react-icons/ti";

interface DeleteIconProps {
    onClick: MouseEventHandler;
}

const RedDeleteIcon = styled.span`
    color: red;
    cursor: pointer;
`;

const DeleteIcon: React.FC<DeleteIconProps> = ({ onClick }) => (
    <RedDeleteIcon onClick={onClick} aria-label="Delete">
        <TiDeleteOutline />
    </RedDeleteIcon>
);

export default DeleteIcon;
