import React from "react";
import MapContainer from "../../../BaseLayout/MapContainer";
import { Farm } from "../../Farm/Farm.static";
import { Soil } from "../../Soil/Soil.static";

interface AddFieldPresentationProps {
    createdValues: {
        newFieldName: string;
        newFarmId: string;
        newSoilId: string;
    };
    farms: Farm[];
    soils: Soil[];
    errorMessage: string;
    loading: boolean;
    outlinedCoordinates: number[][][];
    handleSelectLocation: (coordinates: number[][][]) => void;
    changeHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    createField: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AddFieldPresentation: React.FC<AddFieldPresentationProps> = ({
    createdValues,
    farms,
    soils,
    errorMessage,
    loading,
    outlinedCoordinates,
    handleSelectLocation,
    changeHandler,
    createField,
}) => {
    return (
        <div>
            <h3>Add a New Field</h3>
            <form onSubmit={createField}>
                <label>Field name:</label>
                <input type="text" name="newFieldName" value={createdValues.newFieldName} onChange={changeHandler} />
                <label>Farm:</label>
                <select name="newFarmId" value={createdValues.newFarmId} onChange={changeHandler}>
                    <option value="">Select Farm</option>
                    {farms.map((farm) => (
                        <option key={farm.id} value={farm.id}>
                            {farm.name}
                        </option>
                    ))}
                </select>
                <label>Soil:</label>
                <select name="newSoilId" value={createdValues.newSoilId} onChange={changeHandler}>
                    <option value="">Select Soil</option>
                    {soils.map((soil) => (
                        <option key={soil.id} value={soil.id}>
                            {soil.name}
                        </option>
                    ))}
                </select>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "Creating Field..." : "Create Field"}
                </button>
            </form>

            <MapContainer onSelectLocation={handleSelectLocation} />
        </div>
    );
};

export default AddFieldPresentation;
