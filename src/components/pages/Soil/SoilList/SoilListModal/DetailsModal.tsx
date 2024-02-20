import React from "react";
import Modal from "../../../../common/ModalList/Modal";
import { Soil as SoilProp } from "../../Soil.static";

interface DetailsSoilModalProps {
    isVisible: boolean;
    hideModal: () => void;
    soilDetails: SoilProp | null;
}

const DetailsSoilModal: React.FC<DetailsSoilModalProps> = ({ isVisible, hideModal, soilDetails }) => {
    return (
        <Modal isVisible={isVisible} hideModal={hideModal} showConfirmButton={false}>
            <p>Soil Details:</p>
            {soilDetails && (
                <div>
                    <p>Soil Name: {soilDetails.name}</p>
                </div>
            )}
        </Modal>
    );
};

export default DetailsSoilModal;
