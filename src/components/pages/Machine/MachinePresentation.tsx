import React from "react";
import { Machine } from "./Machine.static";
import { Farm } from "../Farm/Farm.static";
import { ModalOverlay, StyledModalContainer, modalContentStyles, closeButtonStyles } from "../../BaseLayout/BaseLayout.style";
import AddMachineLogic from "./AddMachine/AddMachineLogic";
import MachineListLogic from "./MachineList/MachineListLogic";
import TransferMachineLogic from "./TransferMachine/TransferMachineLogic";

interface MachinePresentationProps {
    machines: Machine[];
    farms: Farm[];
    modalVisible: boolean;
    confirmation: boolean;
    modalMessage: string;
    onDeleteMachine: (machineId: string) => void;
    onEditMachine: (machineId: string, newMachineBrand: string, newMachineModel: string, MachineRegisterNumber: string, newFarmId: string) => void;
    setModalVisible: (visible: boolean) => void;
    fetchMachines: () => void;
    transferMode: boolean;
    setTransferMode: React.Dispatch<React.SetStateAction<boolean>>;
    handleTransferSuccess: () => void;
}

const MachinePresentation: React.FC<MachinePresentationProps> = ({
    machines,
    farms,
    modalVisible,
    confirmation,
    modalMessage,
    onDeleteMachine,
    onEditMachine,
    setModalVisible,
    fetchMachines,
    transferMode,
    setTransferMode,
    handleTransferSuccess,
}) => {
    return (
        <>
            <AddMachineLogic fetchMachines={fetchMachines} />
            <MachineListLogic machines={machines} farms={farms} onDeleteMachine={onDeleteMachine} onEditMachine={onEditMachine} />
            <ModalOverlay show={modalVisible} confirmation={false}>
                <StyledModalContainer confirmation={confirmation}>
                    <div style={modalContentStyles}>{confirmation ? "Machine cannot be deleted" : modalMessage}</div>
                    <div style={closeButtonStyles}>
                        <button onClick={() => setModalVisible(false)}>Close</button>
                    </div>
                </StyledModalContainer>
            </ModalOverlay>
            <div>
                <h2>Transfer Machine</h2>
                {transferMode ? (
                    <TransferMachineLogic machines={machines} farms={farms} onTransferSuccess={handleTransferSuccess} />
                ) : (
                    <button onClick={() => setTransferMode(true)}>Transfer Machine</button>
                )}
            </div>
        </>
    );
};

export default MachinePresentation;
