import React, { FormEvent, useEffect, useState } from "react";
import { Farm as FarmProp } from "./Farm.static";
import { apiFarm } from "../../../services/apiFarm";

const useFarm = () => {
    const [farms, setFarms] = useState<FarmProp[]>([]);
    const [farmName, setFarmName] = useState("");
    const [loading, setLoading] = useState<boolean>();

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
            if (!farmName) {
                console.error("Farm name cannot be empty");
                return;
            }
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
                console.error("Failed to create a new farm in the database");
            }
        } catch (error) {
            console.error("Error creating a new farm:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchFarms();
    }, []);

    return { farms, createFarm, changeHandler, farmName, fetchFarms, loading, coordinates: selectedFarmCoordinates, setNewFarmCoordinates };
};

export default useFarm;
