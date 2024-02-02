import React, { FormEvent } from "react";
import { Farm } from "../../Farm/Farm.static";
import { useAuth } from "../../../../context/AuthContext";

interface AddMachinePresentationProps {
    createdValues: {
        newMachineBrand: string;
        newMachineModel: string;
        newMachineRegNumber: string;
        newMachineFarmId: string;
    };
    farms: Farm[];
    errorMessage: string;
    loading: boolean;
    changeHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    createMachine: (e: FormEvent<HTMLFormElement>) => void;
}

const AddMachinePresentation: React.FC<AddMachinePresentationProps> = ({ createdValues, farms, errorMessage, loading, changeHandler, createMachine }) => {
    const { user } = useAuth();

    const canUserViewForm = user?.role === "OPERATOR" || user?.role === "OWNER";

    if (!canUserViewForm) {
        return null;
    }

    return (
        <div>
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
        </div>
    );
};

export default AddMachinePresentation;
