import {FarmListProps} from "./profile-types";
  
  const FarmList: React.FC<FarmListProps> = ({ farms, onFarmLocationClick }) => {
    return (
      <div>
        <h3>Farm List</h3>
        <ul>
          {farms.map((farm) => (
            <li key={farm.id}>
              <span>{farm.name}</span>
              <button onClick={() => onFarmLocationClick(farm)}>View Location</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default FarmList;
  