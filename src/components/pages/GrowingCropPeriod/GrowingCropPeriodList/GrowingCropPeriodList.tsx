import React from "react";
import { GrowingCropPeriod } from "../GrowingCropPeriod.static";
import useGrowingCropPeriodList from "../GrowingCropPeriod.logic";

import { ListContainer, ListHeader, ListItem, List } from "../../../BaseLayout/common/ListStyles";

interface GrowingCropPeriodListProps {
    growingCropPeriods: GrowingCropPeriod[];
    findFieldName: (fieldId: string) => string;
    findCropName: (cropId: string) => string;
}

const GrowingCropPeriodList: React.FC<GrowingCropPeriodListProps> = ({ growingCropPeriods, findFieldName, findCropName }) => {
    useGrowingCropPeriodList();

    return (
        <ListContainer>
            <ListHeader>Growing Crop Period List</ListHeader>
            <List>
                {Array.isArray(growingCropPeriods) && growingCropPeriods.length > 0 ? (
                    growingCropPeriods.map((gcp) => (
                        <ListItem key={gcp.id}>
                            <strong>Farm:</strong> {findFieldName(gcp.fieldId)} |&nbsp;
                            <strong>Soil:</strong> {findCropName(gcp.cropId)}
                        </ListItem>
                    ))
                ) : (
                    <ListItem>No growing crop periods available</ListItem>
                )}
            </List>
        </ListContainer>
    );
};

export default GrowingCropPeriodList;
