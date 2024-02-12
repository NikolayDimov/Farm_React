import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserRoleHOC from "../UserRoleHOC";
import useProcessing from "./Processing.logic";
import ProcessingList from "./ProcessingList/ProcessingList";
import { StyledButton, StyledForm, StyledLabel, StyledSelect } from "../../common/InputFiled/InputFieldMachineAndField.styles";

const Processing: React.FC = () => {
    const {
        processings,
        processingTypes,
        fields,
        crops,
        machines,
        changeHandler,
        createProcessing,
        fetchProcessings,
        createdValues,
        setCreatedValues,
        loading,
        findProcessingTypeName,
        findGrowingCropPeriodCrop,
        findGrowingCropPeriodField,
        findMachineName,
        findFarmNameByMachineId,
        findSoilNameForProcessing,
        errorMessage,
    } = useProcessing();

    return (
        <>
            <UserRoleHOC>
                <div>
                    <h3>Add a New Processing</h3>
                    <StyledForm onSubmit={createProcessing}>
                        <StyledLabel>Processing date:</StyledLabel>
                        <DatePicker selected={createdValues.newProcessingDate} onChange={(date: Date) => setCreatedValues((state) => ({ ...state, newProcessingDate: date }))} />

                        <StyledLabel>Processing Type:</StyledLabel>
                        <StyledSelect name="processingTypeId" value={createdValues.processingTypeId} onChange={changeHandler}>
                            <option key="" value="">
                                Select Processing Type
                            </option>
                            {processingTypes.map((processingType) => (
                                <option key={processingType.id} value={processingType.id}>
                                    {processingType.name}
                                </option>
                            ))}
                        </StyledSelect>

                        <StyledLabel>Field:</StyledLabel>
                        <StyledSelect name="fieldId" value={createdValues.fieldId} onChange={changeHandler}>
                            <option key="" value="">
                                Select Field
                            </option>
                            {fields.map((field) => (
                                <option key={field.id} value={field.id}>
                                    {field.name}
                                </option>
                            ))}
                        </StyledSelect>

                        <StyledLabel>Crop:</StyledLabel>
                        <StyledSelect name="cropId" value={createdValues.cropId} onChange={changeHandler}>
                            <option key="" value="">
                                Select Crop
                            </option>
                            {crops.map((crop) => (
                                <option key={crop.id} value={crop.id}>
                                    {crop.name}
                                </option>
                            ))}
                        </StyledSelect>

                        <StyledLabel>Machine:</StyledLabel>
                        <StyledSelect name="machineId" value={createdValues.machineId} onChange={changeHandler}>
                            <option key="" value="">
                                Select Machine
                            </option>
                            {machines.map((machine) => (
                                <option key={machine.id} value={machine.id}>
                                    {machine.brand}, {machine.model}, {machine.registerNumber}
                                </option>
                            ))}
                        </StyledSelect>

                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                        <StyledButton type="submit" disabled={loading}>
                            <span>{loading ? "Add Processing..." : "Add processing"}</span>
                        </StyledButton>
                    </StyledForm>
                </div>
            </UserRoleHOC>

            <ProcessingList
                processings={processings}
                processingTypes={processingTypes}
                machines={machines}
                fetchProcessings={fetchProcessings}
                findProcessingTypeName={findProcessingTypeName}
                findGrowingCropPeriodField={findGrowingCropPeriodField}
                findGrowingCropPeriodCrop={findGrowingCropPeriodCrop}
                findMachineName={findMachineName}
                findFarmNameByMachineId={findFarmNameByMachineId}
                findSoilNameForProcessing={findSoilNameForProcessing}
            />
        </>
    );
};

export default Processing;
