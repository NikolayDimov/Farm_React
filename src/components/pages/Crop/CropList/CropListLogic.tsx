import React, { useState } from "react";
import { Crop } from "../Crop.static";
import CropListPresentation from "./CropListPresentation";

interface CropListLogicProps {
    crops: Crop[];
    onDeleteCrop: (cropId: string) => void;
    onEditCrop: (cropId: string, currentCropName: string) => void;
}

const CropListLogic: React.FC<CropListLogicProps> = ({ crops, onDeleteCrop, onEditCrop }) => {
    const [selectedCropIdForDelete, setSelectedCropIdForDelete] = useState<string | null>(null);
    const [selectedCropIdForEdit, setSelectedCropIdForEdit] = useState<string | null>(null);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [currentCropName, setCurrentCropName] = useState<string>("");
    const [originalCropName, setOriginalCropName] = useState<string>("");

    const handleDeleteClick = (cropId: string | undefined) => {
        if (cropId) {
            setSelectedCropIdForDelete(cropId);
            setDeleteModalVisible(true);
        }
    };

    const handleEditClick = (cropId: string | undefined, cropName: string) => {
        if (cropId) {
            setSelectedCropIdForEdit(cropId);
            setCurrentCropName(cropName);
            setOriginalCropName(cropName);
            setEditModalVisible(true);
        }
    };

    const handleDeleteConfirm = async () => {
        if (selectedCropIdForDelete) {
            await onDeleteCrop(selectedCropIdForDelete);
            setSelectedCropIdForDelete(null);
            setDeleteModalVisible(false);
        }
    };

    const handleDeleteCancel = () => {
        setSelectedCropIdForDelete(null);
        setDeleteModalVisible(false);
    };

    const handleEditConfirm = async () => {
        try {
            if (selectedCropIdForEdit) {
                await onEditCrop(selectedCropIdForEdit, currentCropName);
            }

            setSelectedCropIdForEdit(null);
            setEditModalVisible(false);
            setCurrentCropName("");
        } catch (error) {
            console.error("Error handling edit confirmation:", error);
        }
    };

    const handleEditCancel = () => {
        setSelectedCropIdForEdit(null);
        setEditModalVisible(false);
        setCurrentCropName("");
    };

    return (
        <CropListPresentation
            crops={crops}
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick}
            isDeleteModalVisible={isDeleteModalVisible}
            isEditModalVisible={isEditModalVisible}
            currentCropName={currentCropName}
            originalCropName={originalCropName}
            setCurrentCropName={setCurrentCropName}
            handleDeleteConfirm={handleDeleteConfirm}
            handleDeleteCancel={handleDeleteCancel}
            handleEditConfirm={handleEditConfirm}
            handleEditCancel={handleEditCancel}
        />
    );
};

export default CropListLogic;
