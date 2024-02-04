import { useState } from "react";
import { apiProcessing } from "../../../../services/apiProcessing";
import { Processing as ProcessingProp } from "../Processing.static";

interface UseProcessingListProps {
    fetchProcessings: () => Promise<void>;
}

const useProcessingList = ({ fetchProcessings }: UseProcessingListProps) => {
    const [selectedProcessingIdForDelete, setSelectedProcessingIdForDelete] = useState<string | null>(null);
    const [selectedProcessingIdForEdit, setSelectedProcessingIdForEdit] = useState<string | null>(null);
    const [currentProcessingDate, setCurrentProcessingDate] = useState<Date | undefined>();
    const [originalProcessingDate, setOriginalProcessingDate] = useState<string>("");
    const [selectedProcessingTypeId, setSelectedProcessingTypeId] = useState<string>("");
    const [selectedMachinedId, setSelectedMachineId] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [processingDetails, setProcessingDetails] = useState<ProcessingProp>();

    const onDeleteProcessing = async (processingId: string) => {
        try {
            setLoading(true);

            const response = await apiProcessing.deleteProcessing(processingId);

            if (response.ok) {
                fetchProcessings();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to delete Processing with ID: ${processingId}`, responseBody);

                if (response.status === 400 && responseBody.error?.message) {
                    console.error("Error deleting crop:", responseBody.error?.message);
                }
            }
        } catch (error) {
            console.error("Error deleting Processing:", error);
        } finally {
            setLoading(false);
        }
    };

    const onEditProcessing = async (processingId: string, newProcessingDate: Date, newProcessingTypeId: string, newMachineId: string) => {
        try {
            setLoading(true);
            //const originalOrder: ProcessingProp[] = [...processings];
            const response = await apiProcessing.editProcessing(processingId, newProcessingDate, newProcessingTypeId, newMachineId);

            if (response.ok) {
                fetchProcessings();
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit processing with ID: ${processingId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing processing:", error);
        } finally {
            setLoading(false);
        }
    };

    const onDetailProcessing = async (processingId: string) => {
        try {
            setLoading(true);
            const response = await apiProcessing.getProcessingDetails(processingId);

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                setProcessingDetails(responseData.data);
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit processing with ID: ${processingId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing processing:", error);
        } finally {
            setLoading(false);
        }
    };

    const onDeleteClick = (processingId: string | undefined) => {
        if (processingId) {
            setSelectedProcessingIdForDelete(processingId);
        }
    };

    const onEditClick = (processingId: string | undefined, processingDate: Date, processingTypeId: string, machineId: string) => {
        if (processingId && processingDate) {
            setSelectedProcessingIdForEdit(processingId);
            setCurrentProcessingDate(processingDate);
            setSelectedProcessingTypeId(processingTypeId);
            setSelectedMachineId(machineId);
        }
    };

    const onDetailsClick = (processingId: string) => {
        onDetailProcessing(processingId);
    };

    const onDeleteConfirm = async () => {
        if (selectedProcessingIdForDelete) {
            await onDeleteProcessing(selectedProcessingIdForDelete);
            setSelectedProcessingIdForDelete(null);
        }
    };

    const onEditConfirm = async () => {
        try {
            if (selectedProcessingIdForEdit && currentProcessingDate) {
                await onEditProcessing(selectedProcessingIdForEdit, currentProcessingDate, selectedProcessingTypeId, selectedMachinedId);
            }

            setSelectedProcessingIdForEdit(null);
            setOriginalProcessingDate("");
            setSelectedProcessingTypeId("");
            setSelectedMachineId("");
        } catch (error) {
            console.error("Error handling edit confirmation:", error);
        }
    };

    return {
        onDeleteClick,
        onEditClick,
        onDetailsClick,
        currentProcessingDate,
        originalProcessingDate,
        onEditConfirm,
        onDeleteConfirm,
        setSelectedProcessingTypeId,
        setSelectedMachineId,
        setCurrentProcessingDate,
        selectedProcessingTypeId,
        selectedMachinedId,
        processingDetails,
    };
};

export default useProcessingList;
