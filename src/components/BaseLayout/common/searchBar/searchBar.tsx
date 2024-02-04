import React from "react";
import styled from "styled-components";

interface SearchBarProps {
    placeholder: string;
    onSearch: (query: string) => void;
}

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    input {
        width: 400px;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-right: 10px;
    }
`;

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => {
    return (
        <SearchContainer>
            <input type="text" placeholder={placeholder} onChange={(e) => onSearch(e.target.value)} />
        </SearchContainer>
    );
};

export default SearchBar;
