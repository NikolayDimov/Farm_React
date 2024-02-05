import React from "react";
import { FormGroup, LabelForm, StyledInput, ErrorStyles, StyledButton } from "./InputField.styles";

interface InputFieldProps {
    label: string;
    type: string;
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    error?: string | null;
    buttonText?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, id, name, value, onChange, onBlur, error, buttonText }) => (
    <FormGroup>
        <LabelForm htmlFor={id}>{label}</LabelForm>
        <StyledInput type={type} placeholder={`Enter your ${label.toLowerCase()}`} id={id} name={name} value={value} onChange={onChange} onBlur={onBlur} />
        <StyledButton type="submit">
            <span>{buttonText}</span>
        </StyledButton>
        {error !== undefined && error !== null && <ErrorStyles>{error}</ErrorStyles>}
    </FormGroup>
);

export default InputField;
