import React, { useState, FormEvent } from "react";
import { apiCrop } from "../../../../services/apiCrop";
import AddCropPresentation from "./AddCropPresentation";

interface AddCropLogicProps {
    fetchCrops: () => void;
}

const AddCropLogic: React.FC<AddCropLogicProps> = ({ fetchCrops }) => {
    const [cropName, setCropName] = useState("");
    const [loading, setLoading] = useState(false);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCropName(e.target.value);
    };

    async function createCrop(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await apiCrop.createCrop(cropName);
            // console.log(response)

            if (response.ok) {
                setCropName("");
                fetchCrops();
            } else {
                console.error("Failed to create a new Crop in the database");
            }
        } catch (error) {
            console.error("Error creating a new Crop:", error);
        } finally {
            setLoading(false);
        }
    }

    return <AddCropPresentation cropName={cropName} loading={loading} changeHandler={changeHandler} createCrop={createCrop} />;
};

export default AddCropLogic;
