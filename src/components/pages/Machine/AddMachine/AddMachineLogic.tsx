import React, { useState, useEffect, FormEvent } from "react";
import AddMachinePresentation from "./AddMachinePresentation";
import { apiMachine } from "../../../../services/apiMachine";
import { Farm } from "../../Farm/Farm.static";
import { apiFarm } from "../../../../services/apiFarm";

interface AddMachineLogicProps {
    fetchMachines: () => void;
}

const AddMachineLogic: React.FC<AddMachineLogicProps> = ({ fetchMachines }) => {
    const [createdValues, setCreatedValues] = useState({
        newMachineBrand: "",
        newMachineModel: "",
        newMachineRegNumber: "",
        newMachineFarmId: "",
    });

    const [farms, setFarms] = useState<Farm[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFarms = async () => {
            try {
                const farmsData = await apiFarm.fetchFarms();
                setFarms(farmsData.data);
            } catch (error) {
                console.error("Error fetching farms:", error);
            }
        };
        fetchFarms();
    }, []);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setCreatedValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    async function createMachine(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            if (!createdValues.newMachineFarmId) {
                setErrorMessage("Farm is required.");
                return;
            }

            setLoading(true);

            const newMachineData = {
                brand: createdValues.newMachineBrand,
                model: createdValues.newMachineModel,
                registerNumber: createdValues.newMachineRegNumber,
                farmId: createdValues.newMachineFarmId,
            };

            const response = await apiMachine.createMachine(newMachineData);

            if (response.ok) {
                setCreatedValues({
                    newMachineBrand: "",
                    newMachineModel: "",
                    newMachineRegNumber: "",
                    newMachineFarmId: "",
                });
                fetchMachines();
            } else {
                const responseBody = await response.json();
                console.error("Failed to create a new machine in the database:", responseBody);
                setErrorMessage("Failed to create a new machine in the database");
            }
        } catch (error) {
            console.error("Failed to create a new machine in the database:", error);
            setErrorMessage("Failed to create a new machine in the database");
        } finally {
            setLoading(false);
        }
    }

    return (
        <AddMachinePresentation
            createdValues={createdValues}
            farms={farms}
            errorMessage={errorMessage}
            loading={loading}
            changeHandler={changeHandler}
            createMachine={createMachine}
        />
    );
};

export default AddMachineLogic;
