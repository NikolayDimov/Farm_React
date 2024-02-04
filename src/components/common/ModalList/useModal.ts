import { useState } from "react";

interface UseModalProps {
    initialVisibility?: boolean;
}

const useModal = ({ initialVisibility = false }: UseModalProps = {}) => {
    const [isVisible, setIsVisible] = useState(initialVisibility);

    const showModal = () => setIsVisible(true);
    const hideModal = () => setIsVisible(false);

    return {
        isVisible,
        showModal,
        hideModal,
    };
};

export default useModal;
