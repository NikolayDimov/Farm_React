import React from "react";
import AddFarmForm from "../Farm/AddFarm/AddFarmForm";
import { ModalOverlay, StyledModalContainer, modalContentStyles, closeButtonStyles } from "../../BaseLayout/BaseLayout.style";
import FarmListLogic from "./FarmList/FarmListLogic";
import MapContainer from "../Farm/MapContainer";
import { Farm } from "./Farm.static";
import Layout from "../../BaseLayout/common/Layout";

interface FarmPresentationProps {
    farms: Farm[];
    modalVisible: boolean;
    confirmation: boolean;
    modalMessage: string;
    onDeleteFarm: (farmId: string) => void;
    onEditFarm: (farmId: string, newFarmName: string) => void;
    setModalVisible: (visible: boolean) => void;
    fetchFarms: () => void;
    selectedLocation: number[];
    onSelectLocation: (coordinates: number[]) => void;
}

const FarmPresentation: React.FC<FarmPresentationProps> = ({
    farms,
    modalVisible,
    confirmation,
    modalMessage,
    onDeleteFarm,
    onEditFarm,
    setModalVisible,
    fetchFarms,
    selectedLocation,
    onSelectLocation,
}) => {
    return (
        <Layout>
            <MapContainer onSelectLocation={onSelectLocation} />
            {selectedLocation.length > 0 && <p>Selected Location: {JSON.stringify({ type: "Point", coordinates: selectedLocation })}</p>}
            <AddFarmForm fetchFarms={fetchFarms} />
            <FarmListLogic farms={farms} onDeleteFarm={onDeleteFarm} onEditFarm={onEditFarm} />

            <ModalOverlay show={modalVisible} confirmation={false}>
                <StyledModalContainer confirmation={confirmation}>
                    <div style={modalContentStyles}>{confirmation ? "Soil cannot be deleted" : modalMessage}</div>
                    <div style={closeButtonStyles}>
                        <button onClick={() => setModalVisible(false)}>Close</button>
                    </div>
                </StyledModalContainer>
            </ModalOverlay>
        </Layout>
    );
};

export default FarmPresentation;
