import React, { FormEvent, useEffect, useState } from "react";
import { Machine as MachineProp } from "./Machine.static";
import { apiMachine } from "../../../services/apiMachine";
import { apiFarm } from "../../../services/apiFarm";
import { Farm } from "../Farm/Farm.static";

const useMachine = () => {
    const [machines, setMachines] = useState<MachineProp[]>([]);
    const [farms, setFarms] = useState<Farm[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [transferMode, setTransferMode] = useState<boolean>(false);

    const [createdValues, setCreatedValues] = useState({
        newMachineBrand: "",
        newMachineModel: "",
        newMachineRegNumber: "",
        newMachineFarmId: "",
    });

    const findFarmName = (farmId: string): string => {
        const farm = farms.find((farm) => farm.id === farmId);
        return farm ? farm.name : "Unknown Farm";
    };

    const fetchFarms = async () => {
        try {
            const farmsData = await apiFarm.fetchFarms();
            setFarms(farmsData.data);
        } catch (error) {
            console.error("Error fetching farms:", error);
        }
    };

    const fetchMachines = async () => {
        try {
            const machinesData = await apiMachine.fetchMachines();
            setMachines(machinesData.data);
        } catch (error) {
            console.error("Error in fetching machine", error);
        }
    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setCreatedValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    async function createMachine(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            if (!createdValues.newMachineFarmId) {
                setErrorMessage("Machine is required.");
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

    const handleTransferSuccess = () => {
        setTransferMode(false);
        fetchMachines();
    };

    useEffect(() => {
        fetchFarms();
        fetchMachines();
    }, []);

    return {
        machines,
        farms,
        fetchMachines,
        fetchFarms,
        loading,
        changeHandler,
        createMachine,
        createdValues,
        errorMessage,
        findFarmName,
        setTransferMode,
        handleTransferSuccess,
        transferMode,
    };
};

export default useMachine;
