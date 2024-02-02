import React, { useState, useEffect, FormEvent } from "react";
import { apiGrowingCropPeriod } from "../../../../services/apiGrowingCropPeriod";
import { GrowingCropPeriod } from "../GrowingCropPeriod.static";
import { Field } from "../../Field/Field.static";
import { Crop } from "../../Crop/Crop.static";
import { apiField } from "../../../../services/apiField";
import { apiCrop } from "../../../../services/apiCrop";
import AddGrowingCropPeriodPresentation from "./AddGrowingCropPeriod";

interface AddGrowingCropPeriodProps {
    onGrowingCropPeriodAdded: (newGrowingCropPeriod: GrowingCropPeriod) => void;
}

const AddGrowingCropPeriodLogic: React.FC<AddGrowingCropPeriodProps> = ({ onGrowingCropPeriodAdded }) => {
    const [createdValues, setCreatedValues] = useState({
        newFieldId: "",
        newCropId: "",
    });

    const [fields, setFields] = useState<Field[]>([]);
    const [crops, setCrops] = useState<Crop[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFields = async () => {
            try {
                const fieldsData = await apiField.fetchFields();
                setFields(fieldsData.data);
            } catch (error) {
                console.error("Error fetching fields:", error);
            }
        };
        fetchFields();
    }, []);

    useEffect(() => {
        const fetchCrops = async () => {
            try {
                const cropsData = await apiCrop.fetchCrops();
                setCrops(cropsData.data);
            } catch (error) {
                console.error("Error fetching crops:", error);
            }
        };
        fetchCrops();
    }, []);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setCreatedValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    const handleAddGrowingCropPeriod = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!createdValues.newFieldId || !createdValues.newCropId) {
                setErrorMessage("Field and Crop are required.");
                return;
            }

            setLoading(true);

            const newGrowingCropPeriodData: GrowingCropPeriod = {
                fieldId: createdValues.newFieldId,
                cropId: createdValues.newCropId,
            };

            const response = await apiGrowingCropPeriod.createGrowingCropPeriod(newGrowingCropPeriodData);

            if (response.ok) {
                const newGrowingCropPeriodId: GrowingCropPeriod = {
                    fieldId: createdValues.newFieldId,
                    cropId: createdValues.newCropId,
                };

                onGrowingCropPeriodAdded(newGrowingCropPeriodId);

                setCreatedValues({
                    newFieldId: "",
                    newCropId: "",
                });
                setErrorMessage("");
            } else {
                console.error("Failed to create a new gcp in the database");
                const responseText = await response.text();
                console.error("Response text:", responseText);
            }
        } catch (error) {
            console.error("Failed to create a new gcp in the database:", error);
            setErrorMessage("Failed to create a new gcp in the database");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AddGrowingCropPeriodPresentation
            createdValues={createdValues}
            fields={fields}
            crops={crops}
            errorMessage={errorMessage}
            loading={loading}
            changeHandler={changeHandler}
            handleAddGrowingCropPeriod={handleAddGrowingCropPeriod}
        />
    );
};

export default AddGrowingCropPeriodLogic;
