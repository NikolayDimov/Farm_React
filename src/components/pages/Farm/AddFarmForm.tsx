import React, { FormEvent, useState } from "react";
import { Farm } from "./Farm.static";
import { apiFarm } from "../../../services/apiFarm";
import { useAuth } from "../../../context/AuthContext";

interface AddFarmFormProps {
    onFarmAdded: (newFarm: Farm) => void;
}

const AddFarmForm: React.FC<AddFarmFormProps> = ({ onFarmAdded }) => {
    const [newFarmName, setNewFarmName] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

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
                onFarmAdded(newFarm);
                setNewFarmName("");
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
        <div>
            {user?.role !== "VIEWER" && <h3>Add a New Farm</h3>}
            {user?.role === "VIEWER" ? null : (
                <form onSubmit={createFarm}>
                    <label>Farm Name:</label>
                    <input type="text" value={newFarmName} onChange={changeHandler} />

                    {/* Conditionally render the button based on user role */}
                    {user?.role === "OPERATOR" || user?.role === "OWNER" ? (
                        <button type="submit" disabled={loading}>
                            {loading ? "Adding Farm..." : "Add Farm"}
                        </button>
                    ) : null}
                </form>
            )}
        </div>
    );
};

export default AddFarmForm;
