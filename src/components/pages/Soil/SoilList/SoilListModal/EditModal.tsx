import React, { useState, useEffect } from "react";
import Modal from "../../../../common/ModalList/Modal";

interface EditModalProps {
    isVisible: boolean;
    hideModal: () => void;
    currentSoilName: string;
    setCurrentSoilName: (newSoilName: string) => void; // Add this prop
    onConfirm: (newSoilName: string) => void;
}

const EditSoilModal: React.FC<EditModalProps> = ({
    isVisible,
    hideModal,
    currentSoilName,
    setCurrentSoilName, // Add this prop
    onConfirm,
}) => {
    const [newSoilName, setNewSoilName] = useState(currentSoilName);

    useEffect(() => {
        setNewSoilName(currentSoilName);
    }, [currentSoilName]);

    const handleConfirm = () => {
        onConfirm(newSoilName);
        hideModal();
    };

    return (
        <Modal isVisible={isVisible} hideModal={hideModal} onConfirm={handleConfirm} showConfirmButton={true}>
            <p>Current Soil Name: {currentSoilName}</p>
            <input
                type="text"
                placeholder="Enter new soil name"
                value={newSoilName}
                onChange={(e) => {
                    setNewSoilName(e.target.value);
                    setCurrentSoilName(e.target.value);
                }}
            />
        </Modal>
    );
};

export default EditSoilModal;
