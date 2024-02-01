import React, { useState, useEffect, FormEvent } from "react";
import { apiField } from "../../../../services/apiField";
import { Farm } from "../../Farm/Farm.static";
import { Soil } from "../../Soil/Soil.static";
import { apiFarm } from "../../../../services/apiFarm";
import { apiSoil } from "../../../../services/apiSoil";
import AddFieldPresentation from "./AddFieldPresentation";

interface AddFieldLogicProps {
    fetchFields: () => void;
}

const AddFieldLogic: React.FC<AddFieldLogicProps> = ({ fetchFields }) => {
    const [createdValues, setCreatedValues] = useState({
        newFieldName: "",
        newFarmId: "",
        newSoilId: "",
    });

    const [farms, setFarms] = useState<Farm[]>([]);
    const [soils, setSoils] = useState<Soil[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const [outlinedCoordinates, setOutlinedCoordinates] = useState<number[][][]>([[]]);

    const handleSelectLocation = (coordinates: number[][][]) => {
        console.log("Newly outlined coordinates:", coordinates);
        setOutlinedCoordinates(coordinates);
    };

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

    useEffect(() => {
        const fetchSoils = async () => {
            try {
                const soilsData = await apiSoil.fetchSoils();
                setSoils(soilsData.data);
            } catch (error) {
                console.error("Error fetching soils:", error);
            }
        };
        fetchSoils();
    }, []);

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

    return (
        <AddFieldPresentation
            createdValues={createdValues}
            farms={farms}
            soils={soils}
            errorMessage={errorMessage}
            loading={loading}
            outlinedCoordinates={outlinedCoordinates}
            handleSelectLocation={handleSelectLocation}
            changeHandler={changeHandler}
            createField={createField}
        />
    );
};

export default AddFieldLogic;
