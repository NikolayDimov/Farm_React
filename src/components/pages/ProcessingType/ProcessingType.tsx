import React from "react";
import ProcessingTypeList from "./ProcessingTypeList/ProcessingTypeList";
import useProcessingType from "./ProcessingType.logic";

const ProcessingType: React.FC = () => {
    const { processingTypes, createProcessingType, changeHandler, processingTypeName, fetchProcessingTypes } = useProcessingType();

    return (
        <>
            <div>
                <h3>Add a New ProcessingType</h3>
                <form onSubmit={createProcessingType}>
                    <label>ProcessingType Name:</label>
                    <input type="text" value={processingTypeName} onChange={changeHandler} />
                    <button type="submit">Add ProcessingType</button>
                </form>
            </div>

            <ProcessingTypeList processingTypes={processingTypes} fetchProcessingTypes={fetchProcessingTypes} />
        </>
    );
};

export default ProcessingType;
