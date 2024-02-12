import React from "react";
import EditIcon from "../../../common/icons/EditIcon";
import DeleteIcon from "../../../common/icons/DeleteIcon";
import { ListContainer, ListHeader, List, ListItem } from "../../../common/ListStyles";
import { ButtonContainer } from "../../../common/icons/ButtonContainer";
import UserRoleHOC from "../../UserRoleHOC";
import { Machine as MachineProp } from "../Machine.static";
import useMachineList from "../MachineList/MachineList.logic";
import { Farm } from "../../Farm/Farm.static";
import useFilter from "../../../../utils/search";
import SearchBar from "../../../common/SearchBar/SearchBar";
import DetailsIcon from "../../../common/icons/DetailsIcon";
import useModal from "../../../common/ModalList/useModal";
import Modal from "../../../common/ModalList/Modal";

interface MachineListProps {
    machines: MachineProp[];
    farms: Farm[];
    fetchMachines: () => Promise<void>;
    findFarmName: (farmId: string) => string;
}

const MachineList: React.FC<MachineListProps> = ({ machines, fetchMachines, findFarmName }) => {
    const {
        onDeleteClick,
        onEditClick,
        onDetailsClick,
        currentMachineBrand,
        currentMachineModel,
        currentMachineRegisterNumber,
        originalMachineBrand,
        originalMachineModel,
        originalMachineRegisterNumber,
        setCurrentMachineBrand,
        setCurrentMachineModel,
        setCurrentMachineRegisterNumber,
        onEditConfirm,
        onDeleteConfirm,
        machineDetails,
    } = useMachineList({ fetchMachines });

    const { filteredItems, setSearchQuery } = useFilter<MachineProp>({ items: machines });
    const { isVisible: isDeleteModalVisible, showModal: showDeleteModal, hideModal: hideDeleteModal } = useModal();
    const { isVisible: isEditModalVisible, showModal: showEditModal, hideModal: hideEditModal } = useModal();
    const { isVisible: isDetailsModalVisible, showModal: showDetailsModal, hideModal: hideDetailsModal } = useModal();

    return (
        <ListContainer>
            <ListHeader>Machine List</ListHeader>
            <SearchBar placeholder="Search by machine brand, model and register number" onSearch={setSearchQuery} />
            <List>
                {Array.isArray(filteredItems) ? (
                    filteredItems.map((machine) => (
                        <ListItem key={machine.id}>
                            <strong>Brand:</strong> {machine.brand}
                            <strong>Model:</strong> {machine.model}
                            <strong>Register Number:</strong> {machine.registerNumber}
                            <strong>Farm:</strong> {findFarmName(machine.farmId)}
                            <ButtonContainer>
                                <DetailsIcon
                                    onClick={() => {
                                        onDetailsClick(machine.id || "");
                                        showDetailsModal();
                                    }}
                                />
                                <UserRoleHOC>
                                    <EditIcon
                                        onClick={() => {
                                            onEditClick(machine.id || "", machine.brand, machine.model, machine.registerNumber);
                                            showEditModal();
                                        }}
                                    />
                                    <DeleteIcon
                                        onClick={() => {
                                            onDeleteClick(machine.id || "");
                                            showDeleteModal();
                                        }}
                                    />
                                </UserRoleHOC>
                            </ButtonContainer>
                        </ListItem>
                    ))
                ) : (
                    <p>No machines available</p>
                )}
            </List>

            <Modal isVisible={isEditModalVisible} hideModal={hideEditModal} onConfirm={onEditConfirm} showConfirmButton={true}>
                <p>Current Machine Brand: {originalMachineBrand}</p>
                <p>Current Machine Model: {originalMachineModel}</p>
                <p>Current Machine Register Number: {originalMachineRegisterNumber}</p>
                <input type="text" placeholder="Enter new machine brand" value={currentMachineBrand} onChange={(e) => setCurrentMachineBrand(e.target.value)} />
                <input type="text" placeholder="Enter new machine model" value={currentMachineModel} onChange={(e) => setCurrentMachineModel(e.target.value)} />
                <input
                    type="text"
                    placeholder="Enter new machine regoster number"
                    value={currentMachineRegisterNumber}
                    onChange={(e) => setCurrentMachineRegisterNumber(e.target.value)}
                />
            </Modal>
            <Modal isVisible={isDeleteModalVisible} hideModal={hideDeleteModal} onConfirm={onDeleteConfirm} showConfirmButton={true}>
                <p>Are you sure you want to delete this machine?</p>
            </Modal>
            <Modal isVisible={isDetailsModalVisible} hideModal={hideDetailsModal} showConfirmButton={false}>
                <p>Machine Details:</p>
                {machineDetails && (
                    <div>
                        <p>Machine Brand: {machineDetails.brand}</p>
                        <p>Machine Model: {machineDetails.model}</p>
                        <p>Machine Register Number: {machineDetails.registerNumber}</p>
                        <p>Fram: {findFarmName(machineDetails.farmId)}</p>
                    </div>
                )}
            </Modal>
        </ListContainer>
    );
};

export default MachineList;
