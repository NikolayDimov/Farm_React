import React, { FormEvent, useEffect, useState } from "react";
import { Processing as ProcessingProp } from "./Processing.static";
import { ProcessingType } from "../ProcessingType/ProcessingType.static";
import { Field } from "../Field/Field.static";
import { Crop } from "../Crop/Crop.static";
import { Machine } from "../Machine/Machine.static";
import { Farm } from "../Farm/Farm.static";
import { Soil } from "../Soil/Soil.static";
import { apiField } from "../../../services/apiField";
import { apiProcessing } from "../../../services/apiProcessing";
import { apiProcessingType } from "../../../services/apiProcessingType";
import { apiCrop } from "../../../services/apiCrop";
import { apiMachine } from "../../../services/apiMachine";
import { apiGrowingCropPeriod } from "../../../services/apiGrowingCropPeriod";
import { GrowingCropPeriod } from "../GrowingCropPeriod/GrowingCropPeriod.static";
import { apiFarm } from "../../../services/apiFarm";
import { apiSoil } from "../../../services/apiSoil";

// interface AddProcessingProps {
//     fetchProcessings: () => void;
// }

// type ApiGrowingCropPeriod = {
//     fetchGCP: () => Promise<any>;
//     createGrowingCropPeriod: (newGrowingCropPeriodData: GrowingCropPeriod) => Promise<Response>;
//     // ... other methods or properties
// };

// // Extend the type definition to include createGrowingCropPeriod
// type ExtendedApiGrowingCropPeriod = ApiGrowingCropPeriod & {
//     createGrowingCropPeriod: (newGrowingCropPeriodData: GrowingCropPeriod) => Promise<Response>;

const useProcessing = () => {
    const [processings, setProcessings] = useState<ProcessingProp[]>([]);
    const [processingTypes, setProcessingTypes] = useState<ProcessingType[]>([]);
    const [growingCropPeriods, setGrowingCropPeriods] = useState<GrowingCropPeriod[]>([]);
    const [fields, setFields] = useState<Field[]>([]);
    const [crops, setCrops] = useState<Crop[]>([]);
    const [machines, setMachines] = useState<Machine[]>([]);
    const [farms, setFarms] = useState<Farm[]>([]);
    const [soils, setSoils] = useState<Soil[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [currentGrowingCropPeriod, setCurrentGrowingCropPeriod] = useState<GrowingCropPeriod | undefined>();

    const [createdValues, setCreatedValues] = useState({
        newProcessingDate: new Date(),
        processingTypeId: "",
        fieldId: "",
        cropId: "",
        machineId: "",
        growingCropPeriodId: "",
    });

    const findProcessingTypeName = (processingTypeId: string): string => {
        const processingType = processingTypes.find((processingType) => processingType.id === processingTypeId);
        return processingType ? processingType.name : "Unknown processingType";
    };

    const findGrowingCropPeriodCrop = (growingCropPeriodId: string | undefined): string => {
        const growingCropPeriod = growingCropPeriods.find((growingCropPeriod) => growingCropPeriod.id === growingCropPeriodId);
        return growingCropPeriod ? findCropName(growingCropPeriod.cropId) : "Unknown growingCropPeriod.crop";
    };

    const findGrowingCropPeriodField = (growingCropPeriodId: string | undefined): string => {
        const growingCropPeriod = growingCropPeriods.find((growingCropPeriod) => growingCropPeriod.id === growingCropPeriodId);
        return growingCropPeriod ? findFieldName(growingCropPeriod.fieldId) : "Unknown growingCropPeriod.field";
    };

    const findFieldName = (fieldId: string | undefined): string => {
        const field = fields.find((field) => field.id === fieldId);
        return field ? field.name : "Unknown field";
    };

    const findCropName = (cropId: string | undefined): string => {
        const crop = crops.find((crop) => crop.id === cropId);
        return crop ? crop.name : "Unknown crop";
    };

    const findMachineName = (machineId: string): string => {
        const machine = machines.find((machine) => machine.id === machineId);
        return machine ? `${machine.brand} - ${machine.model} (${machine.registerNumber})` : "Unknown machine";
    };

    const findFarmNameByMachineId = (machineId: string): string => {
        const machine = machines.find((machine) => machine.id === machineId);
        return machine ? findFarmName(machine.farmId) : "Unknown farm";
    };

    const findFarmName = (farmId: string): string => {
        const farm = farms.find((farm) => farm.id === farmId);
        return farm ? farm.name : "Unknown Farm";
    };

    const findSoilNameForProcessing = (growingCropPeriodId: string | undefined): string => {
        const growingCropPeriod = growingCropPeriods.find((growingCropPeriod) => growingCropPeriod.id === growingCropPeriodId);

        if (growingCropPeriod) {
            const field = fields.find((field) => field.id === growingCropPeriod.fieldId);

            if (field) {
                const soil = soils.find((soil) => soil.id === field.soilId);

                if (soil) {
                    return soil.name;
                }
            }
        }

        return "Unknown Soil";
    };

    const fetchProcessingTypes = async () => {
        try {
            const processingTypesData = await apiProcessingType.fetchProcessingTypes();
            setProcessingTypes(processingTypesData.data);
        } catch (error) {
            console.error("Error fetching ProcessingType:", error);
        }
    };

    const fetchGrowingCropPeriods = async () => {
        try {
            const growingCropPeriodsData = await apiGrowingCropPeriod.fetchGCP();
            setGrowingCropPeriods(growingCropPeriodsData.data);
        } catch (error) {
            console.error("Error fetching growingCropPeriod:", error);
        }
    };

    const fetchMachines = async () => {
        try {
            const machinesData = await apiMachine.fetchMachines();
            setMachines(machinesData.data);
        } catch (error) {
            console.error("Error fetching machines:", error);
        }
    };

    const fetchFields = async () => {
        try {
            const fieldsData = await apiField.fetchFields();
            setFields(fieldsData.data);
        } catch (error) {
            console.error("Error fetching fields:", error);
        }
    };

    const fetchCrops = async () => {
        try {
            const cropsData = await apiCrop.fetchCrops();
            setCrops(cropsData.data);
        } catch (error) {
            console.error("Error fetching crops:", error);
        }
    };

    const fetchFarms = async () => {
        try {
            const farmsData = await apiFarm.fetchFarms();
            setFarms(farmsData.data);
        } catch (error) {
            console.error("Error fetching farms:", error);
        }
    };

    const fetchSoils = async () => {
        try {
            const soilsData = await apiSoil.fetchSoils();
            setSoils(soilsData.data);
        } catch (error) {
            console.error("Error fetching soils:", error);
        }
    };

    const fetchProcessings = async () => {
        try {
            const processingsData = await apiProcessing.fetchProcessings();
            setProcessings(processingsData.data);
        } catch (error) {
            console.error("Error in fetching Processing", error);
        }
    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setCreatedValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    async function createProcessing(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            if (!createdValues.newProcessingDate || !createdValues.processingTypeId || !createdValues.fieldId || !createdValues.cropId || !createdValues.machineId) {
                setErrorMessage("Fields are required.");
                return;
            }

            setLoading(true);

            let growingCropPeriodId: string | undefined;
            // Check if there is a current GrowingCropPeriod and it matches the selected field and crop
            const existingGrowingCropPeriod = growingCropPeriods.find(
                (growingCropPeriod) => growingCropPeriod.fieldId === createdValues.fieldId && growingCropPeriod.cropId === createdValues.cropId
            );

            // if (currentGrowingCropPeriod && currentGrowingCropPeriod.fieldId === createdValues.fieldId && currentGrowingCropPeriod.cropId === createdValues.cropId) {
            //     growingCropPeriodId = currentGrowingCropPeriod.id;
            if (existingGrowingCropPeriod) {
                growingCropPeriodId = existingGrowingCropPeriod.id;
            } else {
                // Create a new GrowingCropPeriod entry
                const newGrowingCropPeriodResponse = await apiGrowingCropPeriod.createGrowingCropPeriod({
                    fieldId: createdValues.fieldId,
                    cropId: createdValues.cropId,
                });

                if (!newGrowingCropPeriodResponse.ok) {
                    console.error("Failed to create a new growingCropPeriod in the database");
                    return;
                }

                const newGrowingCropPeriodData = await newGrowingCropPeriodResponse.json();
                growingCropPeriodId = newGrowingCropPeriodData.id;

                // Update the currentGrowingCropPeriod state with the newly created one
                setCurrentGrowingCropPeriod(newGrowingCropPeriodData);
            }

            // Create a new Processing entry
            const newProcessingData: ProcessingProp = {
                date: createdValues.newProcessingDate,
                processingTypeId: createdValues.processingTypeId,
                growingCropPeriodId: growingCropPeriodId || "",
                machineId: createdValues.machineId,
            };

            const response: Response = await apiProcessing.createProcessing(newProcessingData);

            if (response.ok) {
                setCreatedValues({
                    newProcessingDate: new Date(),
                    processingTypeId: "",
                    fieldId: "",
                    cropId: "",
                    machineId: "",
                    growingCropPeriodId: "",
                });
                fetchProcessings();
            } else {
                const responseBody = await response.json();
                console.error("Failed to create a new processing in the database:", responseBody);
                setErrorMessage("Failed to create a new processing in the database");
            }
        } catch (error) {
            console.error("Failed to create a new processing in the database:", error);
            setErrorMessage("Failed to create a new processing in the database");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProcessingTypes();
        fetchFarms();
        fetchGrowingCropPeriods();
        fetchMachines();
        fetchFields();
        fetchCrops();
        fetchSoils();
        fetchProcessings();
    }, []);

    return {
        processings,
        processingTypes,
        growingCropPeriods,
        fields,
        crops,
        farms,
        soils,
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
        findFieldName,
        findCropName,
        findMachineName,
        findFarmNameByMachineId,
        findFarmName,
        findSoilNameForProcessing,
        errorMessage,
    };
};

export default useProcessing;
