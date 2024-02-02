import React, { FormEvent, useState } from "react";
import { Farm } from "../Farm.static";
import { apiFarm } from "../../../../services/apiFarm";
import UserRoleHOC from "../../UserRoleHOC";

interface AddFarmFormProps {
    fetchFarms: () => void;
}

const AddFarmForm: React.FC<AddFarmFormProps> = ({ fetchFarms }) => {
    const [newFarmName, setNewFarmName] = useState("");
    const [loading, setLoading] = useState(false);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewFarmName(e.target.value);
    };

    async function createFarm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            setLoading(true);
            // Assuming you have a function to get the coordinates, replace this with your logic
            const newFarmCoordinates = [42.6977, 23.3219];

            const newFarm: Farm = {
                name: newFarmName,
                location: {
                    type: "Point",
                    coordinates: newFarmCoordinates,
                },
            };

            const response = await apiFarm.createFarm(newFarm);

            if (response.ok) {
                setNewFarmName("");
                fetchFarms();
            } else {
                console.error("Failed to create a new farm in the database");
            }
        } catch (error) {
            console.error("Error creating a new farm:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <UserRoleHOC>
            <h3>Add a New Farm</h3>
            <form onSubmit={createFarm}>
                <label>Farm Name:</label>
                <input type="text" value={newFarmName} onChange={changeHandler} />

                <button type="submit" disabled={loading}>
                    {loading ? "Adding Farm..." : "Add Farm"}
                </button>
            </form>
        </UserRoleHOC>
    );
};

export default AddFarmForm;
