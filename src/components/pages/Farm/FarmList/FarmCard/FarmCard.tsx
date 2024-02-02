// FarmCard.tsx
import React from "react";
import EditIcon from "../../../../BaseLayout/common/icons/EditIcon";
import DeleteIcon from "../../../../BaseLayout/common/icons/DeleteIcon";
import { ListItem } from "../../../../BaseLayout/common/ListStyles";
import { ButtonContainer } from "../../../../BaseLayout/common/icons/ButtonContainer";
import MapContainer from "../../MapContainer";
import { Farm } from "../../Farm.static";
import UserRoleHOC from "../../../UserRoleHOC";

interface FarmCardProps {
    farm: Farm;
    onEditClick: (farmId: string | undefined, farmName: string) => void;
    onDeleteClick: (farmId: string | undefined) => void;
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, onEditClick, onDeleteClick }) => {
    return (
        <ListItem>
            <MapContainer onSelectLocation={() => {}} coordinates={farm.location.coordinates} />
            <div>
                <p>{farm.name}</p>
                <UserRoleHOC>
                    <ButtonContainer>
                        <EditIcon onClick={() => onEditClick(farm.id, farm.name)} />
                        <DeleteIcon onClick={() => onDeleteClick(farm.id)} />
                    </ButtonContainer>
                </UserRoleHOC>
            </div>
        </ListItem>
    );
};

export default FarmCard;
