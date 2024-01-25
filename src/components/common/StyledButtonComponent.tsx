import styled from 'styled-components';

const StyledButton = styled.button`
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  background-color: #0056B8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 14px;
    font-weight: bold;
  }
`;

export default StyledButton;
