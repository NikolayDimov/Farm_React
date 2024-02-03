import React, { useState, useEffect, FormEvent } from "react";
import { Field as FieldProp } from "./Field.static";
import { apiField } from "../../../services/apiField";
import { apiFarm } from "../../../services/apiFarm";
import { apiSoil } from "../../../services/apiSoil";
import { Farm as FarmProp } from "../Farm/Farm.static";
import { Soil as SoilProp } from "../Soil/Soil.static";

const useField = () => {
    const [fields, setFields] = useState<FieldProp[]>([]);
    const [farms, setFarms] = useState<FarmProp[]>([]);
    const [soils, setSoils] = useState<SoilProp[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [outlinedCoordinates, setOutlinedCoordinates] = useState<number[][][]>([[]]);

    const [createdValues, setCreatedValues] = useState({
        newFieldName: "",
        newFarmId: "",
        newSoilId: "",
    });

    const handleSelectLocation = (coordinates: number[][][]) => {
        console.log("Newly outlined coordinates:", coordinates);
        setOutlinedCoordinates(coordinates);
    };

    const findFarmName = (farmId: string): string => {
        const farm = farms.find((farm) => farm.id === farmId);
        return farm ? farm.name : "Unknown Farm";
    };

    const findSoilName = (soilId: string): string => {
        const soil = soils.find((soil) => soil.id === soilId);
        return soil ? soil.name : "Unknown Soil";
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
            console.log("Soils data:", soilsData.data);
            setSoils(soilsData.data);
        } catch (error) {
            console.error("Error fetching soils:", error);
        }
    };

    const fetchFields = async () => {
        try {
            const fieldsData = await apiField.fetchFields();
            console.log("Fields data:", fieldsData.data);

            // setFields((prevFields) => {
            //     const newFields = fieldsData.data.filter((newField: FieldProp) => !prevFields.some((prevField: Field) => prevField.id === newField.id));
            //     return [...prevFields, ...newFields];
            // });

            setFields(fieldsData.data);
        } catch (error) {
            console.error("Error in fetching Field", error);
        }
    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setCreatedValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    async function createField(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            if (outlinedCoordinates.length === 0) {
                setErrorMessage("Please outline the field boundaries.");
                return;
            }

            if (!createdValues.newFarmId || !createdValues.newSoilId) {
                setErrorMessage("Farm and Soil are required.");
                return;
            }

            setLoading(true);

            const newFieldData = {
                name: createdValues.newFieldName,
                boundary: {
                    type: "Polygon",
                    coordinates: outlinedCoordinates,
                },
                farmId: createdValues.newFarmId,
                soilId: createdValues.newSoilId,
            };

            const response = await apiField.createField(newFieldData);

            if (response.ok) {
                setCreatedValues({
                    newFieldName: "",
                    newFarmId: "",
                    newSoilId: "",
                });
                fetchFields();
            } else {
                const responseBody = await response.json();
                console.error("Failed to create a new field in the database:", responseBody);
                setErrorMessage("Failed to create a new field in the database");
            }
        } catch (error) {
            console.error("Failed to create a new field in the database:", error);
            setErrorMessage("Failed to create a new field in the database");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchFields();
        fetchFarms();
        fetchSoils();
    }, []);

    return {
        fields,
        farms,
        soils,
        fetchFields,
        changeHandler,
        createField,
        createdValues,
        errorMessage,
        findFarmName,
        findSoilName,
        loading,
        handleSelectLocation,
    };
};

export default useField;
