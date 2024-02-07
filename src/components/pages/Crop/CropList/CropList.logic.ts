import { useState } from "react";
import { apiCrop } from "../../../../services/apiCrop";
import { Crop as CropProp } from "../Crop.static";
import { useNavigate } from "react-router-dom";

interface UseCropListProps {
    fetchCrops: () => Promise<void>;
}

const useCropList = ({ fetchCrops }: UseCropListProps) => {
    const [selectedCropIdForDelete, setSelectedCropIdForDelete] = useState<string | null>(null);
    const [selectedCropIdForEdit, setSelectedCropIdForEdit] = useState<string | null>(null);
    const [currentCropName, setCurrentCropName] = useState<string>("");
    const [originalCropName, setOriginalCropName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [cropDetails, setCropDetails] = useState<CropProp>();
    const navigate = useNavigate();

    const onDeleteCrop = async (cropId: string) => {
        try {
            setLoading(true);
            const response = await apiCrop.deleteCrop(cropId);

            if (response.ok) {
                fetchCrops();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to delete crop with ID: ${cropId}`, responseBody);

                if (response.status === 400 && responseBody.error?.message) {
                    console.error("Error deleting crop:", responseBody.error?.message);
                }
            }
        } catch (error) {
            console.error("Error deleting crop:", error);
        } finally {
            setLoading(false);
        }
    };

    const onEditCrop = async (cropId: string, newCropName: string) => {
        try {
            setLoading(true);
            const response = await apiCrop.editCrop(cropId, newCropName);

            if (response.ok) {
                navigate(`/service/crop/${cropId}`);
                fetchCrops();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit crop with ID: ${cropId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing crop:", error);
        } finally {
            setLoading(false);
        }
    };

    const onDetailCrop = async (cropId: string) => {
        try {
            setLoading(true);
            const response = await apiCrop.getCropDetails(cropId);

            if (response.ok) {
                const responseData = await response.json();
                setCropDetails(responseData.data);
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit crop with ID: ${cropId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing crop:", error);
        } finally {
            setLoading(false);
        }
    };

    const onDeleteClick = (cropId: string) => {
        setSelectedCropIdForDelete(cropId);
    };

    const onEditClick = (cropId: string, cropName: string) => {
        setSelectedCropIdForEdit(cropId);
        setCurrentCropName(cropName);
        setOriginalCropName(cropName);
        navigate(`/service/crop/${cropId}`);
    };

    const onDetailsClick = (cropId: string) => {
        onDetailCrop(cropId);
    };

    const onDeleteConfirm = async () => {
        if (selectedCropIdForDelete) {
            await onDeleteCrop(selectedCropIdForDelete);
            setSelectedCropIdForDelete(null);
        }
    };

    const onEditConfirm = async () => {
        try {
            if (selectedCropIdForEdit) {
                await onEditCrop(selectedCropIdForEdit, currentCropName);
                fetchCrops();
            }

            setSelectedCropIdForEdit(null);
            setCurrentCropName("");
        } catch (error) {
            console.error("Error handling edit confirmation:", error);
        }
    };

    return {
        onDeleteClick,
        onEditClick,
        onDetailsClick,
        currentCropName,
        setCurrentCropName,
        originalCropName,
        onDeleteConfirm,
        onEditConfirm,
        cropDetails,
        selectedCropIdForEdit,
    };
};

export default useCropList;
