import React, { useEffect, useState } from "react";
import GrowingCropPeriodListPresentation from "./GrowingCropPeriodListPresentation";
import { GrowingCropPeriod } from "../GrowingCropPeriod.static";
import { Field } from "../../Field/Field.static";
import { Crop } from "../../Crop/Crop.static";
import { ListContainer, ListHeader, ListItem, List } from "../../../BaseLayout/common/ListStyles";
import { apiGrowingCropPeriod } from "../../../../services/apiGrowingCropPeriod";
import { apiField } from "../../../../services/apiField";
import { apiCrop } from "../../../../services/apiCrop";

interface GrowingCropPeriodListProps {
    growingCropPeriods: GrowingCropPeriod[];
    setGrowingCropPeriods: React.Dispatch<React.SetStateAction<GrowingCropPeriod[]>>;
}

const GrowingCropPeriodListLogic: React.FC<GrowingCropPeriodListProps> = ({ growingCropPeriods, setGrowingCropPeriods }) => {
    const [fields, setFields] = useState<Field[]>([]);
    const [crops, setCrops] = useState<Crop[]>([]);
    const [loading, setLoading] = useState(true);

    const findFieldName = (fieldId: string): string => {
        const field = fields.find((field) => field.id === fieldId);
        return field ? field.name : "Unknown field";
    };

    const findCropName = (cropId: string): string => {
        const crop = crops.find((crop) => crop.id === cropId);
        return crop ? crop.name : "Unknown crop";
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const gcpData = await apiGrowingCropPeriod.fetchGCP();
                const fieldsData = await apiField.fetchFields();
                const cropsData = await apiCrop.fetchCrops();

                setGrowingCropPeriods(gcpData.data);
                setFields(fieldsData.data);
                setCrops(cropsData.data);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [setGrowingCropPeriods]);

    return (
        <GrowingCropPeriodListPresentation
            growingCropPeriods={growingCropPeriods}
            fields={fields}
            crops={crops}
            loading={loading}
            findFieldName={findFieldName}
            findCropName={findCropName}
        />
    );
};

export default GrowingCropPeriodListLogic;
