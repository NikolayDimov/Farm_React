import { useState } from "react";
import { apiSoil } from "../../../../services/apiSoil";
import { Soil as SoilProp } from "../Soil.static";

interface UseSoilListProps {
    fetchSoils: () => Promise<void>;
}

const useSoilList = ({ fetchSoils }: UseSoilListProps) => {
    const [selectedSoilIdForDelete, setSelectedSoilIdForDelete] = useState<string | null>(null);
    const [selectedSoilIdForEdit, setSelectedSoilIdForEdit] = useState<string | null>(null);
    const [currentSoilName, setCurrentSoilName] = useState<string>("");
    const [originalSoilName, setOriginalSoilName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [soilDetails, setSoilDetails] = useState<SoilProp>();

    const onDeleteSoil = async (soilId: string) => {
        try {
            setLoading(true);
            const response = await apiSoil.deleteSoil(soilId);

            if (response.ok) {
                fetchSoils();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to delete soil with ID: ${soilId}`, responseBody);

                if (response.status === 400 && responseBody.error?.message) {
                    console.error("Error deleting crop:", responseBody.error?.message);
                }
            }
        } catch (error) {
            console.error("Error deleting soil:", error);
        } finally {
            setLoading(false);
        }
    };

    const onEditSoil = async (soilId: string, newSoilName: string) => {
        try {
            setLoading(true);
            const response = await apiSoil.editSoil(soilId, newSoilName);

            if (response.ok) {
                fetchSoils();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit soil with ID: ${soilId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing soil:", error);
        } finally {
            setLoading(false);
        }
    };

    const onDetailSoil = async (soilId: string) => {
        try {
            setLoading(true);
            const response = await apiSoil.getSoilDetails(soilId);

            if (response.ok) {
                const responseData = await response.json();
                setSoilDetails(responseData.data);
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit soil with ID: ${soilId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing soil:", error);
        } finally {
            setLoading(false);
        }
    };

    const onDeleteClick = (soilId: string) => {
        setSelectedSoilIdForDelete(soilId);
    };

    const onEditClick = (soilId: string, soilName: string) => {
        setSelectedSoilIdForEdit(soilId);
        setCurrentSoilName(soilName);
        setOriginalSoilName(soilName);
    };

    const onDetailsClick = (soilId: string) => {
        onDetailSoil(soilId);
    };

    const onDeleteConfirm = async () => {
        if (selectedSoilIdForDelete) {
            await onDeleteSoil(selectedSoilIdForDelete);
            setSelectedSoilIdForDelete(null);
        }
    };

    const onEditConfirm = async () => {
        try {
            if (selectedSoilIdForEdit) {
                await onEditSoil(selectedSoilIdForEdit, currentSoilName);
                fetchSoils();
            }

            setSelectedSoilIdForEdit(null);
            setCurrentSoilName("");
        } catch (error) {
            console.error("Error handling edit confirmation:", error);
        }
    };

    return {
        onDeleteClick,
        onEditClick,
        onDetailsClick,
        currentSoilName,
        setCurrentSoilName,
        originalSoilName,
        onDeleteConfirm,
        onEditConfirm,
        soilDetails,
    };
};

export default useSoilList;
