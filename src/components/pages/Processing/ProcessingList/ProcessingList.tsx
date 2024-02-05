import React from "react";
import { Processing as ProcessingProp } from "../Processing.static";
import { ProcessingType as ProcessingTypeProp } from "../../ProcessingType/ProcessingType.static";
import { Machine as MachinesProps } from "../../Machine/Machine.static";
import { ListContainer, ListHeader, List, ListItem } from "../../../common/ListStyles";
import EditIcon from "../../../common/icons/EditIcon";
import DeleteIcon from "../../../common/icons/DeleteIcon";
import { ButtonContainer } from "../../../common/icons/ButtonContainer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserRoleHOC from "../../UserRoleHOC";
import useProcessingList from "../ProcessingList/ProcessingList.logic";
import useFilter from "../../../../utils/search";
import SearchBar from "../../../common/searchBar/searchBar";
import DetailsIcon from "../../../common/icons/DetailsIcon";
import useModal from "../../../common/ModalList/useModal";
import Modal from "../../../common/ModalList/Modal";

interface ProcessingListProps {
    processings: ProcessingProp[];
    processingTypes: ProcessingTypeProp[];
    machines: MachinesProps[];
    fetchProcessings: () => Promise<void>;
    findProcessingTypeName: (soilId: string) => string;
    findGrowingCropPeriodField: (soilId: string) => string;
    findGrowingCropPeriodCrop: (soilId: string) => string;
    findMachineName: (soilId: string) => string;
    findFarmNameByMachineId: (soilId: string) => string;
    findSoilNameForProcessing: (soilId: string) => string;
}

const ProcessingList: React.FC<ProcessingListProps> = ({
    processings,
    processingTypes,
    machines,
    fetchProcessings,
    findProcessingTypeName,
    findGrowingCropPeriodField,
    findGrowingCropPeriodCrop,
    findMachineName,
    findFarmNameByMachineId,
    findSoilNameForProcessing,
}) => {
    const {
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
    } = useProcessingList({ fetchProcessings });

    const { filteredItems, setSearchQuery } = useFilter<ProcessingProp>({ items: processings });
    const { isVisible: isDeleteModalVisible, showModal: showDeleteModal, hideModal: hideDeleteModal } = useModal();
    const { isVisible: isEditModalVisible, showModal: showEditModal, hideModal: hideEditModal } = useModal();
    const { isVisible: isDetailsModalVisible, showModal: showDetailsModal, hideModal: hideDetailsModal } = useModal();

    return (
        <ListContainer>
            <ListHeader>Processing List</ListHeader>
            <SearchBar placeholder="Search by crop name" onSearch={setSearchQuery} />
            <List>
                {Array.isArray(filteredItems) ? (
                    filteredItems.map((processing) => (
                        <ListItem key={processing.id}>
                            <strong>Date:</strong> {new Date(processing.date).toLocaleDateString("en-GB")} |&nbsp;
                            <strong>ProcessingType:</strong> {findProcessingTypeName(processing.processingTypeId)} |&nbsp;
                            <strong>Field:</strong> {findGrowingCropPeriodField(processing.growingCropPeriodId)} |&nbsp;
                            <strong>Crop:</strong> {findGrowingCropPeriodCrop(processing.growingCropPeriodId)} |&nbsp;
                            <strong>Machine:</strong> {findMachineName(processing.machineId)} |&nbsp;
                            <strong>Farm:</strong> {findFarmNameByMachineId(processing.machineId)} |&nbsp;
                            <strong>Soil:</strong> {findSoilNameForProcessing(processing.growingCropPeriodId)} |&nbsp;
                            <UserRoleHOC>
                                <ButtonContainer>
                                    <DetailsIcon
                                        onClick={() => {
                                            onDetailsClick(processing.id || "");
                                            showDetailsModal();
                                        }}
                                    />
                                    <EditIcon
                                        onClick={() => {
                                            onEditClick(processing.id, new Date(processing.date), processing.processingTypeId, processing.machineId);
                                            showEditModal();
                                        }}
                                    />
                                    <DeleteIcon
                                        onClick={() => {
                                            onDeleteClick(processing.id || "");
                                            showDeleteModal();
                                        }}
                                    />
                                </ButtonContainer>
                            </UserRoleHOC>
                        </ListItem>
                    ))
                ) : (
                    <p>No processing available</p>
                )}
            </List>

            <Modal isVisible={isEditModalVisible} hideModal={hideEditModal} onConfirm={onEditConfirm} showConfirmButton={true}>
                <p>Processing date: {originalProcessingDate}</p>
                <DatePicker selected={currentProcessingDate ? new Date(currentProcessingDate) : null} onChange={(date) => setCurrentProcessingDate(date as Date)} />

                <div>
                    <label>Select Processing Type:</label>
                    <select value={selectedProcessingTypeId} onChange={(e) => setSelectedProcessingTypeId(e.target.value)}>
                        <option value="" disabled>
                            Select Processing Type
                        </option>
                        {processingTypes.map((processingType) => (
                            <option key={processingType.id} value={processingType.id}>
                                {processingType.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Select Machine:</label>
                    <select value={selectedMachinedId} onChange={(e) => setSelectedMachineId(e.target.value)}>
                        <option value="" disabled>
                            Select Machine
                        </option>
                        {machines.map((machine) => (
                            <option key={machine.id} value={machine.id}>
                                {machine.brand} {machine.model} {machine.registerNumber}
                            </option>
                        ))}
                    </select>
                </div>
            </Modal>
            <Modal isVisible={isDeleteModalVisible} hideModal={hideDeleteModal} onConfirm={onDeleteConfirm} showConfirmButton={true}>
                <p>Are you sure you want to delete this machine?</p>
            </Modal>
            <Modal isVisible={isDetailsModalVisible} hideModal={hideDetailsModal} showConfirmButton={false}>
                <p>Processing Details:</p>
                {processingDetails && (
                    <div>
                        <p>Processing Date: {new Date(processingDetails.date).toLocaleDateString("en-GB")}</p>
                        <p>Processing Type: {findProcessingTypeName(processingDetails.processingTypeId)}</p>
                        <p>Field: {findGrowingCropPeriodField(processingDetails.growingCropPeriodId)}</p>
                        <p>Crop: {findGrowingCropPeriodCrop(processingDetails.growingCropPeriodId)}</p>
                        <p>Machine: {findMachineName(processingDetails.machineId)}</p>
                        <p>Farm: {findFarmNameByMachineId(processingDetails.machineId)}</p>
                        <p>Soil: {findSoilNameForProcessing(processingDetails.growingCropPeriodId)}</p>
                    </div>
                )}
            </Modal>
        </ListContainer>
    );
};

export default ProcessingList;
