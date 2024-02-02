import React from "react";
import { GrowingCropPeriod } from "./GrowingCropPeriod.static";
import AddGrowingCropPeriodLogic from "./AddCrowingCropPeriod/AddGrowingCropPeriod.logic";
import GrowingCropPeriodListLogic from "./GrowingCropPeriodList/GrowingCropPeriodList.logic";

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
