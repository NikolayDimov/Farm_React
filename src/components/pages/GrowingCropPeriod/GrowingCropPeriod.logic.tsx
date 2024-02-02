import React, { useState } from "react";
import { GrowingCropPeriod } from "./GrowingCropPeriod.static";
import GrowingCropPeriodPresentation from "./GrowingCropPeriod";

const GrowingCropPeriodLogic: React.FC = () => {
    const [growingCropPeriods, setGrowingCropPeriods] = useState<GrowingCropPeriod[]>([]);

    const handleGrowingCropPeriodAdded = (newGrowingCropPeriod: GrowingCropPeriod) => {
        setGrowingCropPeriods((prevGrowingCropPeriods) => [...prevGrowingCropPeriods, newGrowingCropPeriod]);
    };

    return (
        <GrowingCropPeriodPresentation
            growingCropPeriods={growingCropPeriods}
            setGrowingCropPeriods={setGrowingCropPeriods}
            handleGrowingCropPeriodAdded={handleGrowingCropPeriodAdded}
        />
    );
};

export default GrowingCropPeriodLogic;
