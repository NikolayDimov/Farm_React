import React from "react";
import useMachine from "./Machine.logic";
import UserRoleHOC from "../UserRoleHOC";
import MachineList from "./MachineList/MachineList";
import TransferMachineLogic from "./TransferMachine/TransferMachine.logic";

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
        handleTransferSuccess,
    } = useMachine();

    return (
        <>
            <UserRoleHOC>
                <h3>Add a New Machine</h3>
                <form onSubmit={createMachine}>
                    <label>Machine Brand:</label>
                    <input type="text" name="newMachineBrand" value={createdValues.newMachineBrand} onChange={changeHandler} />
                    <label>Machine Model:</label>
                    <input type="text" name="newMachineModel" value={createdValues.newMachineModel} onChange={changeHandler} />
                    <label>Machine Register Number:</label>
                    <input type="text" name="newMachineRegNumber" value={createdValues.newMachineRegNumber} onChange={changeHandler} />
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
                    <TransferMachineLogic machines={machines} farms={farms} onTransferSuccess={handleTransferSuccess} />
                ) : (
                    <button onClick={() => setTransferMode(true)}>Transfer Machine</button>
                )}
            </UserRoleHOC>
        </>
    );
};

export default Machine;
