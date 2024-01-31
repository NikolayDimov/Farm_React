import React, { MouseEventHandler } from "react";
import styled from "styled-components";

interface EditIconProps {
  onClick: MouseEventHandler;
}

const BlueEditIcon = styled.span`
  color: blue;
  cursor: pointer;
`;

const EditIcon: React.FC<EditIconProps> = ({ onClick }) => (
  <BlueEditIcon onClick={onClick} role="img" aria-label="Edit">
   🖌️
  </BlueEditIcon>
);

export default EditIcon;
