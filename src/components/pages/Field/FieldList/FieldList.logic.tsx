import { useEffect, useState } from "react";
import { apiField } from "../../../../services/apiField";
import { UpdateField, Field as FieldProp } from "../Field.static";

interface UseFieldListProps {
    fetchFields: () => Promise<void>;
}

const useFieldList = ({ fetchFields }: UseFieldListProps) => {
    const [selectedFieldIdForDelete, setSelectedFieldIdForDelete] = useState<string | null>(null);
    const [selectedFieldIdForEdit, setSelectedFieldIdForEdit] = useState<string | null>(null);
    const [currentFieldName, setCurrentFieldName] = useState<string>("");
    const [originalFieldName, setOriginalFieldName] = useState<string>("");
    const [selectedFarmId, setSelectedFarmId] = useState<string>("");
    const [selectedSoilId, setSelectedSoilId] = useState<string>("");
    const [fieldDetails, setFieldDetails] = useState<FieldProp>();

    const [updatedCoordinates, setUpdatedCoordinates] = useState<[number, number][][] | undefined>(undefined);

    const onUnmountHandler = (polygon: google.maps.Polygon | null): [number, number][][] => {
        console.log("onUnmountHandler called");
        // Ensure polygon is defined before proceeding
        if (!polygon) {
            console.error("Polygon is not defined");
            return [];
        }

        // Convert LatLngLiteral to [number, number][]
        const paths = polygon.getPaths().getArray();
        const updatedCoords = paths[0].getArray().map((x) => [x.lat(), x.lng()] as [number, number]);

        // Convert [number, number][] to [number, number][][]
        const updatedCoordsArray: [number, number][][] = [updatedCoords];

        // Set the state with the converted type
        setUpdatedCoordinates(updatedCoordsArray);
        console.log("List logic Coordinates coming", updatedCoordsArray);

        return updatedCoordsArray;
    };

    useEffect(() => {
        console.log("useEffect updatedCoordinates:", updatedCoordinates);
        // Logic to handle the updated state
        console.log("List logic Coordinates changed", updatedCoordinates);
        // setUpdatedCoordinates(undefined);
    }, [updatedCoordinates]);

    const onDeleteField = async (fieldId: string) => {
        try {
            const response = await apiField.deleteField(fieldId);

            if (response.ok) {
                await fetchFields();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to delete field with ID: ${fieldId}`, responseBody);

                if (response.status === 400 && responseBody.error?.message) {
                    console.error("Error deleting crop:", responseBody.error?.message);
                }
            }
        } catch (error) {
            console.error("Error deleting Field:", error);
        }
    };

    const onEditField = async (fieldId: string, currentFieldName: string, selectedSoilId: string, newCoordinates: number[][][]) => {
        try {
            const updatedFieldData: UpdateField = {
                name: currentFieldName,
                boundary: {
                    type: "Polygon",
                    coordinates: newCoordinates,
                },
                soilId: selectedSoilId,
            };

            console.log("Updated Field Data:", updatedFieldData);
            const response = await apiField.editField(fieldId, updatedFieldData);
            console.log("Response from Server:", response);
            // const responseBody = await response.json();
            // console.log("Response Body:", responseBody);

            if (response.ok) {
                await fetchFields();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit field with ID: ${fieldId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing field:", error);
        }
    };

    const onDetailField = async (fieldId: string) => {
        try {
            const response = await apiField.getFieldDetails(fieldId);

            if (response.ok) {
                const responseData = await response.json();
                // console.log(responseData);
                setFieldDetails(responseData.data);
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit field with ID: ${fieldId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing field:", error);
        }
    };

    const onDeleteClick = (fieldId: string | undefined) => {
        if (fieldId) {
            setSelectedFieldIdForDelete(fieldId);
        }
    };

    const onEditClick = (fieldId: string | undefined, updatedFieldData: UpdateField) => {
        if (fieldId) {
            setSelectedFieldIdForEdit(fieldId);
            setCurrentFieldName(updatedFieldData.name);
            setOriginalFieldName(updatedFieldData.name);
            console.log("onEditClick", updatedFieldData.name);
            setSelectedSoilId(updatedFieldData.soilId);
        }
    };

    const onDetailsClick = (fieldId: string) => {
        onDetailField(fieldId);
    };

    const onDeleteConfirm = async () => {
        if (selectedFieldIdForDelete) {
            await onDeleteField(selectedFieldIdForDelete);
            setSelectedFieldIdForDelete(null);
        }
    };

    const onEditConfirm = async () => {
        try {
            console.log("selectedFieldIdForEdit", selectedFieldIdForEdit);
            console.log("newCoordinates", updatedCoordinates);

            if (selectedFieldIdForEdit && updatedCoordinates) {
                console.log("Calling onEditField");
                await onEditField(selectedFieldIdForEdit, currentFieldName, selectedSoilId, updatedCoordinates);
            }

            setSelectedFieldIdForEdit(null);
            setCurrentFieldName("");
            setSelectedSoilId("");
            // setUpdatedCoordinates(undefined); // Reset the coordinates after use
        } catch (error) {
            console.error("Error handling edit confirmation:", error);
        } finally {
            // Ensure that the coordinates state is cleared after it has been processed
            setUpdatedCoordinates(undefined);
        }
    };

    return {
        onDeleteClick,
        onEditClick,
        onDetailsClick,
        currentFieldName,
        originalFieldName,
        setSelectedFarmId,
        selectedFarmId,
        selectedSoilId,
        onEditConfirm,
        onDeleteConfirm,
        setCurrentFieldName,
        setSelectedSoilId,
        fieldDetails,
        setUpdatedCoordinates,
        onUnmountHandler,
    };
};

export default useFieldList;
