import styled from "styled-components";
import { Link } from "react-router-dom";

export const SidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 2;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    flex: 0 0 150px;
    overflow-y: auto;
    min-height: calc(100vh - 40px);
`;

export const TopButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

export const BottomButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: auto; /* Push it to the bottom */
`;

export const SidebarButton = styled(Link)`
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 5px 10px 5px 10px;
    cursor: pointer;
    z-index: 4;
    border-radius: 4px;
    color: inherit;
    text-decoration: none;

    &:hover {
        background-color: #ccc;
    }
`;

export const LogoutButton = styled.button`
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 5px 10px 5px 10px;
    cursor: pointer;
    z-index: 4;
    border-radius: 4px;

    &:hover {
        background-color: #ccc;
    }
`;
