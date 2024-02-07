import React, { useState } from "react";
import Modal from "react-modal";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

interface TableModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    data: any[];
    title: string;
}

const TableModal: React.FC<TableModalProps> = ({ isOpen, onRequestClose, data, title }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [size, setSize] = useState({ width: 400, height: 300 });

    const handleDrag = (e: any, ui: any) => {
        setPosition({ x: ui.x, y: ui.y });
    };

    const handleResize = (e: any, { size }: any) => {
        setSize(size);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={`${title} Modal`}
            style={{
                overlay: { zIndex: 1000 },
                content: {
                    position: "absolute",
                    top: position.y,
                    left: position.x,
                    width: size.width,
                    height: size.height,
                    overflow: "auto",
                },
            }}
        >
            <Draggable onDrag={handleDrag}>
                <Resizable width={size.width} height={size.height} onResize={handleResize}>
                    <div>
                        <h2>{title}</h2>
                        {/* Render your table component here */}
                    </div>
                </Resizable>
            </Draggable>
        </Modal>
    );
};

export default TableModal;
