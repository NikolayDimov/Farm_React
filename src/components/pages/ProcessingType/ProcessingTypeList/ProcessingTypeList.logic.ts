import { useState } from "react";
import { apiProcessingType } from "../../../../services/apiProcessingType";
import { ProcessingType as ProcessingTypeProp } from "../ProcessingType.static";

interface UseProcessingTypeListProps {
    fetchProcessingTypes: () => Promise<void>;
}

const useProcessingTypeList = ({ fetchProcessingTypes }: UseProcessingTypeListProps) => {
    const [selectedProcessingTypeIdForDelete, setSelectedProcessingTypeIdForDelete] = useState<string | null>(null);
    const [selectedProcessingTypeIdForEdit, setSelectedProcessingTypeIdForEdit] = useState<string | null>(null);
    const [currentProcessingTypeName, setCurrentProcessingTypeName] = useState<string>("");
    const [originalProcessingTypeName, setOriginalProcessingTypeName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [processingTypeDetails, setProcessingTypeDetails] = useState<ProcessingTypeProp>();

    const onDeleteProcessingType = async (processingTypeId: string) => {
        try {
            setLoading(true);
            const response = await apiProcessingType.deleteProcessingType(processingTypeId);

            if (response.ok) {
                fetchProcessingTypes();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to delete processingType with ID: ${processingTypeId}`, responseBody);

                if (response.status === 400 && responseBody.error?.message) {
                    console.error("Error deleting crop:", responseBody.error?.message);
                }
            }
        } catch (error) {
            console.error("Error deleting processingType:", error);
        } finally {
            setLoading(false);
        }
    };

    const onEditProcessingType = async (processingTypeId: string, newProcessingTypeName: string) => {
        try {
            setLoading(true);
            const response = await apiProcessingType.editProcessingType(processingTypeId, newProcessingTypeName);

            if (response.ok) {
                fetchProcessingTypes();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit processingType with ID: ${processingTypeId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing processingType:", error);
        } finally {
            setLoading(false);
        }
    };

    const onDetailProcessingType = async (processingTypeId: string) => {
        try {
            setLoading(true);
            const response = await apiProcessingType.getProcessingTypeDetails(processingTypeId);

            if (response.ok) {
                const responseData = await response.json();
                setProcessingTypeDetails(responseData.data);
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit processingType with ID: ${processingTypeId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing processingType:", error);
        } finally {
            setLoading(false);
        }
    };

    const onDeleteClick = (processingTypeId: string) => {
        setSelectedProcessingTypeIdForDelete(processingTypeId);
    };

    const onEditClick = (processingTypeId: string, processingTypeName: string) => {
        setSelectedProcessingTypeIdForEdit(processingTypeId);
        setCurrentProcessingTypeName(processingTypeName);
        setOriginalProcessingTypeName(processingTypeName);
    };

    const onDetailsClick = (processingTypeId: string) => {
        onDetailProcessingType(processingTypeId);
    };

    const onDeleteConfirm = async () => {
        if (selectedProcessingTypeIdForDelete) {
            await onDeleteProcessingType(selectedProcessingTypeIdForDelete);
            setSelectedProcessingTypeIdForDelete(null);
        }
    };

    const onEditConfirm = async () => {
        try {
            if (selectedProcessingTypeIdForEdit) {
                await onEditProcessingType(selectedProcessingTypeIdForEdit, currentProcessingTypeName);
                fetchProcessingTypes();
            }

            setSelectedProcessingTypeIdForEdit(null);
            setCurrentProcessingTypeName("");
        } catch (error) {
            console.error("Error handling edit confirmation:", error);
        }
    };

    return {
        onDeleteClick,
        onEditClick,
        onDetailsClick,
        currentProcessingTypeName,
        setCurrentProcessingTypeName,
        originalProcessingTypeName,
        onDeleteConfirm,
        onEditConfirm,
        processingTypeDetails,
    };
};

export default useProcessingTypeList;
