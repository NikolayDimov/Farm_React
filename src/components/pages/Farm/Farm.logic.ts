import React, { FormEvent, useEffect, useState } from "react";
import { Farm as FarmProp } from "./Farm.static";
import { apiFarm } from "../../../services/apiFarm";
import { useFormError } from "../../common/validations/useFormError";

const useFarm = () => {
    const [farms, setFarms] = useState<FarmProp[]>([]);
    const [farmName, setFarmName] = useState("");
    const [loading, setLoading] = useState<boolean>();
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

            if (!isFarmValid || !farmName) {
                console.log(`crop: ${farmName}`);
            } else {
                setLoading(true);
                // Assuming you have a function to get the coordinates, replace this with your logic
                // const newFarmCoordinates = [42.6977, 23.3219];
                // if (newFarmCoordinates.length === 0) {
                //     console.error("Coordinates not selected.");
                //     return;
                // }
                // console.log("ADDFARM:", newFarmCoordinates);
                // const farmCoordinates = newFarmCoordinates.length > 0 ? newFarmCoordinates : [0, 0];

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
                    // setNewFarmCoordinates([]);
                    //memoizedSetNewFarmCoordinates([]);
                    fetchFarms();
                } else {
                    const responseData = await response.json();
                    if (responseData.error && responseData.message) {
                        const errorMessage = responseData.message;
                        console.log(errorMessage);

                        setError(errorMessage);
                    } else {
                        console.error("Unexpected error structure in response:", responseData);
                        setError("Failed to create a new Farm");
                    }
                }
            }
        } catch (error: any) {
            const errorMessage = error.message || "An unexpected error occurred.";
            // setError(errorMessage);
            // const errorMessage = error instanceof Error ? error.message : "non";

            console.log("errorMessage", errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchFarms();
    }, []);

    return { farms, createFarm, changeHandler, farmName, fetchFarms, loading, coordinates: selectedFarmCoordinates, setNewFarmCoordinates, error, formErrors, handleFarmNameBlur };
};

export default useFarm;
