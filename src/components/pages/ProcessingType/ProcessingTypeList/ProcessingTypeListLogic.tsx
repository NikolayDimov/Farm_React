import React, { useState } from "react";
import { ProcessingType } from "../ProcessingType.static";
import ProcessingTypeListPresentation from "./ProcessingTypeListPresentation";

interface ProcessingTypeListLogicProps {
    processingTypes: ProcessingType[];
    onDeleteProcessingType: (processingTypeId: string) => void;
    onEditProcessingType: (processingTypeId: string, currentProcessingTypeName: string) => void;
}

const ProcessingTypeListLogic: React.FC<ProcessingTypeListLogicProps> = ({ processingTypes, onDeleteProcessingType, onEditProcessingType }) => {
    const [selectedProcessingTypeIdForDelete, setSelectedProcessingTypeIdForDelete] = useState<string | null>(null);
    const [selectedProcessingTypeIdForEdit, setSelectedProcessingTypeIdForEdit] = useState<string | null>(null);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [currentProcessingTypeName, setCurrentProcessingTypeName] = useState<string>("");
    const [originalProcessingTypeName, setOriginalProcessingTypeName] = useState<string>("");

    const handleDeleteClick = (processingTypeId: string | undefined) => {
        if (processingTypeId) {
            setSelectedProcessingTypeIdForDelete(processingTypeId);
            setDeleteModalVisible(true);
        }
    };

    const handleEditClick = (processingTypeId: string | undefined, processingTypeName: string) => {
        if (processingTypeId) {
            setSelectedProcessingTypeIdForEdit(processingTypeId);
            setCurrentProcessingTypeName(processingTypeName);
            setOriginalProcessingTypeName(processingTypeName);
            setEditModalVisible(true);
        }
    };

    const handleDeleteConfirm = async () => {
        if (selectedProcessingTypeIdForDelete) {
            await onDeleteProcessingType(selectedProcessingTypeIdForDelete);
            setSelectedProcessingTypeIdForDelete(null);
            setDeleteModalVisible(false);
        }
    };

    const handleDeleteCancel = () => {
        setSelectedProcessingTypeIdForDelete(null);
        setDeleteModalVisible(false);
    };

    const handleEditConfirm = async () => {
        try {
            if (selectedProcessingTypeIdForEdit) {
                await onEditProcessingType(selectedProcessingTypeIdForEdit, currentProcessingTypeName);
            }

            setSelectedProcessingTypeIdForEdit(null);
            setEditModalVisible(false);
            setCurrentProcessingTypeName("");
        } catch (error) {
            console.error("Error handling edit confirmation:", error);
        }
    };

    const handleEditCancel = () => {
        setSelectedProcessingTypeIdForEdit(null);
        setEditModalVisible(false);
        setCurrentProcessingTypeName("");
    };

    return (
        <ProcessingTypeListPresentation
            processingTypes={processingTypes}
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick}
            isDeleteModalVisible={isDeleteModalVisible}
            isEditModalVisible={isEditModalVisible}
            currentProcessingTypeName={currentProcessingTypeName}
            originalProcessingTypeName={originalProcessingTypeName}
            setCurrentProcessingTypeName={setCurrentProcessingTypeName}
            handleDeleteConfirm={handleDeleteConfirm}
            handleDeleteCancel={handleDeleteCancel}
            handleEditConfirm={handleEditConfirm}
            handleEditCancel={handleEditCancel}
        />
    );
};

export default ProcessingTypeListLogic;
