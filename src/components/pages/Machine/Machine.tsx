import React from "react";
import useMachine from "./Machine.logic";
import UserRoleHOC from "../UserRoleHOC";
import MachineList from "./MachineList/MachineList";
import TransferMachine from "./TransferMachine/TransferMachine";

import styled from "styled-components";

export const ErrorStylesMachine = styled.p`
    color: red;
    font-size: 12px;
    margin-left: 15px;
`;

const Machine: React.FC = () => {
    const {
        createdValues,
        createMachine,
        changeHandler,
        machines,
        farms,
        errorMessage,
        loading,
        findFarmName,
        fetchMachines,
        setTransferMode,
        transferMode,
        onTransferSuccess,
        error,
        formErrorsMachineBrand,
        formErrorsMachineModel,
        formErrorsMachineRegNumber,
        handleMachineBrandBlur,
        handleMachineModelBlur,
        handleMachineRegNumberBlur,
    } = useMachine();

    return (
        <>
            <UserRoleHOC>
                <h3>Add a New Machine</h3>
                <form onSubmit={createMachine}>
                    <label>Machine Brand:</label>
                    <input type="text" name="newMachineBrand" value={createdValues.newMachineBrand} onChange={changeHandler} onBlur={handleMachineBrandBlur} />

                    <button type="submit" disabled={loading}></button>
                    <label>Machine Model:</label>
                    <input type="text" name="newMachineModel" value={createdValues.newMachineModel} onChange={changeHandler} onBlur={handleMachineModelBlur} />
                    <label>Machine Register Number:</label>
                    <input type="text" name="newMachineRegNumber" value={createdValues.newMachineRegNumber} onChange={changeHandler} onBlur={handleMachineRegNumberBlur} />
                    <label>Farm:</label>
                    <select name="newMachineFarmId" value={createdValues.newMachineFarmId} onChange={changeHandler}>
                        <option value="">Select Farm</option>
                        {farms.map((farm) => (
                            <option key={farm.id} value={farm.id}>
                                {farm.name}
                            </option>
                        ))}
                    </select>
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                    <button type="submit" disabled={loading}>
                        {loading ? "Creating Machine..." : "Create Machine"}
                    </button>
                </form>
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
