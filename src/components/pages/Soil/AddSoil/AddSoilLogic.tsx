import React, { useState, FormEvent } from "react";
import { apiSoil } from "../../../../services/apiSoil";
import AddSoilPresentation from "./AddSoilPresentation";

interface AddSoilLogicProps {
    fetchSoils: () => void;
}

const AddSoilLogic: React.FC<AddSoilLogicProps> = ({ fetchSoils }) => {
    const [soilName, setSoilName] = useState("");
    const [loading, setLoading] = useState(false);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSoilName(e.target.value);
    };

    async function createSoil(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await apiSoil.createSoil(soilName);

            if (response.ok) {
                setSoilName("");
                fetchSoils();
            } else {
                console.error("Failed to create a new soil in the database");
            }
        } catch (error) {
            console.error("Error creating a new soil:", error);
        } finally {
            setLoading(false);
        }
    }

    return <AddSoilPresentation soilName={soilName} loading={loading} changeHandler={changeHandler} createSoil={createSoil} />;
};

export default AddSoilLogic;
