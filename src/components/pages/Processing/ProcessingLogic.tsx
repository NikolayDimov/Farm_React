import React, { useEffect, useState } from "react";
import ProcessingPresentation from "./ProcessingPresentation";
import { Processing } from "./Processing.static";
import { ProcessingType } from "../ProcessingType/ProcessingType.static";
import { Field } from "../Field/Field.static";
import { Crop } from "../Crop/Crop.static";
import { Machine } from "../Machine/Machine.static";
import { Farm } from "../Farm/Farm.static";
import { Soil } from "../Soil/Soil.static";
import { apiField } from "../../../services/apiField";
import { apiFarm } from "../../../services/apiFarm";
import { apiSoil } from "../../../services/apiSoil";
import { apiProcessing } from "../../../services/apiProcessing";
import { apiProcessingType } from "../../../services/apiProcessingType";
import { apiCrop } from "../../../services/apiCrop";
import { apiMachine } from "../../../services/apiMachine";
import { apiGrowingCropPeriod } from "../../../services/apiGrowingCropPeriod";
import { GrowingCropPeriod } from "../GrowingCropPeriod/GrowingCropPeriod.static";
import AddProcessing from "./AddProcessing/AddProcessing";
import ProcessingList from "./ProcessingList/ProcessingList";

const ProcessingLogic: React.FC = () => {
    const [processings, setProcessings] = useState<Processing[]>([]);
    const [processingTypes, setProcessingTypes] = useState<ProcessingType[]>([]);
    const [growingCropPeriods, setGrowingCropPeriods] = useState<GrowingCropPeriod[]>([]);
    const [fields, setFields] = useState<Field[]>([]);
    const [crops, setCrops] = useState<Crop[]>([]);
    const [machines, setMachines] = useState<Machine[]>([]);
    const [farms, setFarms] = useState<Farm[]>([]);
    const [soils, setSoils] = useState<Soil[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [confirmation, setConfirmation] = useState(false);

    const fetchProcessings = async () => {
        try {
            const processingsData = await apiProcessing.fetchProcessings();
            const processingTypesData = await apiProcessingType.fetchProcessingTypes();
            const growingCropPeriodsData = await apiGrowingCropPeriod.fetchGCP();
            const fieldsData = await apiField.fetchFields();
            const cropsData = await apiCrop.fetchCrops();
            const machinesData = await apiMachine.fetchMachines();
            const farmsData = await apiFarm.fetchFarms();
            const soilsData = await apiSoil.fetchSoils();

            setProcessings(processingsData.data);
            setProcessingTypes(processingTypesData.data);
            setGrowingCropPeriods(growingCropPeriodsData.data);
            setFields(fieldsData.data);
            setCrops(cropsData.data);
            setMachines(machinesData.data);
            setFarms(farmsData.data);
            setSoils(soilsData.data);
        } catch (error) {
            console.error("Error in fetching Processing", error);
        }
    };

    useEffect(() => {
        fetchProcessings();
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

    const handleDeleteProcessing = async (processingId: string) => {
        try {
            setLoading(true);

            const response = await apiProcessing.deleteProcessing(processingId);

            if (response.ok) {
                setProcessings((prevProcessings) => prevProcessings.filter((processing) => processing.id !== processingId));
            } else {
                const responseBody = await response.json();
                console.error(`Failed to delete Processing with ID: ${processingId}`, responseBody);

                if (response.status === 400 && responseBody.error?.message) {
                    showModal(responseBody.error.message);
                    setConfirmation(true);
                } else {
                    showModal("Failed to delete Processing");
                }
            }
        } catch (error) {
            console.error("Error deleting Processing:", error);
            showModal("Failed to delete Processing");
        } finally {
            setLoading(false);
        }
    };

    const handleEditProcessing = async (processingId: string, newProcessingDate: Date, newProcessingTypeId: string, newMachineId: string) => {
        try {
            setLoading(true);
            const originalOrder: Processing[] = [...processings];
            const response = await apiProcessing.editProcessing(processingId, newProcessingDate, newProcessingTypeId, newMachineId);

            if (response.ok) {
                const updatedProcessingData = await apiProcessing.fetchProcessings();

                setProcessings(
                    originalOrder.map(
                        (originalProcessing: Processing) =>
                            updatedProcessingData.data.find((updatedProcessing: Processing) => updatedProcessing.id === originalProcessing.id) as Processing
                    )
                );
            } else {
                const responseBody = await response.json();
                console.error(`Failed to edit processing with ID: ${processingId}`, responseBody);
            }
        } catch (error) {
            console.error("Error editing processing:", error);
            showModal("Failed to edit processing");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AddProcessing fetchProcessings={fetchProcessings} />
            <ProcessingList
                processings={processings}
                processingTypes={processingTypes}
                growingCropPeriods={growingCropPeriods}
                fields={fields}
                crops={crops}
                machines={machines}
                farms={farms}
                soils={soils}
                onDeleteProcessing={handleDeleteProcessing}
                onEditProcessing={handleEditProcessing}
            />
            <ProcessingPresentation modalVisible={modalVisible} confirmation={confirmation} modalMessage={modalMessage} setModalVisible={setModalVisible} />
        </>
    );
};

export default ProcessingLogic;
