import React from "react";
import { FormGroup, LabelForm, StyledInput } from "./StyledComponents";

interface InputFieldProps {
    label: string;
    type: string;
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, id, name, value, onChange, onBlur }) => (
    <FormGroup>
        <LabelForm htmlFor={id}>{label}</LabelForm>
        <StyledInput type={type} placeholder={`Enter your ${label.toLowerCase()}`} id={id} name={name} value={value} onChange={onChange} onBlur={onBlur} />
    </FormGroup>
);

export default InputField;
