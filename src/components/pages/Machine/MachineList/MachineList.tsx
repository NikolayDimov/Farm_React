import React from "react";
import EditIcon from "../../../BaseLayout/common/icons/EditIcon";
import DeleteIcon from "../../../BaseLayout/common/icons/DeleteIcon";
import { ListContainer, ListHeader, List, ListItem } from "../../../BaseLayout/common/ListStyles";
import { ButtonContainer } from "../../../BaseLayout/common/icons/ButtonContainer";
import { StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from "../../../BaseLayout/BaseLayout.style";
import UserRoleHOC from "../../UserRoleHOC";
import { Machine as MachineProp } from "../Machine.static";
import useMachineList from "../MachineList/MachineList.logic";
import { Farm } from "../../Farm/Farm.static";

interface MachineListProps {
    machines: MachineProp[];
    farms: Farm[];
    fetchMachines: () => Promise<void>;
    findFarmName: (farmId: string) => string;
}

const MachineList: React.FC<MachineListProps> = ({ machines, farms, fetchMachines, findFarmName }) => {
    const {
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
        setCurrentMachineBrand,
        setCurrentMachineModel,
        setCurrentMachineRegisterNumber,
        setSelectedFarmId,
        selectedFarmId,
        onEditConfirm,
        onEditCancel,
        onDeleteConfirm,
        onDeleteCancel,
    } = useMachineList({ fetchMachines });

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
                            <UserRoleHOC>
                                <ButtonContainer>
                                    <EditIcon onClick={() => onEditClick(machine.id, machine.brand, machine.model, machine.registerNumber, machine.farmId)} />
                                    <DeleteIcon onClick={() => onDeleteClick(machine.id)} />
                                </ButtonContainer>
                            </UserRoleHOC>
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
                        <ModalButton onClick={onEditConfirm}>Save</ModalButton>
                        <ModalButton onClick={onEditCancel}>Cancel</ModalButton>
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
                        <ModalButton onClick={onDeleteConfirm}>Yes</ModalButton>
                        <ModalButton onClick={onDeleteCancel}>No</ModalButton>
                    </ModalActions>
                </StyledModalContainer>
            </ModalOverlay>
        </ListContainer>
    );
};

export default MachineList;
