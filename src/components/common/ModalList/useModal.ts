import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UseModalProps {
    initialVisibility?: boolean;
    onModalOpen?: () => void;
}

const useModal = ({ initialVisibility = false, onModalOpen }: UseModalProps = {}) => {
    const [isVisible, setIsVisible] = useState(initialVisibility);
    const [originalPath, setOriginalPath] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Store the current path when the component mounts
        setOriginalPath(window.location.pathname);
    }, []);

    const showModal = () => {
        setIsVisible(true);
        onModalOpen && onModalOpen();
    };

    const hideModal = () => {
        setIsVisible(false);
        // Reset the URL when hiding the modal
        navigate(originalPath, { replace: true });
    };

    return {
        isVisible,
        showModal,
        hideModal,
        navigate,
    };
};

export default useModal;
