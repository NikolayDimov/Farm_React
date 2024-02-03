import React from "react";
import ProcessingTypeList from "./ProcessingTypeList/ProcessingTypeList";
import useProcessingType from "./ProcessingType.logic";
import UserRoleHOC from "../UserRoleHOC";

const ProcessingType: React.FC = () => {
    const { processingTypes, createProcessingType, changeHandler, processingTypeName, fetchProcessingTypes } = useProcessingType();

    return (
        <>
            <UserRoleHOC>
                <h3>Add a New ProcessingType</h3>
                <form onSubmit={createProcessingType}>
                    <label>ProcessingType Name:</label>
                    <input type="text" value={processingTypeName} onChange={changeHandler} />
                    <button type="submit">Add ProcessingType</button>
                </form>
            </UserRoleHOC>

            <ProcessingTypeList processingTypes={processingTypes} fetchProcessingTypes={fetchProcessingTypes} />
        </>
    );
};

export default ProcessingType;
