import React, { useEffect, useState } from "react";
import FarmPresentation from "./FarmPresentation";
import { Farm } from "./Farm.static";
import { apiFarm } from "../../../services/apiFarm";

const FarmLogic: React.FC = () => {
    const [farms, setFarms] = useState<Farm[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [confirmation, setConfirmation] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<number[]>([]);

    const fetchFarms = async () => {
        try {
            const farmData = await apiFarm.fetchFarms();
            setFarms(farmData.data);
        } catch (error) {
            console.error("Error in fetching farms", error);
        }
    };

    useEffect(() => {
        fetchFarms();
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

    const handleDeleteFarm = async (farmId: string) => {
        try {
            setLoading(true);

            const response = await apiFarm.deleteFarm(farmId);

            if (response.ok) {
                setFarms((prevFarms) => prevFarms.filter((farm) => farm.id !== farmId));
            } else {
                const responseBody = await response.json();
                console.error(`Failed to delete farm with ID: ${farmId}`, responseBody);

                if (response.status === 400 && responseBody.error?.message) {
                    showModal(responseBody.error.message);
                    setConfirmation(true);
                } else {
                    showModal("Failed to delete farm");
                }
            }
        } catch (error) {
            console.error("Error deleting farm:", error);

            showModal("Failed to delete farm");
        } finally {
            setLoading(false);
        }
    };

    const handleEditFarm = async (farmId: string, newFarmName: string) => {
        try {
            setLoading(true);
            const originalOrder: Farm[] = [...farms];
            const response = await apiFarm.editFarm(farmId, newFarmName);

            if (response.ok) {
                const updatedFarmData = await apiFarm.fetchFarms();
                setFarms(originalOrder.map((originalFarm: Farm) => updatedFarmData.data.find((updatedFarm: Farm) => updatedFarm.id === originalFarm.id) as Farm));
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit farm with ID: ${farmId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing farm:", error);
            showModal("Failed to edit farm");
        } finally {
            setLoading(false);
        }
    };

    const onSelectLocation = (coordinates: number[]) => {
        setSelectedLocation(coordinates);
    };

    return (
        <FarmPresentation
            farms={farms}
            modalVisible={modalVisible}
            confirmation={confirmation}
            modalMessage={modalMessage}
            onDeleteFarm={handleDeleteFarm}
            onEditFarm={handleEditFarm}
            setModalVisible={setModalVisible}
            fetchFarms={fetchFarms}
            selectedLocation={selectedLocation}
            onSelectLocation={onSelectLocation}
        />
    );
};

export default FarmLogic;
