import React, { useState } from "react";
import MachineListPresentation from "./MachineListPresentation";
import { Machine } from "../Machine.static";
import { Farm } from "../../Farm/Farm.static";

interface MachineListLogicProps {
    machines: Machine[];
    farms: Farm[];
    onDeleteMachine: (machineId: string) => void;
    onEditMachine: (machineId: string, currentMachineBrand: string, currentMachineModel: string, currentMachineRegisterNumber: string, newFarmId: string) => void;
}

const MachineListLogic: React.FC<MachineListLogicProps> = ({ machines, farms, onDeleteMachine, onEditMachine }) => {
    const [selectedMachineIdForDelete, setSelectedMachineIdForDelete] = useState<string | null>(null);
    const [selectedMachineIdForEdit, setSelectedMachineIdForEdit] = useState<string | null>(null);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [currentMachineBrand, setCurrentMachineBrand] = useState<string>("");
    const [currentMachineModel, setCurrentMachineModel] = useState<string>("");
    const [currentMachineRegisterNumber, setCurrentMachineRegisterNumber] = useState<string>("");
    const [originalMachineBrand, setOriginalMachineBrand] = useState<string>("");
    const [originalMachineModel, setOriginalMachineModel] = useState<string>("");
    const [originalMachineRegisterNumber, setOriginalMachineRegisterNumber] = useState<string>("");
    const [selectedFarmId, setSelectedFarmId] = useState<string>("");

    const findFarmName = (farmId: string): string => {
        const farm = farms.find((farm) => farm.id === farmId);
        return farm ? farm.name : "Unknown Farm";
    };

    const handleDeleteClick = (machineId: string | undefined) => {
        if (machineId) {
            setSelectedMachineIdForDelete(machineId);
            setDeleteModalVisible(true);
        }
    };

    const handleEditClick = (machineId: string | undefined, machineBrand: string, machineModel: string, machineRegisterNumber: string, farmId: string) => {
        if (machineId) {
            setSelectedMachineIdForEdit(machineId);
            setCurrentMachineBrand(machineBrand);
            setCurrentMachineModel(machineModel);
            setCurrentMachineRegisterNumber(machineRegisterNumber);
            setOriginalMachineBrand(machineBrand);
            setOriginalMachineModel(machineModel);
            setOriginalMachineRegisterNumber(machineRegisterNumber);
            setSelectedFarmId(farmId);
            setEditModalVisible(true);
        }
    };

    const handleDeleteConfirm = async () => {
        if (selectedMachineIdForDelete) {
            await onDeleteMachine(selectedMachineIdForDelete);
            setSelectedMachineIdForDelete(null);
            setDeleteModalVisible(false);
        }
    };

    const handleDeleteCancel = () => {
        setSelectedMachineIdForDelete(null);
        setDeleteModalVisible(false);
    };

    const handleEditConfirm = async () => {
        try {
            if (selectedMachineIdForEdit) {
                await onEditMachine(selectedMachineIdForEdit, currentMachineBrand, currentMachineModel, currentMachineRegisterNumber, selectedFarmId);
            }

            setSelectedMachineIdForEdit(null);
            setEditModalVisible(false);
            setOriginalMachineBrand("");
            setOriginalMachineModel("");
            setOriginalMachineRegisterNumber("");
            setSelectedFarmId("");
        } catch (error) {
            console.error("Error handling edit confirmation:", error);
        }
    };

    const handleEditCancel = () => {
        setSelectedMachineIdForEdit(null);
        setEditModalVisible(false);
        setCurrentMachineBrand("");
        setCurrentMachineModel("");
        setCurrentMachineRegisterNumber("");
        setSelectedFarmId("");
    };

    return (
        <MachineListPresentation
            machines={machines}
            farms={farms}
            findFarmName={findFarmName}
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick}
            isDeleteModalVisible={isDeleteModalVisible}
            isEditModalVisible={isEditModalVisible}
            currentMachineBrand={currentMachineBrand}
            currentMachineModel={currentMachineModel}
            currentMachineRegisterNumber={currentMachineRegisterNumber}
            originalMachineBrand={originalMachineBrand}
            originalMachineModel={originalMachineModel}
            originalMachineRegisterNumber={originalMachineRegisterNumber}
            selectedFarmId={selectedFarmId}
            setSelectedFarmId={setSelectedFarmId}
            handleDeleteConfirm={handleDeleteConfirm}
            handleDeleteCancel={handleDeleteCancel}
            handleEditConfirm={handleEditConfirm}
            handleEditCancel={handleEditCancel}
            setCurrentMachineBrand={setCurrentMachineBrand}
            setCurrentMachineModel={setCurrentMachineModel}
            setCurrentMachineRegisterNumber={setCurrentMachineRegisterNumber}
        />
    );
};

export default MachineListLogic;
