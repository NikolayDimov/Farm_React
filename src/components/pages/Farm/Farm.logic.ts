import React, { FormEvent, useEffect, useState } from "react";
import { Farm as FarmProp } from "./Farm.static";
import { apiFarm } from "../../../services/apiFarm";
import { useFormError } from "../../common/validations/useFormError";

const useFarm = () => {
    const [farms, setFarms] = useState<FarmProp[]>([]);
    const [farmName, setFarmName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { formErrors, validateName } = useFormError();

    const handleFarmNameBlur = () => {
        validateName(farmName);
    };

    const [selectedFarmCoordinates, setSelectedFarmCoordinates] = useState<number[]>([]);

    const setNewFarmCoordinates = (coordinates: number[]) => {
        setSelectedFarmCoordinates(coordinates);
    };

    const fetchFarms = async () => {
        try {
            const farmData = await apiFarm.fetchFarms();
            setFarms(farmData.data);
        } catch (error) {
            console.error("Error in fetching farms", error);
        }
    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFarmName(e.target.value);
    };

    async function createFarm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const isFarmValid = validateName(farmName);

            if (isFarmValid || farmName) {
                const newFarm: FarmProp = {
                    name: farmName,
                    location: {
                        type: "Point",
                        coordinates: selectedFarmCoordinates,
                    },
                };

                const response = await apiFarm.createFarm(newFarm);

                if (response.ok) {
                    setFarmName("");
                    fetchFarms();
                } else {
                    const responseData = await response.json();
                    const errorMsg = responseData.error.message;
                    setError(errorMsg);
                }
            }
        } catch (error: any) {
            console.log("errorMessage", error);
        }
    }

    useEffect(() => {
        fetchFarms();
    }, []);

    return { farms, createFarm, changeHandler, farmName, fetchFarms, coordinates: selectedFarmCoordinates, setNewFarmCoordinates, error, formErrors, handleFarmNameBlur };
};

export default useFarm;
