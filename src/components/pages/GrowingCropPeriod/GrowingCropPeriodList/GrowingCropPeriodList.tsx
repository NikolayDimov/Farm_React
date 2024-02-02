import React from "react";
import { GrowingCropPeriod } from "../GrowingCropPeriod.static";
import { Field } from "../../Field/Field.static";
import { Crop } from "../../Crop/Crop.static";
import { ListContainer, ListHeader, ListItem, List } from "../../../BaseLayout/common/ListStyles";

interface GrowingCropPeriodListPresentationProps {
    growingCropPeriods: GrowingCropPeriod[];
    fields: Field[];
    crops: Crop[];
    loading: boolean;
    findFieldName: (fieldId: string) => string;
    findCropName: (cropId: string) => string;
}

const GrowingCropPeriodListPresentation: React.FC<GrowingCropPeriodListPresentationProps> = ({ growingCropPeriods, fields, crops, loading, findFieldName, findCropName }) => {
    if (loading) {
        return <p>Loading growing crop periods...</p>;
    }

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

export default GrowingCropPeriodListPresentation;
