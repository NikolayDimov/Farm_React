import React from "react";
import useMachine from "./Machine.logic";
import UserRoleHOC from "../UserRoleHOC";
import MachineList from "./MachineList/MachineList";
import TransferMachine from "./TransferMachine/TransferMachine";
import { StyledForm, StyledLabel, StyledSelect, StyledButton, StyledInput } from "../../common/InputFiled/InputFieldMachineAndField.styles";

const Machine: React.FC = () => {
    const { createdValues, createMachine, changeHandler, machines, farms, errorMessage, loading, findFarmName, fetchMachines, setTransferMode, transferMode, onTransferSuccess } =
        useMachine();

    return (
        <>
            <UserRoleHOC>
                <h3>Add a New Machine</h3>
                <StyledForm onSubmit={createMachine}>
                    <StyledLabel>Machine Brand:</StyledLabel>
                    <StyledInput type="text" placeholder="Enter Machine Brand" name="newMachineBrand" value={createdValues.newMachineBrand} onChange={changeHandler} />

                    <StyledLabel>Machine Model:</StyledLabel>
                    <StyledInput type="text" placeholder="Enter Machine Model" name="newMachineModel" value={createdValues.newMachineModel} onChange={changeHandler} />

                    <StyledLabel>Machine Register Number:</StyledLabel>
                    <StyledInput
                        type="text"
                        placeholder="Enter Machine Register Number"
                        name="newMachineRegNumber"
                        value={createdValues.newMachineRegNumber}
                        onChange={changeHandler}
                    />

                    <StyledLabel>Farm:</StyledLabel>
                    <StyledSelect name="newMachineFarmId" value={createdValues.newMachineFarmId} onChange={changeHandler}>
                        <option value="">Select Farm</option>
                        {farms.map((farm) => (
                            <option key={farm.id} value={farm.id}>
                                {farm.name}
                            </option>
                        ))}
                    </StyledSelect>

                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                    <StyledButton type="submit" disabled={loading}>
                        <span>{loading ? "Add Machine..." : "Add Machine"}</span>
                    </StyledButton>
                </StyledForm>
            </UserRoleHOC>

            <MachineList machines={machines} farms={farms} findFarmName={findFarmName} fetchMachines={fetchMachines} />

            <UserRoleHOC>
                <h2>Transfer Machine</h2>
                {transferMode ? (
                    <TransferMachine machines={machines} farms={farms} onTransferSuccess={onTransferSuccess} fetchMachines={fetchMachines} />
                ) : (
                    <button onClick={() => setTransferMode(true)}>Transfer Machine</button>
                )}
            </UserRoleHOC>
        </>
    );
};

export default Machine;
