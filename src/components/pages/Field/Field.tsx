import React, { useEffect, useState } from "react";
import useField from "./Field.logic";
import UserRoleHOC from "../UserRoleHOC";
import MapContainer from "./MapContainer/MapContainer";
import FieldList from "./FieldList/FieldList";
import { apiField } from "../../../services/apiField";

const Field: React.FC = () => {
    const { fields, farms, soils, fetchFields, changeHandler, createField, createdValues, errorMessage, findFarmName, findSoilName, loading, handleSelectLocation } = useField();

    const [isMapVisible, setMapVisibility] = useState(false);
    const [fieldMapCoordinates, setFieldMapCoordinates] = useState<number[][][]>([]);

    const displayFieldOnGoogleMap = (fieldBoundary: { type: string; coordinates: number[][][] }) => {
        console.log("Field Boundary:", fieldBoundary);
        const coordinates = fieldBoundary.coordinates;
        setFieldMapCoordinates(coordinates);
        setMapVisibility(true);
    };

    return (
        <>
            <div>
                <UserRoleHOC>
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
                </UserRoleHOC>

                {/* <MapContainer onSelectLocation={handleSelectLocation} /> */}
                {/* <MapContainer onSelectLocation={(coordinates) => console.log("Selected coordinates:", coordinates)} /> */}

                <MapContainer onSelectLocation={handleSelectLocation} initialCoordinates={fieldMapCoordinates} isMapVisible={isMapVisible} />
            </div>

            <FieldList
                fields={fields}
                soils={soils}
                findFarmName={findFarmName}
                findSoilName={findSoilName}
                fetchFields={fetchFields}
                displayFieldOnGoogleMap={displayFieldOnGoogleMap}
            />
        </>
    );
};

export default Field;
