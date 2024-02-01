import React from "react";
import { Crop } from "./Crop.static";
import AddCropLogic from "./AddCrop/AddCropLogic";
import { ModalOverlay, StyledModalContainer, modalContentStyles, closeButtonStyles } from "../../BaseLayout/BaseLayout.style";
import CropListLogic from "./CropList/CropListLogic";

interface CropPresentationProps {
    crops: Crop[];
    modalVisible: boolean;
    confirmation: boolean;
    modalMessage: string;
    onDeleteCrop: (cropId: string) => void;
    onEditCrop: (cropId: string, newCropName: string) => void;
    setModalVisible: (visible: boolean) => void;
    fetchCrops: () => void;
}

const CropPresentation: React.FC<CropPresentationProps> = ({ crops, modalVisible, confirmation, modalMessage, onDeleteCrop, onEditCrop, setModalVisible, fetchCrops }) => {
    return (
        <>
            <AddCropLogic fetchCrops={fetchCrops} />
            <CropListLogic crops={crops} onDeleteCrop={onDeleteCrop} onEditCrop={onEditCrop} />
            <ModalOverlay show={modalVisible} confirmation={false}>
                <StyledModalContainer confirmation={confirmation}>
                    <div style={modalContentStyles}>{confirmation ? "Soil cannot be deleted" : modalMessage}</div>
                    <div style={closeButtonStyles}>
                        <button onClick={() => setModalVisible(false)}>Close</button>
                    </div>
                </StyledModalContainer>
            </ModalOverlay>
        </>
    );
};

export default CropPresentation;
