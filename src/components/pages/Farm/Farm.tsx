import MapContainer from "./MapContainer/MapContainer";
import Layout from "../../BaseLayout/common/Layout";
import useFarm from "./Farm.logic";
import FarmList from "./FarmList/FarmList";
import UserRoleHOC from "../UserRoleHOC";
import { showFarmLocationOnMap } from "../../../unility/farmLocation";

const Farm: React.FC = () => {
    const { farms, createFarm, changeHandler, farmName, coordinates, setNewFarmCoordinates, fetchFarms, loading } = useFarm();

    return (
        <Layout>
            <UserRoleHOC>
                <h3>Add a New Farm</h3>
                <form onSubmit={createFarm}>
                    <label>Farm Name:</label>
                    <input type="text" value={farmName} onChange={changeHandler} />

                    <button type="submit" disabled={loading}>
                        {loading ? "Adding Farm..." : "Add Farm"}
                    </button>
                </form>
            </UserRoleHOC>
            <MapContainer onSelectLocation={(coordinates: number[]) => setNewFarmCoordinates(coordinates)} />
            <FarmList farms={farms} fetchFarms={fetchFarms} showFarmLocationOnMap={showFarmLocationOnMap} />
        </Layout>
    );
};

export default Farm;
