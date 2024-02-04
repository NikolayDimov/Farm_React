import React, { MouseEventHandler } from "react";
import styled from "styled-components";

interface DetailsIconProps {
    onClick: MouseEventHandler;
}

const WhiteDetailsIcon = styled.span`
    color: white;
    cursor: pointer;
`;

const DetailsIcon: React.FC<DetailsIconProps> = ({ onClick }) => (
    <WhiteDetailsIcon onClick={onClick} role="img" aria-label="Details">
        📄
    </WhiteDetailsIcon>
);

export default DetailsIcon;
