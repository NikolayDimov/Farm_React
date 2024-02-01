import React from "react";
import { Machine } from "../Machine.static";
import EditIcon from "../../../BaseLayout/common/icons/EditIcon";
import DeleteIcon from "../../../BaseLayout/common/icons/DeleteIcon";
import { ListContainer, ListHeader, List, ListItem } from "../../../BaseLayout/common/ListStyles";
import { ButtonContainer } from "../../../BaseLayout/common/icons/ButtonContainer";
import { StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from "../../../BaseLayout/BaseLayout.style";
import { Farm } from "../../Farm/Farm.static";

interface MachineListPresentationProps {
    machines: Machine[];
    farms: Farm[];
    onDeleteClick: (machineId: string | undefined) => void;
    onEditClick: (machineId: string | undefined, machineBrand: string, machineModel: string, machineRegisterNumber: string, farmId: string) => void;
    isDeleteModalVisible: boolean;
    isEditModalVisible: boolean;
    currentMachineBrand: string;
    currentMachineModel: string;
    currentMachineRegisterNumber: string;
    originalMachineBrand: string;
    originalMachineModel: string;
    originalMachineRegisterNumber: string;
    selectedFarmId: string;
    setSelectedFarmId: (farmId: string) => void;
    handleDeleteConfirm: () => void;
    handleDeleteCancel: () => void;
    handleEditConfirm: () => void;
    handleEditCancel: () => void;
    setCurrentMachineBrand: (brand: string) => void;
    setCurrentMachineModel: (model: string) => void;
    setCurrentMachineRegisterNumber: (registerNumber: string) => void;
    findFarmName: (farmId: string) => string;
}

const MachineListPresentation: React.FC<MachineListPresentationProps> = ({
    machines,
    farms,
    onDeleteClick,
    onEditClick,
    isDeleteModalVisible,
    isEditModalVisible,
    currentMachineBrand,
    currentMachineModel,
    currentMachineRegisterNumber,
    originalMachineBrand,
    originalMachineModel,
    originalMachineRegisterNumber,
    selectedFarmId,
    setSelectedFarmId,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleEditConfirm,
    handleEditCancel,
    setCurrentMachineBrand,
    setCurrentMachineModel,
    setCurrentMachineRegisterNumber,
    findFarmName,
}) => {
    return (
        <ListContainer>
            <ListHeader>Machine List</ListHeader>
            <List>
                {Array.isArray(machines) ? (
                    machines.map((machine) => (
                        <ListItem key={machine.id}>
                            <strong>Brand:</strong> {machine.brand} |&nbsp;
                            <strong>Model:</strong> {machine.model} |&nbsp;
                            <strong>Register Number:</strong> {machine.registerNumber} |&nbsp;
                            <strong>Farm:</strong> {findFarmName(machine.farmId)}
                            <ButtonContainer>
                                <EditIcon onClick={() => onEditClick(machine.id, machine.brand, machine.model, machine.registerNumber, machine.farmId)} />
                                <DeleteIcon onClick={() => onDeleteClick(machine.id)} />
                            </ButtonContainer>
                        </ListItem>
                    ))
                ) : (
                    <p>No machines available</p>
                )}
            </List>

            {/* Edit Modal */}
            <ModalOverlay show={isEditModalVisible} confirmation={false}>
                <StyledModalContainer confirmation={false}>
                    <ModalContent>
                        <p>Machine Brand: {originalMachineBrand}</p>
                        <input type="text" placeholder="Enter new machine brand" value={currentMachineBrand} onChange={(e) => setCurrentMachineBrand(e.target.value)} />
                        <p>Machine Model: {originalMachineModel}</p>
                        <input type="text" placeholder="Enter new machine model" value={currentMachineModel} onChange={(e) => setCurrentMachineModel(e.target.value)} />
                        <p>Machine Register Number: {originalMachineRegisterNumber}</p>
                        <input
                            type="text"
                            placeholder="Enter new machine register number"
                            value={currentMachineRegisterNumber}
                            onChange={(e) => setCurrentMachineRegisterNumber(e.target.value)}
                        />
                        <div>
                            <label>Select Farm:</label>
                            <select value={selectedFarmId} onChange={(e) => setSelectedFarmId(e.target.value)}>
                                <option value="" disabled>
                                    Select Farm
                                </option>
                                {farms.map((farm) => (
                                    <option key={farm.id} value={farm.id}>
                                        {farm.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </ModalContent>
                    <ModalActions>
                        <ModalButton onClick={handleEditConfirm}>Save</ModalButton>
                        <ModalButton onClick={handleEditCancel}>Cancel</ModalButton>
                    </ModalActions>
                </StyledModalContainer>
            </ModalOverlay>

            {/* Delete Modal */}
            <ModalOverlay show={isDeleteModalVisible} confirmation={false}>
                <StyledModalContainer confirmation={false}>
                    <ModalContent>
                        <p>Are you sure you want to delete this machine?</p>
                    </ModalContent>
                    <ModalActions>
                        <ModalButton onClick={handleDeleteConfirm}>Yes</ModalButton>
                        <ModalButton onClick={handleDeleteCancel}>No</ModalButton>
                    </ModalActions>
                </StyledModalContainer>
            </ModalOverlay>
        </ListContainer>
    );
};

export default MachineListPresentation;
