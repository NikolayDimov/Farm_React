import React from "react";
import { Processing as ProcessingProp } from "../Processing.static";
import { ProcessingType as ProcessingTypeProp } from "../../ProcessingType/ProcessingType.static";
import { Machine as MachinesProps } from "../../Machine/Machine.static";
import { ListContainer, ListHeader, List, ListItem } from "../../../BaseLayout/common/ListStyles";
import EditIcon from "../../../BaseLayout/common/icons/EditIcon";
import DeleteIcon from "../../../BaseLayout/common/icons/DeleteIcon";
import { ButtonContainer } from "../../../BaseLayout/common/icons/ButtonContainer";
import { StyledModalContainer, ModalContent, ModalActions, ModalButton, ModalOverlay } from "../../../BaseLayout/BaseLayout.style";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserRoleHOC from "../../UserRoleHOC";
import useProcessingList from "../ProcessingList/ProcessingList.logic";
import useFilter from "../../../../utils/search";
import SearchBar from "../../../BaseLayout/common/searchBar/searchBar";

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
}) => {
    const {
        onDeleteClick,
        onEditClick,
        isDeleteModalVisible,
        isEditModalVisible,
        currentProcessingDate,
        originalProcessingDate,
        onEditConfirm,
        onEditCancel,
        onDeleteConfirm,
        onDeleteCancel,
        setSelectedProcessingTypeId,
        setSelectedMachineId,
        setCurrentProcessingDate,
        selectedProcessingTypeId,
        selectedMachinedId,
    } = useProcessingList({ fetchProcessings });

    const { filteredItems, setSearchQuery } = useFilter<ProcessingProp>({ items: processings });

    return (
        <ListContainer>
            <ListHeader>Processing List</ListHeader>

            <SearchBar placeholder="Search by crop name" onSearch={setSearchQuery} />

            <List>
                {Array.isArray(filteredItems) ? (
                    filteredItems.map((processing) => (
                        <ListItem key={processing.id}>
                            <strong>Date:</strong> {new Date(processing.date).toLocaleDateString()} |&nbsp;
                            <strong>ProcessingType:</strong> {findProcessingTypeName(processing.processingTypeId)} |&nbsp;
                            <strong>Field:</strong> {findGrowingCropPeriodField(processing.growingCropPeriodId)} |&nbsp;
                            <strong>Crop:</strong> {findGrowingCropPeriodCrop(processing.growingCropPeriodId)} |&nbsp;
                            <strong>Machine:</strong> {findMachineName(processing.machineId)} |&nbsp;
                            <strong>Farm:</strong> {findFarmNameByMachineId(processing.machineId)} |&nbsp;
                            <UserRoleHOC>
                                <ButtonContainer>
                                    <EditIcon onClick={() => onEditClick(processing.id, new Date(processing.date), processing.processingTypeId, processing.machineId)} />
                                    <DeleteIcon onClick={() => onDeleteClick(processing.id)} />
                                </ButtonContainer>
                            </UserRoleHOC>
                        </ListItem>
                    ))
                ) : (
                    <p>No processing available</p>
                )}
            </List>

            {/* Edit Modal */}
            <ModalOverlay show={isEditModalVisible} confirmation={false}>
                <StyledModalContainer confirmation={false}>
                    <ModalContent>
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
                        <p>Are you sure you want to delete this processing?</p>
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

export default ProcessingList;
