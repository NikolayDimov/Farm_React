import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import { MdOutlineModeEdit } from "react-icons/md";

interface EditIconProps {
  onClick: MouseEventHandler;
}

const BlueEditIcon = styled.span`
   color: blue;
  cursor: pointer;
`;

const EditIcon: React.FC<EditIconProps> = ({ onClick }) => (
  <BlueEditIcon onClick={onClick} aria-label="Edit">
    <MdOutlineModeEdit />
  </BlueEditIcon>
);

export default EditIcon;
