import React from 'react';
import styled from 'styled-components';

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const LabelForm = styled.label`
  color: black;
  margin-bottom: 5px;
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  background-color: white;
  border-radius: 5px;
  color: black;
`;


interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
  onBlur,
}) => (
  <FormGroup>
    <LabelForm htmlFor={id}>{label}</LabelForm>
    <StyledInput
      type={type}
      placeholder={`Enter your ${label.toLowerCase()}`}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  </FormGroup>
);

export default InputField;


