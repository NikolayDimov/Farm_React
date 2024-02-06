import React from "react";
import ProcessingTypeList from "./ProcessingTypeList/ProcessingTypeList";
import useProcessingType from "./ProcessingType.logic";
import UserRoleHOC from "../UserRoleHOC";
import InputField from "../../common/InputFiled/InputField";

const ProcessingType: React.FC = () => {
    const { processingTypes, createProcessingType, changeHandler, processingTypeName, fetchProcessingTypes, error, formErrors, handleProcessingTypeNameBlur } = useProcessingType();

    return (
        <>
            <UserRoleHOC>
                <h3>Add a New ProcessingType</h3>
                <form onSubmit={createProcessingType}>
                    <InputField
                        label="Processing Type Name"
                        type="text"
                        id="processingTypeName"
                        name="processingTypeName"
                        value={processingTypeName}
                        onChange={changeHandler}
                        onBlur={handleProcessingTypeNameBlur}
                        error={error || formErrors.name}
                        buttonText="Add Processing Type"
                    />
                </form>
            </UserRoleHOC>

            <ProcessingTypeList processingTypes={processingTypes} fetchProcessingTypes={fetchProcessingTypes} />
        </>
    );
};

export default ProcessingType;
