import React, { useEffect, useState } from "react";
import { Farm } from "../Farm.static";
import FarmListPresentation from "./FarmListPresentation";
import { apiFarm } from "../../../../services/apiFarm";

interface FarmListLogicProps {
    farms: Farm[];
    onDeleteFarm: (farmId: string) => void;
    onEditFarm: (farmId: string, currentFarmName: string) => void;
}

const FarmListLogic: React.FC<FarmListLogicProps> = ({ farms, onDeleteFarm, onEditFarm }) => {
    const [selectedFarmIdForDelete, setSelectedFarmIdForDelete] = useState<string | null>(null);
    const [selectedFarmIdForEdit, setSelectedFarmIdForEdit] = useState<string | null>(null);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [currentFarmName, setCurrentFarmName] = useState<string>("");
    const [originalFarmName, setOriginalFarmName] = useState<string>("");

    const handleDeleteClick = (farmId: string | undefined) => {
        if (farmId) {
            setSelectedFarmIdForDelete(farmId);
            setDeleteModalVisible(true);
        }
    };

    const handleEditClick = (farmId: string | undefined, farmName: string) => {
        if (farmId) {
            setSelectedFarmIdForEdit(farmId);
            setCurrentFarmName(farmName);
            setOriginalFarmName(farmName);
            setEditModalVisible(true);
        }
    };

    const handleDeleteConfirm = async () => {
        if (selectedFarmIdForDelete) {
            await onDeleteFarm(selectedFarmIdForDelete);
            setSelectedFarmIdForDelete(null);
            setDeleteModalVisible(false);
        }
    };

    const handleDeleteCancel = () => {
        setSelectedFarmIdForDelete(null);
        setDeleteModalVisible(false);
    };

    const handleEditConfirm = async () => {
        try {
            if (selectedFarmIdForEdit) {
                await onEditFarm(selectedFarmIdForEdit, currentFarmName);
            }

            setSelectedFarmIdForEdit(null);
            setEditModalVisible(false);
            setCurrentFarmName("");
        } catch (error) {
            console.error("Error handling edit confirmation:", error);
        }
    };

    const handleEditCancel = () => {
        setSelectedFarmIdForEdit(null);
        setEditModalVisible(false);
        setCurrentFarmName("");
    };

    return (
        <FarmListPresentation
            farms={farms}
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick}
            isDeleteModalVisible={isDeleteModalVisible}
            isEditModalVisible={isEditModalVisible}
            currentFarmName={currentFarmName}
            originalFarmName={originalFarmName}
            setCurrentFarmName={setCurrentFarmName}
            handleDeleteConfirm={handleDeleteConfirm}
            handleDeleteCancel={handleDeleteCancel}
            handleEditConfirm={handleEditConfirm}
            handleEditCancel={handleEditCancel}
        />
    );
};

export default FarmListLogic;
