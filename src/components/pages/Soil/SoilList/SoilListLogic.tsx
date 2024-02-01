import React, { useState } from "react";
import SoilListPresentation from "./SoilListPresentation";
import { Soil } from "../Soil.static";

interface SoilListLogicProps {
    soils: Soil[];
    onDeleteSoil: (soilId: string) => void;
    onEditSoil: (soilId: string, currentSoilName: string) => void;
}

const SoilListLogic: React.FC<SoilListLogicProps> = ({ soils, onDeleteSoil, onEditSoil }) => {
    const [selectedSoilIdForDelete, setSelectedSoilIdForDelete] = useState<string | null>(null);
    const [selectedSoilIdForEdit, setSelectedSoilIdForEdit] = useState<string | null>(null);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [currentSoilName, setCurrentSoilName] = useState<string>("");
    const [originalSoilName, setOriginalSoilName] = useState<string>("");

    const handleDeleteClick = (soilId: string | undefined) => {
        if (soilId) {
            setSelectedSoilIdForDelete(soilId);
            setDeleteModalVisible(true);
        }
    };

    const handleEditClick = (soilId: string | undefined, soilName: string) => {
        if (soilId) {
            setSelectedSoilIdForEdit(soilId);
            setCurrentSoilName(soilName);
            setOriginalSoilName(soilName);
            setEditModalVisible(true);
        }
    };

    const handleDeleteConfirm = async () => {
        if (selectedSoilIdForDelete) {
            await onDeleteSoil(selectedSoilIdForDelete);
            setSelectedSoilIdForDelete(null);
            setDeleteModalVisible(false);
        }
    };

    const handleDeleteCancel = () => {
        setSelectedSoilIdForDelete(null);
        setDeleteModalVisible(false);
    };

    const handleEditConfirm = async () => {
        try {
            if (selectedSoilIdForEdit) {
                await onEditSoil(selectedSoilIdForEdit, currentSoilName);
            }

            setSelectedSoilIdForEdit(null);
            setEditModalVisible(false);
            setCurrentSoilName("");
        } catch (error) {
            console.error("Error handling edit confirmation:", error);
        }
    };

    const handleEditCancel = () => {
        setSelectedSoilIdForEdit(null);
        setEditModalVisible(false);
        setCurrentSoilName("");
    };

    return (
        <SoilListPresentation
            soils={soils}
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick}
            isDeleteModalVisible={isDeleteModalVisible}
            isEditModalVisible={isEditModalVisible}
            currentSoilName={currentSoilName}
            originalSoilName={originalSoilName}
            setCurrentSoilName={setCurrentSoilName}
            handleDeleteConfirm={handleDeleteConfirm}
            handleDeleteCancel={handleDeleteCancel}
            handleEditConfirm={handleEditConfirm}
            handleEditCancel={handleEditCancel}
        />
    );
};

export default SoilListLogic;
