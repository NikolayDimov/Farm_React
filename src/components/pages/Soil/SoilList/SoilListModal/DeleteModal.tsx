import React from "react";
import Modal from "../../../../common/ModalList/Modal";

interface DeleteModalProps {
    isVisible: boolean;
    hideModal: () => void;
    onDeleteConfirm: () => void;
}

const DeleteSoilModal: React.FC<DeleteModalProps> = ({ isVisible, hideModal, onDeleteConfirm }) => {
    return (
        <Modal isVisible={isVisible} hideModal={hideModal} onConfirm={onDeleteConfirm} showConfirmButton={true}>
            <p>Are you sure you want to delete this soil?</p>
        </Modal>
    );
};

export default DeleteSoilModal;
