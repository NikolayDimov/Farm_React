import React, { useEffect, useState } from "react";
import { Soil } from "./Soil.static";
import { apiSoil } from "../../../services/apiSoil";
import SoilPresentation from "./SoilPresentation";

const SoilLogic: React.FC = () => {
    const [soils, setSoils] = useState<Soil[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [confirmation, setConfirmation] = useState(false);

    const fetchSoils = async () => {
        try {
            const soilData = await apiSoil.fetchSoils();
            setSoils(soilData.data);
        } catch (error) {
            console.error("Error in fetching soils", error);
        }
    };

    useEffect(() => {
        fetchSoils();
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

    const handleDeleteSoil = async (soilId: string) => {
        try {
            setLoading(true);

            const response = await apiSoil.deleteSoil(soilId);

            if (response.ok) {
                setSoils((prevSoils) => prevSoils.filter((soil) => soil.id !== soilId));
            } else {
                const responseBody = await response.json();
                console.error(`Failed to delete soil with ID: ${soilId}`, responseBody);

                if (response.status === 400 && responseBody.error?.message) {
                    showModal(responseBody.error.message);
                    setConfirmation(true);
                } else {
                    showModal("Failed to delete soil");
                }
            }
        } catch (error) {
            console.error("Error deleting soil:", error);
            showModal("Failed to delete soil");
        } finally {
            setLoading(false);
        }
    };

    const handleEditSoil = async (soilId: string, newSoilName: string) => {
        try {
            setLoading(true);
            const originalOrder: Soil[] = [...soils];
            const response = await apiSoil.editSoil(soilId, newSoilName);

            if (response.ok) {
                const updatedSoilData = await apiSoil.fetchSoils();
                setSoils(originalOrder.map((originalSoil: Soil) => updatedSoilData.data.find((updatedSoil: Soil) => updatedSoil.id === originalSoil.id) as Soil));
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit soil with ID: ${soilId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing soil:", error);
            showModal("Failed to edit soil");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SoilPresentation
            soils={soils}
            onDeleteSoil={handleDeleteSoil}
            onEditSoil={handleEditSoil}
            fetchSoils={fetchSoils}
            modalVisible={modalVisible}
            modalMessage={modalMessage}
            loading={loading}
            confirmation={confirmation}
            setModalVisible={setModalVisible}
        />
    );
};

export default SoilLogic;
