import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UseModalProps {
    initialVisibility?: boolean;
    onModalOpen?: () => void; // New callback for modal opening
}

const useModal = ({ initialVisibility = false, onModalOpen }: UseModalProps = {}) => {
    const [isVisible, setIsVisible] = useState(initialVisibility);
    const navigate = useNavigate();

    const showModal = () => {
        setIsVisible(true);
        onModalOpen && onModalOpen();
    };

    const hideModal = () => setIsVisible(false);

    return {
        isVisible,
        showModal,
        hideModal,
        navigate,
    };
};

export default useModal;
