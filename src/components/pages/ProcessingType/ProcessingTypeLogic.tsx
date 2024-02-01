import React, { useEffect, useState } from "react";
import ProcessingTypePresentation from "./ProcessingTypePresentation";
import { ProcessingType } from "./ProcessingType.static";
import { apiProcessingType } from "../../../services/apiProcessingType";

const ProcessingTypeComponent: React.FC = () => {
    const [processingTypes, setProcessingTypes] = useState<ProcessingType[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [confirmation, setConfirmation] = useState(false);

    const fetchProcessingTypes = async () => {
        try {
            const processingTypeData = await apiProcessingType.fetchProcessingTypes();
            setProcessingTypes(processingTypeData.data);
        } catch (error) {
            console.error("Error in fetching ProcessingType", error);
        }
    };

    useEffect(() => {
        fetchProcessingTypes();
    }, []);

    const showModal = (message: string) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    useEffect(() => {
        if (modalVisible) {
            const timeoutId = setTimeout(() => {
                setModalVisible(false);
                setModalMessage("");
                setConfirmation(false);
            }, 5000);

            return () => clearTimeout(timeoutId);
        }
    }, [modalVisible]);

    const handleDeleteProcessingType = async (processingTypeId: string) => {
        try {
            setLoading(true);

            const response = await apiProcessingType.deleteProcessingType(processingTypeId);

            if (response.ok) {
                setProcessingTypes((prevProcessingTypes) => prevProcessingTypes.filter((processingType) => processingType.id !== processingTypeId));
            } else {
                const responseBody = await response.json();
                console.error(`Failed to delete ProcessingType with ID: ${processingTypeId}`, responseBody);

                if (response.status === 400 && responseBody.error?.message) {
                    showModal(responseBody.error.message);
                    setConfirmation(true);
                } else {
                    showModal("Failed to delete ProcessingType");
                }
            }
        } catch (error) {
            console.error("Error deleting ProcessingType:", error);

            showModal("Failed to delete ProcessingType");
        } finally {
            setLoading(false);
        }
    };

    const handleEditProcessingType = async (processingTypeId: string, newProcessingTypeName: string) => {
        try {
            setLoading(true);
            const originalOrder: ProcessingType[] = [...processingTypes];
            const response = await apiProcessingType.editProcessingType(processingTypeId, newProcessingTypeName);

            if (response.ok) {
                const updatedProcessingTypeData = await apiProcessingType.fetchProcessingTypes();
                setProcessingTypes(
                    originalOrder.map(
                        (originalProcessingType: ProcessingType) =>
                            updatedProcessingTypeData.data.find((updatedProcessingType: ProcessingType) => updatedProcessingType.id === originalProcessingType.id) as ProcessingType
                    )
                );
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit ProcessingType with ID: ${processingTypeId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing ProcessingType:", error);
            showModal("Failed to edit ProcessingType");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProcessingTypePresentation
            processingTypes={processingTypes}
            modalVisible={modalVisible}
            confirmation={confirmation}
            modalMessage={modalMessage}
            onDeleteProcessingType={handleDeleteProcessingType}
            onEditProcessingType={handleEditProcessingType}
            setModalVisible={setModalVisible}
            fetchProcessingTypes={fetchProcessingTypes}
        />
    );
};

export default ProcessingTypeComponent;
