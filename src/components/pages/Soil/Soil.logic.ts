import React, { useState, useEffect } from "react";
import { apiSoil } from "../../../services/apiSoil";
import { Soil as SoilProp } from "./Soil.static";

const useSoil = () => {
    const [soils, setSoils] = useState<SoilProp[]>([]);
    const [soilName, setSoilName] = useState("");

    const fetchSoils = async () => {
        try {
            const soilData = await apiSoil.fetchSoils();
            setSoils(soilData.data);
        } catch (error) {
            console.error("Error in fetching soils", error);
        }
    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSoilName(e.target.value);
    };

    const createSoil = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!soilName) {
                console.error("Soil name cannot be empty");
                return;
            }

            const response = await apiSoil.createSoil(soilName);

            if (response.ok) {
                setSoilName("");
                fetchSoils();
            } else {
                console.error("Failed to create a new Soil in the database");
            }
        } catch (error) {
            console.error("Error creating a new Soil:", error);
        }
    };

    useEffect(() => {
        fetchSoils();
    }, []);

    return { soils, createSoil, changeHandler, soilName, fetchSoils };
};

export default useSoil;
