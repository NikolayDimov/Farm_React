import React from "react";
import EditIcon from "../../../../common/icons/EditIcon";
import DeleteIcon from "../../../../common/icons/DeleteIcon";
import { ListItem } from "../../../../common/ListStyles";
import { ButtonContainer } from "../../../../common/icons/ButtonContainer";
import MapContainer from "../../MapContainer/MapContainer";
import { Farm } from "../../Farm.static";
import UserRoleHOC from "../../../UserRoleHOC";

interface FarmCardProps {
    farm: Farm;
    onEditClick: (farmId: string, farmName: string) => void;
    onDeleteClick: (farmId: string) => void;
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, onEditClick, onDeleteClick }) => {
    return (
        <ListItem>
            <MapContainer onSelectLocation={() => {}} coordinates={farm.location.coordinates} />
            <div>
                <p>{farm.name}</p>
                <UserRoleHOC>
                    <ButtonContainer>
                        <EditIcon onClick={() => onEditClick(farm.id || "", farm.name)} />
                        <DeleteIcon onClick={() => onDeleteClick(farm.id || "")} />
                    </ButtonContainer>
                </UserRoleHOC>
            </div>
        </ListItem>
    );
};

export default FarmCard;
