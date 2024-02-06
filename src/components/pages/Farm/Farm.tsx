import MapContainer from "./MapContainer/MapContainer";
import Layout from "../../common/Layout";
import useFarm from "./Farm.logic";
import FarmList from "./FarmList/FarmList";
import UserRoleHOC from "../UserRoleHOC";
import { showFarmLocationOnMap } from "../../../utils/farmLocation";
import InputField from "../../common/InputFiled/InputField";

const Farm: React.FC = () => {
    const { farms, createFarm, changeHandler, farmName, coordinates, setNewFarmCoordinates, fetchFarms, loading, error, formErrors, handleFarmNameBlur } = useFarm();

    return (
        <Layout>
            <UserRoleHOC>
                <h3>Add a New Farm</h3>
                <form onSubmit={createFarm}>
                    <InputField
                        label="Farm Name"
                        type="text"
                        id="farmName"
                        name="farmName"
                        value={farmName}
                        onChange={changeHandler}
                        onBlur={handleFarmNameBlur}
                        error={error || formErrors.name}
                        buttonText="Add Farm"
                    />
                </form>
            </UserRoleHOC>
            <MapContainer onSelectLocation={(coordinates: number[]) => setNewFarmCoordinates(coordinates)} />
            <FarmList farms={farms} fetchFarms={fetchFarms} showFarmLocationOnMap={showFarmLocationOnMap} />
        </Layout>
    );
};

export default Farm;
