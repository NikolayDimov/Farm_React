import React from "react";
import { GrowingCropPeriod } from "./GrowingCropPeriod.static";
import AddGrowingCropPeriodLogic from "./AddCrowingCropPeriod/AddGrowingCropPeriodLogic";
import GrowingCropPeriodListLogic from "./GrowingCropPeriodList/GrowingCropPeriodListLogic";

interface GrowingCropPeriodPresentationProps {
    growingCropPeriods: GrowingCropPeriod[];
    setGrowingCropPeriods: React.Dispatch<React.SetStateAction<GrowingCropPeriod[]>>;
    handleGrowingCropPeriodAdded: (newGrowingCropPeriod: GrowingCropPeriod) => void;
}

const GrowingCropPeriodPresentation: React.FC<GrowingCropPeriodPresentationProps> = ({ growingCropPeriods, setGrowingCropPeriods, handleGrowingCropPeriodAdded }) => {
    return (
        <>
            <AddGrowingCropPeriodLogic onGrowingCropPeriodAdded={handleGrowingCropPeriodAdded} />
            <GrowingCropPeriodListLogic growingCropPeriods={growingCropPeriods} setGrowingCropPeriods={setGrowingCropPeriods} />
        </>
    );
};

export default GrowingCropPeriodPresentation;
