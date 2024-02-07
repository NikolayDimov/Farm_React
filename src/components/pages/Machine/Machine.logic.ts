import React, { FormEvent, useEffect, useState } from "react";
import { Machine as MachineProp } from "./Machine.static";
import { apiMachine } from "../../../services/apiMachine";
import { apiFarm } from "../../../services/apiFarm";
import { Farm } from "../Farm/Farm.static";
import { useFormErrorMachineBrand, useFormErrorMachineModel, useFormErrorMachineRegNumber } from "../../common/validations/useFormErrorMachine";

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

    const [error, setError] = useState<string | null>(null);
    const { formErrors: formErrorsMachineBrand, validateMachineBrand } = useFormErrorMachineBrand();
    const { formErrors: formErrorsMachineModel, validateMachineModel } = useFormErrorMachineModel();
    const { formErrors: formErrorsMachineRegNumber, validateMachineRegNumber } = useFormErrorMachineRegNumber();

    const handleMachineBrandBlur = () => {
        validateMachineBrand(createdValues.newMachineBrand);
    };

    const handleMachineModelBlur = () => {
        validateMachineModel(createdValues.newMachineModel);
    };

    const handleMachineRegNumberBlur = () => {
        validateMachineRegNumber(createdValues.newMachineRegNumber);
    };

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
            const isMachineBrandValid = validateMachineBrand(createdValues.newMachineBrand);
            const isMachineModelValid = validateMachineModel(createdValues.newMachineModel);
            const isMachineRegNumberValid = validateMachineRegNumber(createdValues.newMachineRegNumber);
            if (!createdValues.newMachineFarmId || !isMachineBrandValid || !isMachineModelValid || !isMachineRegNumberValid) {
                setErrorMessage("Machine is required.");
                return;
            } else {
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
                    const responseData = await response.json();
                    if (responseData.error && responseData.message) {
                        const errorMessage = responseData.message;
                        console.log(errorMessage);

                        setError(errorMessage);
                    } else {
                        console.error("Unexpected error structure in response:", responseData);
                        setError("Failed to create a new Crop");
                    }
                }
            }
        } catch (error) {
            console.error("Failed to create a new machine in the database:", error);
            setErrorMessage("Failed to create a new machine in the database");
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    const onTransferSuccess = () => {
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
        onTransferSuccess,
        transferMode,
        error,
        formErrorsMachineBrand,
        formErrorsMachineModel,
        formErrorsMachineRegNumber,
        handleMachineBrandBlur,
        handleMachineModelBlur,
        handleMachineRegNumberBlur,
    };
};

export default useMachine;
