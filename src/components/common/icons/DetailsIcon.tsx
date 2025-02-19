import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import { CgDetailsMore } from "react-icons/cg";

interface DetailsIconProps {
    onClick: MouseEventHandler;
}

const WhiteDetailsIcon = styled.span`
 
    cursor: pointer;
`;

const DetailsIcon: React.FC<DetailsIconProps> = ({ onClick }) => (
    <WhiteDetailsIcon onClick={onClick} role="img" aria-label="Details">
        <CgDetailsMore />
    </WhiteDetailsIcon>
);

export default DetailsIcon;
