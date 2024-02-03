import React, { useEffect } from "react";

interface UseGCPListProps {
    fetchGCPs: () => Promise<void>;
}

const useGrowingCropPeriodList = ({ fetchGCPs }: UseGCPListProps) => {
    useEffect(() => {
        fetchGCPs();
    }, [fetchGCPs]);

    return {};
};

export default useGrowingCropPeriodList;
