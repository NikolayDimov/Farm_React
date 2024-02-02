import React, { useState } from "react";
import { Field } from "../Field.static";
import { Farm } from "../../Farm/Farm.static";
import { Soil } from "../../Soil/Soil.static";
import FieldListPresentation from "./FieldList";

interface FieldListLogicProps {
    fields: Field[];
    farms: Farm[];
    soils: Soil[];
    onDeleteField: (fieldId: string) => void;
    onEditField: (fieldId: string, currentFieldName: string, newSoilId: string) => void;
}

const FieldListLogic: React.FC<FieldListLogicProps> = ({ fields, farms, soils, onDeleteField, onEditField }) => {
    const [selectedFieldIdForDelete, setSelectedFieldIdForDelete] = useState<string | null>(null);
    const [selectedFieldIdForEdit, setSelectedFieldIdForEdit] = useState<string | null>(null);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [currentFieldName, setCurrentFieldName] = useState<string>("");
    const [originalFieldName, setOriginalFieldName] = useState<string>("");
    const [selectedSoilId, setSelectedSoilId] = useState<string>("");

    const findFarmName = (farmId: string): string => {
        const farm = farms.find((farm) => farm.id === farmId);
        return farm ? farm.name : "Unknown Farm";
    };

    const findSoilName = (soilId: string): string => {
        const soil = soils.find((soil) => soil.id === soilId);
        return soil ? soil.name : "Unknown Soil";
    };

    const handleDeleteClick = (fieldId: string | undefined) => {
        if (fieldId) {
            setSelectedFieldIdForDelete(fieldId);
            setDeleteModalVisible(true);
        }
    };

    const handleEditClick = (fieldId: string | undefined, fieldName: string, soilId: string) => {
        if (fieldId) {
            setSelectedFieldIdForEdit(fieldId);
            setCurrentFieldName(fieldName);
            setOriginalFieldName(fieldName);
            setSelectedSoilId(soilId);
            setEditModalVisible(true);
        }
    };

    const handleDeleteConfirm = async () => {
        if (selectedFieldIdForDelete) {
            await onDeleteField(selectedFieldIdForDelete);
            setSelectedFieldIdForDelete(null);
            setDeleteModalVisible(false);
        }
    };

    const handleDeleteCancel = () => {
        setSelectedFieldIdForDelete(null);
        setDeleteModalVisible(false);
    };

    const handleEditConfirm = async () => {
        try {
            if (selectedFieldIdForEdit) {
                await onEditField(selectedFieldIdForEdit, currentFieldName, selectedSoilId);
            }

            setSelectedFieldIdForEdit(null);
            setEditModalVisible(false);
            setCurrentFieldName("");
            setSelectedSoilId("");
        } catch (error) {
            console.error("Error handling edit confirmation:", error);
        }
    };

    const handleEditCancel = () => {
        setSelectedFieldIdForEdit(null);
        setEditModalVisible(false);
        setCurrentFieldName("");
        setSelectedSoilId("");
    };

    return (
        <FieldListPresentation
            fields={fields}
            soils={soils}
            findFarmName={findFarmName}
            findSoilName={findSoilName}
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick}
            isDeleteModalVisible={isDeleteModalVisible}
            isEditModalVisible={isEditModalVisible}
            currentFieldName={currentFieldName}
            originalFieldName={originalFieldName}
            setCurrentFieldName={setCurrentFieldName}
            selectedSoilId={selectedSoilId}
            setSelectedSoilId={setSelectedSoilId}
            handleDeleteConfirm={handleDeleteConfirm}
            handleDeleteCancel={handleDeleteCancel}
            handleEditConfirm={handleEditConfirm}
            handleEditCancel={handleEditCancel}
        />
    );
};

export default FieldListLogic;
