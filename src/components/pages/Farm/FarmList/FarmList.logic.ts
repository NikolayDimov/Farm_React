import { useState } from "react";
import { apiFarm } from "../../../../services/apiFarm";
import { Farm as FarmProp } from "../Farm.static";

interface UseFarmListProps {
    fetchFarms: () => Promise<void>;
}

const useFarmList = ({ fetchFarms }: UseFarmListProps) => {
    const [selectedFarmIdForDelete, setSelectedFarmIdForDelete] = useState<string | null>(null);
    const [selectedFarmIdForEdit, setSelectedFarmIdForEdit] = useState<string | null>(null);
    const [currentFarmName, setCurrentFarmName] = useState<string>("");
    const [originalFarmName, setOriginalFarmName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [farmDetails, setFarmDetails] = useState<FarmProp>();

    const onDeleteFarm = async (farmId: string) => {
        try {
            setLoading(true);

            const response = await apiFarm.deleteFarm(farmId);

            if (response.ok) {
                fetchFarms();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to delete farm with ID: ${farmId}`, responseBody);

                if (response.status === 400 && responseBody.error?.message) {
                    console.error("Error deleting crop:", responseBody.error?.message);
                }
            }
        } catch (error) {
            console.error("Error deleting farm:", error);
        } finally {
            setLoading(false);
        }
    };

    const onEditFarm = async (farmId: string, newFarmName: string) => {
        try {
            setLoading(true);
            const response = await apiFarm.editFarm(farmId, newFarmName);

            if (response.ok) {
                fetchFarms();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit farm with ID: ${farmId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing farm:", error);
        } finally {
            setLoading(false);
        }
    };

    const onDetailFarm = async (farmId: string) => {
        try {
            setLoading(true);
            const response = await apiFarm.getFarmDetails(farmId);

            if (response.ok) {
                const responseData = await response.json();
                setFarmDetails(responseData.data);
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit farm with ID: ${farmId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing farm:", error);
        } finally {
            setLoading(false);
        }
    };

    const onDeleteClick = (farmId: string) => {
        setSelectedFarmIdForDelete(farmId);
    };

    const onEditClick = (farmId: string, farmName: string) => {
        setSelectedFarmIdForEdit(farmId);
        setCurrentFarmName(farmName);
        setOriginalFarmName(farmName);
    };

    const onDetailsClick = (farmId: string) => {
        onDetailFarm(farmId);
    };

    const onDeleteConfirm = async () => {
        if (selectedFarmIdForDelete) {
            await onDeleteFarm(selectedFarmIdForDelete);
            setSelectedFarmIdForDelete(null);
        }
    };

    const onEditConfirm = async () => {
        try {
            if (selectedFarmIdForEdit) {
                await onEditFarm(selectedFarmIdForEdit, currentFarmName);
                fetchFarms();
            }

            setSelectedFarmIdForEdit(null);
            setCurrentFarmName("");
        } catch (error) {
            console.error("Error handling edit confirmation:", error);
        }
    };

    return {
        onDeleteClick,
        onEditClick,
        onDetailsClick,
        currentFarmName,
        setCurrentFarmName,
        originalFarmName,
        onDeleteConfirm,
        onEditConfirm,
        farmDetails,
    };
};

export default useFarmList;
