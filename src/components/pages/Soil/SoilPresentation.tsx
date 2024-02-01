import React from "react";
import { Soil } from "./Soil.static";
import { ModalOverlay, StyledModalContainer, modalContentStyles, closeButtonStyles } from "../../BaseLayout/BaseLayout.style";
import AddSoilLogic from "./AddSoil/AddSoilLogic";
import SoilListLogic from "./SoilList/SoilListLogic";

interface SoilPresentationProps {
    soils: Soil[];
    onDeleteSoil: (soilId: string) => void;
    onEditSoil: (soilId: string, newSoilName: string) => void;
    fetchSoils: () => void;
    modalVisible: boolean;
    modalMessage: string;
    loading: boolean;
    confirmation: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const SoilPresentation: React.FC<SoilPresentationProps> = ({ soils, onDeleteSoil, onEditSoil, fetchSoils, modalVisible, modalMessage, loading, confirmation, setModalVisible }) => {
    return (
        <>
            <AddSoilLogic fetchSoils={fetchSoils} />
            <SoilListLogic soils={soils} onDeleteSoil={onDeleteSoil} onEditSoil={onEditSoil} />
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

export default SoilPresentation;
